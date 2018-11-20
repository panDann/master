import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import VueRouter from 'vue-router'
import Vuex from 'vuex'


Vue.use(Toast);
Vue.use(Message);
Vue.use(MuseUI)
Vue.use(VueRouter)
Vue.use(Vuex)
import Store from './store'

let store=new Vuex.Store(Store);

import Material from './components/material'
import Mine from './components/mine'
import Login from './components/login'
import Withdraw from './components/Withdraw'


const router=new VueRouter({
  routes:[
    {
      path:'/material',
      component:Material,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path:'/login',
      component:Login,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
     {
      path:'/mine',
      component:Mine,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path:'/withdraw',
      component:Withdraw,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ]
})

router.beforeEach((to,from,next)=>{
    let getCookie=function(name){
                var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
                else
                return null;
              };
    let username=getCookie('pay_username')
      if(!username){
        if(to.path=='/login'){
          next()
        }else{
          next('/login')
        }
      }else{
          sessionStorage.routerIndex=to.path
          next()
      }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
