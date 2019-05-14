import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import Axios from 'axios';

Vue.config.productionTip = false

Axios.interceptors.request.use((req)=>{
  req.headers["AccessToken"]= localStorage.getItem("AccessToken")
  return req 
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
