package handler

import (
	"net/http"
	"log"
    "time"
	"strings"
	"encoding/json"
	"fmt"
	"github.com/gorilla/sessions"
	check "../../lib/log_err"
	query "../data_query"
)
var (
	checkErr = check.CheckErr
	userMaxAge = make(map[string]time.Time)
	p = fmt.Println
	Fprintf = fmt.Fprintf
	Query = query.Query
	// create a  session 
	store = sessions.NewCookieStore([]byte(time.Now().Format("2019-02-23 21:33:22")))
) 

func CreateServer(port string) error {
	err := http.ListenAndServe(port,nil)
	checkErr(err)
	log.Println("started",time.Now())
	return nil
}

func InitHandleFunc(){
	//  p(*http.Request)
	 http.HandleFunc("/api/user/login",HandleLogin)
	 http.HandleFunc("/api/user/management",HandleUser)
}

func CheckAuth(w http.ResponseWriter,r *http.Request)bool{
	
	var res = make(map[string]interface{})
	if item,ok :=r.Header["Cookie"];!ok{
		res["code"] = 10031
		res["msg"] = "用户未登录"
		Fprintf(w,FormatJson(res))
		return false
	}else{
		for _,v :=range item {
			cookieKey := strings.Split(v,"=")[0]
			sess,_ := store.Get(r,cookieKey)
			format := "2006-01-02 15:04:05"
			t1,err := time.Parse(format,time.Now().Format(format))
			t2,err := time.Parse(format,userMaxAge[cookieKey].Format(format))
			if err== nil && t1.After(t2) {
				res["code"] = 10032
				res["msg"] = "登录已过期"
				sess.Values[cookieKey] = false
				Fprintf(w,FormatJson(res))
				return false
			}
		} 
	}
	return true
}

func FormatJson(res map[string]interface{}) string {
	jsonData,err := json.Marshal(res)
	checkErr(err)
	return string(jsonData)
}

// option func
func MethodFunc(queryStr string,method string, w http.ResponseWriter){
		
	var res = make(map[string]interface{})
		databaseRes := Query(queryStr)
		res["code"] = 10000
		if method == "GET" {
			res["msg"] = databaseRes
		}else {
			res["msg"] = method
		}
		Fprintf(w,FormatJson(res))
}

// func MethodPost(queryStr string,w http.ResponseWriter){
		
// 	var res = make(map[string]interface{})
// 		databaseRes := Query(queryStr)
// 		if databaseRes == nil {
// 			res["code"] = 10000
// 			res["msg"] = "添加成功"
// 			Fprintf(w,FormatJson(res))
// 		}
// }
// func MethodPut(queryStr string,w http.ResponseWriter){
		
// 	var res = make(map[string]interface{})
// 		databaseRes := Query(queryStr)
// 		if databaseRes == nil {

// 			res["code"] = 10000
// 			res["msg"] = "修改成功"
// 			Fprintf(w,FormatJson(res))
// 		}
		
// }
// func MethodDelete(queryStr string,w http.ResponseWriter){
		
// 	var res = make(map[string]interface{})
// 		databaseRes := Query(queryStr)
// 		if databaseRes == nil {

// 			res["code"] = 10000
// 			res["msg"] = "删除成功"
// 			Fprintf(w,FormatJson(res))
// 		}
// }