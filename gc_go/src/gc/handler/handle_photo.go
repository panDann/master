package handler

import (
	// "fmt"
	"time"
	"net/http"
    _ "github.com/go-sql-driver/mysql"
    // "go_api/data"
	"os"
	"io"
	log "gc/log_err"
	"strconv"
	// "regexp"
    // "strings"
    // "io/ioutil"
)

func HandlePhoto(w http.ResponseWriter,r * http.Request){
	defer log.PrintLog()
	r.ParseMultipartForm(1024)
    var res = make(map[string]interface{})
	file,fileHeader,err := r.FormFile("file")
	checkErr(err)
	p(file)
	// path := "C:/Users/Administrator/Desktop/image/"
	path := "/home/ubuntu/gc_back/images/"
	timeStr :=strconv.Itoa(int(time.Now().Unix()))
	img,err := os.Create(path+timeStr+fileHeader.Filename)
	checkErr(err)
	leng,err :=io.Copy(img,file)
	checkErr(err)

	res["code"] = 10000
	res["msg"] = timeStr+fileHeader.Filename
	res["len"] = leng
	Fprintf(w,FormatJson(res))
}
