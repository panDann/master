import Loading from './loading.vue'

import Vue from 'vue'


const Load = Vue.extend(Loading)

function showLoading(isShow){
        const l = new Load({
            el:document.createElement("div"),
            data(){
                return {
                    isShow:isShow
                }
            }
        })
        document.body.appendChild(l.$el)
        if(isShow == false){
            setTimeout(() => {
             document.body.removeChild(l.$el)
            }, 1000);
        }
}

function install(){
    Vue.prototype.$loading = showLoading
}

export default install
