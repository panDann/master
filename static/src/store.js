const store={
    state:{
        count:1,
        headStatus:sessionStorage.localRouterIndex? this.activeIndex2=sessionStorage.localRouterIndex:'6',
        username:''||getCookie('pay_username'),
    },
    getters:{
        todo:sta=>{
            let t=sta.count+1
            // console.log(sta,'sta')
            return t
        }
    },
    mutations:{
        increment:(sta,obj)=>{
             sta.count+=obj
        },
        modifyHeadStatus:(sta,index)=>{
            sta.headStatus=index;
            sessionStorage.localRouterIndex=index;
            // console.log(sta.headStatus)
        },
        cookieState(sta,username){
            sta.username=getCookie(username)
        }
    }
}

 function  getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
}

export default store