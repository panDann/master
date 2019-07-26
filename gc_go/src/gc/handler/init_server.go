package handler

import (
	"net/http"
	"log"
    "time"
	"strings"
	"encoding/json"
	"fmt"
	"html"
	"github.com/gorilla/sessions"
	check "gc/log_err"
	query "gc/query"
)
var (
	checkErr = check.CheckErr
	userMaxAge = make(map[string]time.Time)
	p = fmt.Println
	Fprintf = fmt.Fprintf
	Query = query.Query
	H= html.EscapeString
	host = "http://127.0.0.1/"
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
	 CreateTable()
	 http.HandleFunc("/api/user/login",HandleLogin)
	 http.HandleFunc("/api/user/management",HandleUser)
	 http.HandleFunc("/api/home",HandleHome)
	 http.HandleFunc("/api/work_status",HandleWorkStatus)
	 http.HandleFunc("/api/work_duty",HandleWorkDuty)
	 http.HandleFunc("/api/item_manager",HandleItemManager)
	 http.HandleFunc("/api/policy",HandlePolicy)
	 http.HandleFunc("/api/school_plan",HandleSchoolPlan)
	 http.HandleFunc("/api/project_build",HandleProjectBuild)
	 http.HandleFunc("/api/building_detail",HandleBuildingDetail)


	 http.HandleFunc("/api/image",HandlePhoto)


}

func checkRequest(r *http.Request) {
				r.ParseMultipartForm(1024)
			if _,ok := r.Form["content"]; ok {
				r.Form["content"][0] = H(r.Form["content"][0])
			}
}

func CheckAuth(w http.ResponseWriter,r *http.Request)bool{
	
	var res = make(map[string]interface{})
	if item,ok :=r.Header["Cookie"];!ok{
		res["code"] = 10031
		res["msg"] = "用户未登录"
		Fprintf(w,FormatJson(res))
		return false
	}else{
		var count = 0
		for _,v :=range item {
			cookieKey := strings.Split(v,"=")[0]
			loginStore,err := store.Get(r,cookieKey)
			if loginStore.Values[cookieKey]==nil {
				count++
				continue
			}
			if count == len(item) {
				res["code"] = 10032
				res["msg"] = "非法用户"
				Fprintf(w,FormatJson(res))
			}
			format := "2006-01-02 15:04:05"
			t1,err := time.Parse(format,time.Now().Format(format))
			t2,err := time.Parse(format,userMaxAge[cookieKey].Format(format))
			if err== nil && t1.After(t2) {
				sess,_ := store.New(r,cookieKey)
				sess.Options.MaxAge = -1
				userMaxAge[cookieKey] = time.Now()
				sess.Save(r,w)
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