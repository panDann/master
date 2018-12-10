import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Toast from 'muse-ui-toast';

Vue.use(Toast);
Vue.use(MuseUI)

const options={
  position: 'bottom',               // 弹出的位置
  time: 2000,                       // 显示的时长
  closeIcon: '',               // 关闭的图标
  close: true,                      // 是否显示关闭按钮
  successIcon: '',      // 成功信息图标
  infoIcon: 'info',                 // 信息信息图标
  warningIcon: 'priority_high',     // 提醒信息图标
  errorIcon: '!'              // 错误信息图标
}
Toast.config(options)
new Vue({
  el: '#app',
  render: h => h(App)
})
