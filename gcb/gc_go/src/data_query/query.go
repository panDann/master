package query

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	check "../../lib/log_err"
)

var (
	checkErr = check.CheckErr
	db,err = sql.Open("mysql","root:1125@tcp(127.0.0.1:3306)/maple")
)

func Query(s string)[]map[string]string {
	res ,err :=db.Query(s)
	checkErr(err)

	col ,err :=res.Columns()
	checkErr(err)

	item := make([][]byte,len(col))
	itemPointer := make([]interface{},len(col))

	for i,_ := range item{
		itemPointer[i] =&item[i]
	}
	var msg []map[string]string
	for res.Next() {
		err := res.Scan(itemPointer...)
		checkErr(err)
		tem :=make(map[string]string)
		for i,v := range item {
			tem[col[i]] = string(v)
		}
		msg=append(msg,tem)
	}

	return msg
}

// func QueryInsert(s string)[]map[string]string {
// 	res ,err :=db.Query(s)
// 	checkErr(err)

// 	col ,err :=res.Columns()
// 	checkErr(err)

// 	item := make([][]byte,len(col))
// 	itemPointer := make([]interface{},len(col))

// 	for i,_ := range item{
// 		itemPointer[i] =&item[i]
// 	}
// 	var msg []map[string]string
// 	for res.Next() {
// 		err := res.Scan(itemPointer...)
// 		checkErr(err)
// 		tem :=make(map[string]string)
// 		for i,v := range item {
// 			tem[col[i]] = string(v)
// 		}
// 		msg=append(msg,tem)
// 	}
// 	return msg
// }
