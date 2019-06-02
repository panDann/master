import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import Notice from './components/notice/index'


Vue.config.productionTip = false

Vue.use(Notice)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
