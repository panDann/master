package handler

import (
	"net/http"
)

func HandleProjectBuild(w http.ResponseWriter,r * http.Request) {//authentic user login 

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
			queryStr = `Select * from  (Select * From project_build where type = '`+docType+`') as tem  limit `+limit+` offset `+offset+` `
			method = "GET"
			break 
		case "POST": 
			r.ParseMultipartForm(1024)
			title := r.Form["title"][0]
			summary := r.Form["summary"][0]
			content := r.Form["content"][0]
			image_url := r.Form["image_url"][0]
			docType:= r.Form["type"][0]
			queryStr = `insert into project_build(title,summary,content,type,image_url,create_time) Values ('`+title+`','`+summary+`','`+content+`','`+docType+`','`+image_url+`',now())`
			method = "添加成功"
			break 
		case "PUT": 
			r.ParseMultipartForm(1024)
			title := r.Form["title"][0]
			summary := r.Form["summary"][0]
			content := r.Form["content"][0]
			image_url := r.Form["image_url"][0]
			id := r.Form["id"][0]
			queryStr = `update  project_build set title= '`+title+`',image_url= '`+image_url+`',summary='`+summary+`',content='`+content+`' Where id = `+id+``
			method = "修改成功"
			break 
		case "DELETE": 
			r.ParseMultipartForm(1024)
			ids := r.Form["ids"][0]
			queryStr = `Delete From project_build Where id in (`+ids+`)`
			method = "删除成功"
			break 
		default:break 
	}
	MethodFunc(queryStr,method,w)
	
}