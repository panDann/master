package handler

import (
	"net/http"
	"time"
	"strings"
)

func HandleLogin(w http.ResponseWriter,r * http.Request) {//authentic user login 
	
	if r.Method == "DELETE" {
		HandleLogout(w,r)
		return
	}
    var res = make(map[string]interface{})
	r.ParseMultipartForm(1024)
	user := r.Form["username"][0]
	pass := r.Form["password"][0]
	if user == "" || pass == "" {
		res["code"] = 10011
		res["msg"] = "用户名或密码不能为空"
		Fprintf(w,FormatJson(res))
		return
	}
	//  authorication 
	queryString := `select * From user 
		                where username="`+user+`" and password="`+pass+`"` 
	databaseAuth := Query(queryString)
	if len(databaseAuth) >= 1 {
		res["code"] = 10000
		res["msg"] = "登录成功"
		//set user session
		w.Header().Set("Cookie","")
		sess,_ := store.New(r,databaseAuth[0]["username"])
		sess.Values[databaseAuth[0]["username"]] = true
		userMaxAge[databaseAuth[0]["username"]] = time.Now().Add(time.Second*20000)
		sess.Options.MaxAge = 20000
		// sess.Options.HttpOnly = true
		err := sess.Save(r,w)
		checkErr(err)
		
	}else{
		res["code"] = 10011
		res["msg"] = "用户名或密码不正确"
	}
	Fprintf(w,FormatJson(res))
}

func HandleLogout(w http.ResponseWriter,r * http.Request){
	var res = make(map[string]interface{})

	if item,ok :=r.Header["Cookie"];!ok{
		res["code"] = 10000
		res["msg"] = "退出成功"
		Fprintf(w,FormatJson(res))
	}else{
		for _,v :=range item {
			cookieKey := strings.Split(v,"=")[0]
			sess,_ := store.New(r,cookieKey)
			sess.Options.MaxAge = -1
			userMaxAge[cookieKey] = time.Now()
			sess.Save(r,w)
			res["code"] = 10000
			res["msg"] = "退出成功"
			sess.Values[cookieKey] = false
			Fprintf(w,FormatJson(res))
		} 
	}
}

func HandleUser(w http.ResponseWriter,r * http.Request) {//authentic user login 

	if r.Method != "GET" {
		if !CheckAuth(w,r){
			return
		}
	}
	var queryStr string
	    method :="is no get"
	switch (r.Method) {
		case "GET": 
			limit:= r.URL.Query()["limit"][0]
		    offset:= r.URL.Query()["offset"][0]
			queryStr = `Select * From user  limit `+limit+` offset `+offset+``
			method = "GET"
			break 
		case "POST": 
			r.ParseMultipartForm(1024)
			user := r.Form["username"][0]
			pass := r.Form["password"][0]
			queryStr = `insert into user(username,password,create_time) Values ('`+user+`','`+pass+`',now())`
			method = "添加成功"
			break 
		case "PUT": 
			r.ParseMultipartForm(1024)
			user := r.Form["username"][0]
			pass := r.Form["password"][0]
			id := r.Form["id"][0]
			queryStr = `update  user set username= '`+user+`',password='`+pass+`' Where id = `+id+``
			method = "修改成功"
			break 
		case "DELETE": 
			r.ParseMultipartForm(1024)
			ids := r.Form["ids"][0]
			queryStr = `Delete From user Where id in (`+ids+`)`
			method = "删除成功"
			break 
		default:break 
	}
	MethodFunc(queryStr,method,w)
	
}