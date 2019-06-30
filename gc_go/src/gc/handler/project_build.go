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

			var keys,values = "",""
			for i,v := range r.Form {
				keys += i+","
				values +=`'`+v[0]+`',`
			}
			// title := r.Form["title"][0]
			// summary := r.Form["summary"][0]
			// content := r.Form["content"][0]
			// image_url := r.Form["image_url"][0]
			// docType:= r.Form["type"][0]
			queryStr = `insert into project_build(`+keys+`create_time) Values (`+values+`now())`
			method = "添加成功"
			break 
		case "PUT": 
			r.ParseMultipartForm(1024)
			title := r.Form["title"][0]
			summary := r.Form["summary"][0]
			content := r.Form["content"][0]
			image_url := r.Form["image_url"][0]
			style := r.Form["style"][0]
			is_topping := r.Form["is_topping"][0]

			id := r.Form["id"][0]
			queryStr = `update  project_build set title= '`+title+`',image_url= '`+image_url+`',summary='`+summary+`',content='`+content+`',style='`+style+`',is_topping=`+is_topping+` Where id = `+id+``
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