package main

import (

	"./handler"
)

func main (){
	
	handler.InitHandleFunc()
	handler.CreateServer(":9000")
	
}




