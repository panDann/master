import Notice from './notice.vue'

import Vue from 'vue'


const noticeConstructor = Vue.extend(Notice)

function showToast(text, timeout = 2000) {
 
    // 实例化一个 toast.vue
    const toastDom = new noticeConstructor({
      el: document.createElement('div'),
      data() {
        return {
          text:text,
          snackbar:true,
          timeout:timeout
        }
      }
    })
   
    // 把 实例化的 toast.vue 添加到 body 里
    document.body.appendChild(toastDom.$el)
   
    // 过了 duration 时间后隐藏
    setTimeout(() => {
      toastDom.snackbar = false
      document.body.removeChild(toastDom.$el)
    } ,timeout + 2)
}

function registryToast() {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$toast()
    Vue.prototype.$Notice = showToast
  }
   

  export default registryToast  