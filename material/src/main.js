import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Toast from 'muse-ui-toast';
import VueRouter from 'vue-router'

Vue.use(Toast);
Vue.use(MuseUI)
Vue.use(VueRouter)

import Material from './components/material'
import Mine from './components/mine'
import Login from './components/login'


const router=new VueRouter({
  routes:[
    {
      path:'/material',
      component:Material
    },
    {
      path:'/test1',
      component:{
        template:`<h1>功能为上线</h1>`
      },
    },
    {
      path:'/test',
      component:{
        template:`<h1>功能为上线</h1>`
      },
    },
    {
      path:'/login',
      component:Login
    },
     {
      path:'/mine',
      component:Mine
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
    let username=getCookie('report_username')
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
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
