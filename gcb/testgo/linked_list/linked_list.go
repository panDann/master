package linked_list

import "fmt"

var p = fmt.Println

type Link struct {

	Data int 
	Next *Link
}

func (l *Link)InsertAtEnd(e Link){
	tem := l
	for {
		tem = tem.Next
		if tem.Next == nil {
			tem.Next = &e
			e.Next =nil
			break
		}
	}
} 

func (l *Link)InsertAtHead(e Link)*Link{
	 
	  e.Next = l
	  l = &e
      return l
}

func (l *Link)Delete(e Link)(*Link,bool){
	var tem = l //count
	var cache = l  // cache pre node 
	// var res = l
	   count :=1
	for {
			if tem.Data == e.Data {
				if tem.Next == nil {
					cache.Next = nil 
				}else if count ==1 {
					l = tem.Next
				}else{
					cache.Next =  tem.Next
				}
				return l, true

			}
			if tem.Next == nil {
				return l, false
			}
			cache = tem 
			tem = tem.Next
			count++
	}
}

func (l *Link)Search(e Link) interface{} {
	var res Link
		tem := l 
	for {
		if tem.Data == e.Data {
			res = *tem
			return res
		}
		tem = tem.Next
		if tem.Data != e.Data && tem.Next ==nil {
			return false
		}
	}
}