const store={
    state:{
        isLogin:getCookie('pay_username'),
        shift:sessionStorage.routerIndex
    },
    mutations:{
        confirmLogin(sta,confirm){
            sta.isLogin=confirm
        },
    },
    actions:{

    },
}

export default store;

function  getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
 }