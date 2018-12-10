import Vue from 'vue'
import App from './App.vue'
import Iview from 'iview'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import {Picker} from 'muse-ui'
import 'iview/dist/styles/iview.css';

Vue.use(Iview)
// Vue.use(Picker)

Vue.use(Vuex)
Vue.use(VueRouter)

import routes from './router'
import Store from './store'
import route from './router';

const router=new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
    if(to.path=='/'){
      sessionStorage.routerIndex='/mine'
      next('/mine')
    }
    if(!getCookie('pay_username')){
      if(to.path!='/login'){
         next('/login')
      }else{
         next()
      }
    }else{
      next()
    }
    // next()
})
const store=new Vuex.Store(Store)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})




function  getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
  return unescape(arr[2]);
  else
  return null;
}