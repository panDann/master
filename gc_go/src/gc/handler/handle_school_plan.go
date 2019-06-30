package handler

import (
	"net/http"
)

func HandleSchoolPlan(w http.ResponseWriter,r * http.Request) {//authentic user login 

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
			docType:= r.URL.Query()["type"][0]
			queryStr = `Select * from  (Select * From school_plan where type = '`+docType+`') as tem  limit `+limit+` offset `+offset+` `
			method = "GET"
			break 
		case "POST": 
			r.ParseMultipartForm(1024)
			image_url := r.Form["image_url"][0]
			docType:= r.Form["type"][0]
			queryStr = `insert into school_plan(image_url,type,create_time) Values ('`+image_url+`','`+docType+`',now())`
			method = "添加成功"
			break 
		case "PUT": 
			r.ParseMultipartForm(1024)
			image_url := r.Form["image_url"][0]
			id := r.Form["id"][0]
			queryStr = `update  school_plan set image_url= '`+image_url+`' Where id = `+id+``
			method = "修改成功"
			break 
		case "DELETE": 
			r.ParseMultipartForm(1024)
			ids := r.Form["ids"][0]
			queryStr = `Delete From school_plan Where id in (`+ids+`)`
			method = "删除成功"
			break 
		default:break 
	}
	MethodFunc(queryStr,method,w)
	
}