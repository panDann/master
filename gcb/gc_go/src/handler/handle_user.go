package handler

import (
	"net/http"
    "time"
	query "../data_query"
)

func HandleLogin(w http.ResponseWriter,r * http.Request) {//authentic user login 
			
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
	 // authorication 
	queryString := `select * From user 
		                where username="`+user+`" and password="`+pass+`"` 
	databaseAuth := query.Query(queryString)
	if len(databaseAuth) >= 1 {
		res["code"] = 10000
		res["msg"] = "登录成功"
		//set user session
		sess,_ := store.New(r,databaseAuth[0]["username"])
		sess.Values[databaseAuth[0]["username"]] = true
		userMaxAge[databaseAuth[0]["username"]] = time.Now().Add(time.Second*200)
		err := sess.Save(r,w)
		checkErr(err)
		
	}else{
		res["code"] = 10011
		res["msg"] = "用户名或密码不正确"
	}
	Fprintf(w,FormatJson(res))
}

func HandleUser(w http.ResponseWriter,r * http.Request) {//authentic user login 
			
			
    var res = make(map[string]interface{})
	r.ParseMultipartForm(1024)
	user := r.Form["username"][0]
	pass := r.Form["password"][0]

	switch (r.Method) {
		case "GET": 
		case "POST": 
		case "PUT": 
		case "DELETE": 
		default:break 
	}
		res["code"] = 10011
		res["msg"] = "用户名或密码不能为空"
		Fprintf(w,FormatJson(res))
	if !CheckAuth(w ,r) {
		return
	}
	 //  
    queryString := `insert into user(username,password) Values ('`+user+`','`+pass+`')`
	databaseRes := query.Query(queryString)
	if databaseRes == nil {
		res["code"] = 10000
		res["msg"] = "插入成功"
		Fprintf(w,FormatJson(res))
	}
	
		
}