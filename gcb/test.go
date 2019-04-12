package main

import (
	"fmt"
	"time"
	"net/http"
	"database/sql"
	"encoding/json"
    _ "github.com/go-sql-driver/mysql"
    // "go_api/data"
	"os"
	"path/filepath"
	"github.com/gorilla/sessions"
	"io"
	"regexp"
    // "strings"
    "io/ioutil"
)

var store = sessions.NewCookieStore([]byte(os.Getenv("fdklsjfalh")))


type Res struct {
	code int 
	msg []map[string]interface{}
}

type Cookie struct {
	name string 
	value string 
}

var db *sql.DB
var  UPLOAD_PATH,err  = filepath.Abs(filepath.Dir(os.Args[0]))

func main (){
	var err error
	db , err = sql.Open("mysql","root:1125@tcp(127.0.0.1:3306)/maple")
	checkErr(err)
	defer db.Close()

	// http.HandleFunc("/",handleSearch)
	// http.HandleFunc("/api/file",handlePhoto)
	fmt.Println(store)

	re := regexp.MustCompile("^/(.+?)/")
	res := re.FindStringSubmatch(UPLOAD_PATH)
	http.HandleFunc(`/`+res[1]+`/`,handleShow)

	http.HandleFunc("/api/user/login",handleLogin)
	createServer(":9000")
	
	// res ,err :=db.Query("insert into test (name,age) values('maple',26)")
}

func createServer(port string) error {
	  err := http.ListenAndServe(port,nil)
	  if err != nil {
		  fmt.Println("Error:",err)
	  }
	  fmt.Println("started",time.Now())
	  return nil
}
func handleSearch(w http.ResponseWriter,r * http.Request){

	resArr :=make(map[string]interface{},2)
	resArr["code"]=500
	resArr["msg"]=querySelect("select * From test")
	data,err:=json.Marshal(resArr)
	checkErr(err)
	fmt.Println(r.UserAgent())
	// set cookie
		expire := time.Now().AddDate(0,0,1)
		c := http.Cookie{
			Name:"maple",
			Value:"ken",
			Expires : expire,
			HttpOnly :true,
		}
		
	http.SetCookie(w,&c)
	fmt.Fprintf(w,string(data))
} 



func handlePhoto(w http.ResponseWriter,r * http.Request){
	r.ParseMultipartForm(1024)

	file,fileHeader,err := r.FormFile("file")
	checkErr(err)

	img,err := os.Create(UPLOAD_PATH+fileHeader.Filename)
	checkErr(err)

	leng,err :=io.Copy(img,file)
	checkErr(err)
	fmt.Println(UPLOAD_PATH,leng,"write")
	fmt.Fprintf(w,UPLOAD_PATH+fileHeader.Filename)
}


func handleShow(w http.ResponseWriter,r * http.Request){
	file, err := os.Open(r.URL.Path)
	checkErr(err)
	defer file.Close()
		
    buff, err := ioutil.ReadAll(file)
	checkErr(err)

    w.Write(buff)
}

func handleLogin(w http.ResponseWriter,r * http.Request) {//authentic user login 
		var res = make(map[string]interface{})
			sess,_ := store.Get(r,"username")
				fmt.Println(sess.Values["maple"])
		r.ParseMultipartForm(1024)
		user := r.Form["user"][0]
		pass := r.Form["password"][0]
		if user == "" || pass == "" {
			res["code"] = 10001
			res["msg"] = "用户名或密码不能为空"
			jsonData,err := json.Marshal(res)
			checkErr(err)
			fmt.Fprintf(w,string(jsonData))
			return
		}
		databaseAuth := querySelect(`select * From user where username="`+user+`" and password="`+pass+`"`)
		if len(databaseAuth) == 1 {
			res["code"] = 10000
			res["msg"] = "登录成功"
			jsonData,err := json.Marshal(res)
			checkErr(err)

		    sess,_ := store.Get(r,"username")
			sess.Values["maple"] = true
			sess.Save(r,w)

			expire :=time.Now()
			cookie := http.Cookie{Name:"username",Value:databaseAuth[0]["username"],Expires:expire.AddDate(0,0,1),MaxAge:86400}
			r.AddCookie(&cookie)
			http.SetCookie(w,&cookie)

			fmt.Fprintf(w,string(jsonData))
			
		}else{
			res["code"] = 10002
			res["msg"] = "用户名或密码不正确"
			jsonData,err := json.Marshal(res)
			checkErr(err)
			fmt.Fprintf(w,string(jsonData))
		}
		

}

func checkErr(err error){
	if err !=nil {
		panic(err)
	}
}

func querySelect(s string)[]map[string]string {
	res ,err :=db.Query(s)
	checkErr(err)
	col ,err :=res.Columns()
	checkErr(err)
	item := make([][]byte,len(col))
	itemPointer := make([]interface{},len(col))

	for i,_ := range item{
		itemPointer[i] =&item[i]
	}
	var msg []map[string]string
	for res.Next() {
		err := res.Scan(itemPointer...)
		checkErr(err)
		tem :=make(map[string]string)
		for i,v := range item {
			tem[col[i]] = string(v)
		}
		msg=append(msg,tem)
	}
	defer res.Close()
	return msg
}