import axios from 'axios'
import Loading from './loading/loading.vue'
import Vue from 'vue'

const Load = Vue.extend(Loading)
const l = new Load({
    el: document.createElement("div"),
})
    // setTimeout(() => {

axios.interceptors.request.use(function (res) {
        document.body.appendChild(l.$el)
        return res
})
axios.interceptors.response.use(function(res){
    document.body.removeChild(l.$el)
    if(res.status !=200){
        alert("服务器出错")
        return
    }
    if(res.data.code >=10030){
        alert("登录已过期")
        location.reload()
    }   
    return res
})

export default {
    getMessage(url,...config){
        return axios.get(url,)
    },
    postMessage(url,params){
        return axios.post(url,params)
    },
    putMessage(url,params){
        return axios.put(url,params)
    },
    deleteMessage(url,params){
        return axios.delete(url,{data:params})
    }

}