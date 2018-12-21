
package main 

import (
	"log"
	"net/http"
	// "fmt"
	"database/sql"
	// "strconv"
	// "io"
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB


func main(){
	var sql_err error
	db,sql_err =sql.Open("mysql","root:1125@/maple")
	checkErr(sql_err)
	sql_err = db.Ping()
	checkErr(sql_err)

	createServer("9000")
}

func  handleFirstPage(w http.ResponseWriter,r *http.Request){
       r.ParseForm()  
	//   r.ParseMultipartForm(1024)  
	  limit:=r.URL.Query()["number"][0]
	  if limit==""{
		  limit="20"
	  }
	  h_err :=firstPageQuery("Select * From maple_log limit "+limit,w)
	  if h_err !=nil {
		w.WriteHeader(500)
		w.Write([]byte("server error"))
	  }
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
	resDatas,_ :=json.Marshal(datas)
	w.Write(resDatas)
	return nil
}
func createServer(port string){
	http.HandleFunc("/api/first",handleFirstPage)
	log.Println("start")
	web_err :=http.ListenAndServe(":"+port,nil)
	checkErr(web_err)
}
func checkErr(err error){
	if err !=nil {
		log.Println("Error:",err.Error())
	}
}