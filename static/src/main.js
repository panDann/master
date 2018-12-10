import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import Router from 'vue-router'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import './assets/main.css';
import axios from 'axios';

axios.interceptors.response.use(function (response) {
  // token 已过期，重定向到登录页面
	if (response.data.status == 403){
    alert('无访问权限')
		localStorage.clear()
		router.replace({
                        path: '/frist',
                        // query: {redirect: router.currentRoute.fullPath}
                    })
	}
	return response
}, function (error) {
	// Do something with response error
	return Promise.reject(error)
})

Vue.use(Element)
Vue.use(Router)
Vue.use(Vuex)

import routes from './route.js'
const router=new Router({
  // mode:'history',
  routes:routes,
})

import Store from './store'
const store=new Vuex.Store(Store)

router.beforeEach((to,from,next)=>{

   let username=getCookie('pay_username')
    // alert(username)
    if(!username){
      if(to.path=='/login'){
        next()
      }else{
        next('/login')
      }
    }else{
      next()
    }
    
})

router.afterEach((to,from)=>{

})// router afterEach end
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.prototype.getCookie=function(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
  return unescape(arr[2]);
  else 
  return null;
}

function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
  return unescape(arr[2]);
  else
  return null;
  }