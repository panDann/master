package main 

import (
	"fmt"
	 queue "./queue"
	 stack "./stack"
	 link  "./linked_list"
)
var p = fmt.Println

type Stack struct {
	arr []int
}




func main() {
	 t := new(stack.Stack)
	 t.Arr = []int{1,2}
	 t.Pop()
	 q := new(queue.Queue)
	 q.Arr = []int{1,2,3}
	 
	 q.Dequeue()
	 q.Enqueue(4)
	 p(t.Arr,q.Arr,q.Top())

	var (
		head *link.Link  
		tem  *link.Link
	)
	for i:=0;i < 5;i++ {
		v := link.Link{i,nil}
		if i == 0 {
			head = &v
			tem = head
		} else {
			tem.Next = &v
			// p(head,tem)
			tem = &v
		}
	}
	// head.InsertAtEnd(link.Link{100,nil})
	// head.InsertAtEnd(link.Link{100,nil})

	// head = head.InsertAtHead(link.Link{100,nil})

	head,isDelete := head.Delete(link.Link{1,nil})
	tem = head
	for{
		p(tem,isDelete) 	
		if tem.Next == nil{
			break
		}
		tem = tem.Next
	}
	searc := head.Search(link.Link{1,nil})
	p(searc)
}


