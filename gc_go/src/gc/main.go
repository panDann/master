package main

import (
	"gc/handler"
)

func main (){
	
	handler.InitHandleFunc()
	handler.CreateServer(":9000")
	
}




