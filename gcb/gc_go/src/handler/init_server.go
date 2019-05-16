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
	
)
var (
	checkErr = check.CheckErr
	userMaxAge = make(map[string]time.Time)
	p = fmt.Println
	Fprintf = fmt.Fprintf
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
	 http.HandleFunc("/api/user/login",HandleLogin)
	 http.HandleFunc("/api/user/management",HandleUser)
}

func CheckAuth(w http.ResponseWriter,r *http.Request) bool{
	
    var res = make(map[string]interface{})
	var cookie = r.Header["Cookie"][0]
	if cookie == "" {
		res["code"] = 10031
		res["msg"] = "用户未登录"
		Fprintf(w,FormatJson(res))
		return false
	}
	cookieKey := strings.Split(cookie,"=")[0]
	sess,_ := store.Get(r,cookieKey)
	if sess.Values[cookieKey] != true  {
		res["code"] = 10031
		res["msg"] = "用户未登录"
		Fprintf(w,FormatJson(res))
		return false
	}
	// authority expire
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
	return true
}

func FormatJson(res map[string]interface{}) string {
	jsonData,err := json.Marshal(res)
	checkErr(err)
	return string(jsonData)
}