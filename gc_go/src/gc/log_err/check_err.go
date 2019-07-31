package log_err

import (
	"log"
	"io"
	"os"
	"time"
)

func CheckErr(err error)  {
	 if err != nil {
		 log.Fatalf("error is %v",err)
	 }
}

func PrintLog()  {
	if r := recover(); r !=nil {
		file,err := os.OpenFile("./gc_error.txt",os.O_CREATE|os.O_APPEND|os.O_WRONLY,os.ModeAppend)
		file.Close()
		CheckErr(err)
		len,err := io.WriteString(file,time.Now().String()+` error:`+r.(string))
		CheckErr(err)
		log.Fatalf("write file length is %v",len)
	}
	
}