package stack 




type Stack struct {
	Arr []int
}





func (s *Stack)Top() interface{}{
	return s.Arr[len(s.Arr)-1]
}

func (s *Stack)Push(el int) {
	 s.Arr = append(s.Arr,el)
}

func (s *Stack)Pop() {
     s.Arr = s.Arr[:len(s.Arr)-1]
}

func (s *Stack)isEmpty()bool {
		if len(s.Arr)==0 {
			return true
		}else {
			return false
		}
 }
