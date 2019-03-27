import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

// import { Button, Table } from 'iview';
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

// Vue.component('Button', Button);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
