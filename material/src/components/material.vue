<template>
    <div>
                <mu-appbar style="width: 100%;" color="primary">
                        <mu-button icon slot="left">
                        <mu-icon value="XC"></mu-icon>
                        </mu-button>
                        素材审核

                        <mu-button flat slot="right" @click="getData">
                            <mu-icon value="refresh" :class="{refresh:isRefresh}"></mu-icon>
                        </mu-button>
                    </mu-appbar>

                <div class="matetrial-content">
                        <mu-container>
                                <mu-icon value="refresh" :class="{refresh:isRefresh}" v-show="isRefresh" style="position:absolute;top:0px;right:5px;"></mu-icon>

                                <mu-expansion-panel v-for='(v,i) in materialData' :key="i" >
                                    <div slot="header">{{i}}（<span style="color:#ff4081" v-if="checkState(v)=='done'">待审核</span>
                                        <span style="color:#409eff" v-else>未审核完</span>
                                        ）
                                    </div>
                                    <div v-for="(k,j) in v" :key="j" class="text-div">
                                                            <p style="text-indent:20px;">
                                                                    {{j+1}}. {{k.text | filter}}
                                                                </p>  
                                                <div class="select-control-group" style="">
                                                    <mu-flex class="select-control-row" >
                                                        <mu-radio value="驳回" v-model="k.check"  label="" color="#ff4081" @change="sendState(k)"></mu-radio><span style="color:#ff4081;margin-right:1rem;margin-left:.5rem;">驳回</span>
                                                        <mu-radio value="通过" v-model="k.check"  label="" color="#42b983" @change="sendState(k)"></mu-radio><span style="color:#42b983;margin-right:1rem;margin-left:.5rem;">通过</span>
                                                    </mu-flex>
                                                </div>
                
                                    </div>
                                    <!-- <mu-button slot="action" flat @click="cancelState">取消</mu-button> -->
                                    <mu-button slot="action" flat color="primary" @click="finishState(i)">提交</mu-button>
                                </mu-expansion-panel>
                                <div v-show="isEmpty">
                                            <p style="color:#ff4081;font-size:20px;letter-spacing:2px;"> <span class="no-material">无</span>素材可审核</p>
                                </div>
                        </mu-container>
                    <mu-button color="primary" style="margin-top:1rem;" v-show="!isEmpty" @click="quickAgree">全 部 通 过</mu-button>

               </div>



    </div>
</template>
<script>
import Axios from 'axios';

export default {    
    data(){
        return{
            materialData:[],
            openFullscreenDialog:false,
            check:'',
            isRefresh:false,
            isEmpty:Boolean,
        }
    },
    mounted(){
        this.getData()
    },
  
    methods:{
        isEmptyFun(obj){
            let tem=true ;
            for(let v in obj){
                    if(v){
                        tem=false;
                    }
            }
            this.isEmpty=tem;
            return tem
        },
        getData(){
            this.isRefresh=true;
            let url=`/api/resource/moments_check`
                 Axios.get(url,)
                 .then(res=>{
                     this.isRefresh=false;
                     if(res.data.code==10000){
                            this.materialData=res.data.msg;
                            this.isEmptyFun(this.materialData)
                     }else{
                            this.$toast.error(res.data.msg)
                     }
                 })
                 .catch(err=>{
                            this.$toast.error(err)
                 })
        },
        sendState(obj){
            let temCheck=obj.check.match(/^\D+/ig)[0];
            if(temCheck=="驳回"){
                obj.reason=prompt('输入驳回原因')
                if(!obj.reason){
                    this.$toast.error('未输入原因，将默认为‘通过’')
                    obj.check='通过'
                    temCheck='通过'
                }
            }else{
                obj.reason=''
            }
            this.isRefresh=true;
            let url=`/api/resource/moments_check?id=${obj.id}&check=${temCheck}&reason=${obj.reason}`
                 Axios.put(url,)
                 .then(res=>{
                    this.isRefresh=false;
                     if(res.data.code==10000){
                            // this.materialData=res.data.msg;
                     }else{
                            this.$toast.error(res.data.msg)
                     }
                 })
                 .catch(err=>{
                            this.$toast.error(err)
                 })
        },// sendState end 
        checkState(arr){
            for(let i=0,l=arr.length;i<l;i++){
                if(arr[i].check!='待审核'){
                    return 'unfinished'
                }
            }
            return 'done'
        },
         checkFinish(arr){
            for(let i=0,l=arr.length;i<l;i++){
                if(arr[i].check=='待审核'){
                    return {
                              state:'unfinished',
                              index:i+1
                             } 
                }
            }
            return {
                              state:'done',
                              index:''
                             } 
        },
        finishState(index){
            // alert(index)
            let finish=this.checkFinish(this.materialData[index])
            if(finish.state=="unfinished"){
                this.$toast.error(`第 ${finish.index} 条未审核，不能提交`)
                return
            }
            this.isRefresh=true;
            this.$toast.message('提交审核，请稍候')
            let self=this;
            setTimeout(()=>{
                self.isRefresh=false;
                delete self.materialData[index];
                self.isEmptyFun(self.materialData)
            },2000)
        },
        quickAgree(){
            let conf=confirm('可能仍有未审核的条目，是否继续？')
            if(!conf) return;
            let temData=[];
            for(let v in this.materialData){
                temData.push(v)
            }
            let url=`/api/resource/moments_alter_check?group_names=${temData}`
                this.isRefresh=true;
                this.$toast.message('提交审核中')
                Axios.post(url,)
                    .then(res=>{
                        this.isRefresh=false;
                        if(res.data.code==10000){
                                this.getData()
                                this.$toast.success('审核成功')
                                // this.materialData=res.data.msg;
                        }else{
                                this.$toast.error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                                this.$toast.error(err)
                    })
        },
        cancelState(){
                this.materialData=this.materialData;
        },
      
    },// methods end
     filters:{
        
        filter(value){
           return value.split('|||')[0]
         }
       }
}
</script>

<style scoped>
.matetrial-content{
      position: absolute;
    top: 1rem;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    overflow: auto;
    height: 20rem;
    border-radius: 10px;
    width: 90%;
}
.text-div{
    margin-bottom: .5rem;
    border-bottom: .5px solid rgb(46, 179, 202);
    border-radius: 10px;
}
.no-material{
    transition: all .5s;
    animation: noMaterial infinite 2s ease-in;
}
@keyframes noMaterial {
    0%{color: #ff4081}
    100%{color: #ff4081}
    50%{color: #1dc4a0}
}
.refresh{
    animation: refresh 1s infinite linear;
}
@keyframes refresh {
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}

}
</style>
