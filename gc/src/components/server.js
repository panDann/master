import axios from 'axios'

axios.interceptors.response.use(function(res){
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