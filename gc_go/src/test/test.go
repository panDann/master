package main

import (
	t "test/stringcon"
	"log"
	"io"
	"os"
	"time"
	"fmt"
)

func  main()  {
	// defer PrintLog()
	// panic("test panic")
	var i interface{}
	i = "132"
		t.Test()	
	fmt.Printf("%T",i.(bool))
}

func CheckErr(err error)  {
	if err != nil {
		log.Fatalf("error is %v",err)
	}
}

func PrintLog()  {
	if r := recover(); r !=nil {
		file,err := os.OpenFile("./gc_error.txt",os.O_CREATE|os.O_APPEND|os.O_WRONLY,os.ModeAppend)
		CheckErr(err)
		len,err := io.WriteString(file,time.Now().String()+` error:`+r.(string))
		CheckErr(err)
		log.Fatalf("write file length is %v",len)
	}
	
}