
package main 

import (
	"log"
	"net/http"
	// "fmt"
	"database/sql"
	"strconv"
	// "io"
	"time"
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB
type resDatas struct{
	code string

}


func main(){
	var sql_err error
	db,sql_err =sql.Open("mysql","root:1125@tcp(18.191.241.117:3306)/maple")
	checkErr(sql_err)
	sql_err = db.Ping()
	checkErr(sql_err)
	// timer :=time.NewTicker(time.Second*3).C
	// go func ()  {
	// 	for i := range timer {
	// 		fmt.Println(i)
	// 	}
		
	// }()
	createServer("9000")
	
	
}

func  handleFirstPage(w http.ResponseWriter,r *http.Request){
	   r.ParseForm()  
	  var queryString,offset string
	//   r.ParseMultipartForm(1024)  
	  page_num,_:=strconv.ParseInt(r.URL.Query()["page_num"][0],10,10)
		
	  offset =`10`+` offset `+strconv.FormatInt((page_num-1)*10,10)

	  if _,ok:=r.URL.Query()["search_text"];ok{
		 search_text :=r.URL.Query()["search_text"][0]
		 queryString = `Select * From (Select * From maple_log where title Regexp "`+search_text+`") as t order BY create_time desc limit `+offset
	  }else{
	      queryString ="Select * From maple_log order BY create_time desc limit "+offset
	  }
			// fmt.Println(offset)

	  h_err :=firstPageQuery(queryString,w)
	  if h_err !=nil {
		w.WriteHeader(500)
		w.Write([]byte("server error"))
	  }
}
func  handleAboutMapleContent(w http.ResponseWriter,r *http.Request){
		r.ParseMultipartForm(1024)  
		content :=r.Form["content"][0]
		// title :=r.Form["title"][0]
		// summary :=r.Form["summary"][0]
		// author :=r.Form["author"][0]
		if content =="" {
			w.WriteHeader(200)
			var temDatas=make(map[string]string)
				temDatas["code"]="10001"
				temDatas["msg"]="缺少参数"
			    resDatas,_:=json.Marshal(temDatas)
			 w.Write([]byte(resDatas))
			 return 
		}
		var temContent =make(map[string]string)
		for i,v := range r.Form {
			temContent[i]=string(v[0])
			// fmt.Println(v,i)
		}
		err :=mapleInsertContent(w,temContent)
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte("服务端出错"))
		}
	// h_err :=firstPageQuery("Select * From maple_log limit "+limit,w)
	// if h_err !=nil {
	// 	w.WriteHeader(500)
	// 	w.Write([]byte("server error"))
	// }
}
func mapleInsertContent(w http.ResponseWriter,reqContent map[string]string)error{
		smt,err := db.Prepare("Insert into maple_log (title,content,author,create_time) values (?,?,?,?)")
		checkErr(err)
		res,res_err :=smt.Exec(reqContent["title"],reqContent["content"],"maple",time.Now())
		checkErr(res_err)
		lastId,_ :=res.LastInsertId()

		var temDatas=make(map[string]string)
		if lastId !=0 {
				temDatas["code"]="10000"
				temDatas["msg"]="提交成功"
		}else {
				temDatas["code"]="10001"
				temDatas["msg"]="提交失败"
		}
		w.WriteHeader(200)
		resDatas,_:=json.Marshal(temDatas)
		w.Write([]byte(resDatas))
		return nil
}
func firstPageQuery(query string,w http.ResponseWriter) error{
	result,query_err:= db.Query(query)
	if query_err != nil{
		w.Write([]byte("Error:"+query_err.Error()))
		return query_err
	}
	cols,col_err :=result.Columns()
	checkErr(col_err)
	scanA :=make([]interface{},len(cols))
	values :=make([][]byte,len(cols))
	for i :=range cols{
		scanA[i]=&values[i]
	}

	var datas []string
	// fmt.Println(len(datas))
	for result.Next() {
		err :=result.Scan(scanA...)
		checkErr(err)
		data := make(map[string]string)
		for i,v :=range values{
			data[cols[i]]=string(v)
		}
		tem,_ :=json.MarshalIndent(data,"","  ")
		datas=append(datas,string(tem))
	}
	var temRes =make(map[string]interface{})
	if len(datas)==0 {
		temRes["code"]="10001"
		temRes["msg"]="没有更多文章"
	}else{
		temRes["code"]="10000"
		temRes["msg"]=datas
	}
	resDatas,_ :=json.Marshal(temRes)
	w.Write(resDatas)
	return nil
}
func createServer(port string){
	http.HandleFunc("/api/first",handleFirstPage)
	http.HandleFunc("/api/about_maple/send_content",handleAboutMapleContent)
	log.Println("start")
	web_err :=http.ListenAndServe(":"+port,nil)
	checkErr(web_err)
}
func checkErr(err error){
	if err !=nil {
		log.Println("Error:",err.Error())
	}
}