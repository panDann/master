package check_err

import (
	"log"
)

func CheckErr(err error)  {
	 if err != nil {
		 log.Fatalf("error is %v",err)
	 }
}