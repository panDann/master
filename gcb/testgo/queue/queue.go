package queue



type Queue struct {
	Arr []int
}



func(q *Queue) Enqueue(e int) {
	q.Arr = append(q.Arr,e)
}

func(q *Queue) Top()int {
	return q.Arr[0]
}

func(q *Queue) Dequeue()int {
	tem := q.Arr[0]
	q.Arr = q.Arr[1:len(q.Arr)]
	return tem
}