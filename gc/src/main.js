// import "@babel/polyfill"
// useBuiltIns: 'entry'
import "@babel/polyfill"
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import Loading from './components/loading/index'


import "current-script-polyfill"

import Notice from './components/notice/index'

Vue.use(Vuetify, {
  iconfont: 'md',
})
Vue.config.productionTip = false
Vue.use(Notice)
Vue.use(Loading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
