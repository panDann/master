const store={
    state:{
     
      routerIndex:sessionStorage.routerIndex||'/mine',
      username:getCookie('pay_username'),
    
    },
    getters:{
        
    },
    mutations:{
       updateWithdrawNote(sta,obj){
                sta.withdrawNote=obj
       },
       updateRouter(sta,value){
           sta.routerIndex=value
           sessionStorage.routerIndex=value
       },
       updateUsername(sta,value){
            sta.username=value
    },
    }
}
function  getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
 }
export default store;