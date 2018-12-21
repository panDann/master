import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import promise from 'es6-promise'
promise.polyfill()

Vue.prototype.$axios=axios;

Vue.use(Vuex);
Vue.use(VueRouter);

import Store from "./store"
import Router from "./router"
var store=new Vuex.Store(Store)
var router=new VueRouter({
  mode:"history",
  routes:Router
})

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
