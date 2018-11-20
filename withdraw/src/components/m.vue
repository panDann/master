<template>
    <div>
                <mu-appbar style="width: 100%;" color="primary">
                        <mu-button icon slot="left">
                        <mu-icon value="XC"></mu-icon>
                        </mu-button>
                           提现记录
                        <mu-button flat slot="right" @click="getData">
                            <mu-icon value="refresh" :class="{refresh:isRefresh}"></mu-icon>
                        </mu-button>
                    </mu-appbar>
                            <mu-paper :z-depth="5">
                                <mu-data-table :columns="columns" border :sort.sync="sort" @sort-change="handleSortChange" :data="list" 
                                        data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading"
                                        >
                                        <template slot-scope="scope">
                                            <td class="is-left" style="overflow:hidden;overflow-text:ellipsis;white-space:nowrap">{{scope.row.order_no}}</td>
                                            <!-- <td class="is-left">{{scope.row.amount}}</td> -->
                                            <td class="is-left">{{scope.row.receipt_amount}}</td>
                                            <td class="is-center">{{handleStatus(scope.row.status)}}</td>
                                            <td class="is-center"><span style="color:#67c23a">{{formdataTime(scope.row.create_time)}}</span></td>
                                            <td class="is-left">
                                                {{scope.row.no_login? '':'未到账'}}
                                            </td>
                                        </template>
                                </mu-data-table>
                            </mu-paper>
                    <mu-button color="primary" style="margin-top:1rem;" v-show="!isEmpty" @click="quickAgree">全 部 通 过</mu-button>

    </div>
</template>
<script>
import Axios from 'axios';
import moment from 'moment';

export default {    
    data(){
        return{
            openFullscreenDialog:false,
            check:'',
            isRefresh:false,
            isEmpty:Boolean,
            list:[],// table data
            loading:false,
            sort: {
                name: '',
                order: 'asc'
            },
            columns: [
                { title: '订单号', name: 'cTime', width: 120, align: 'left',  },
                { title: '提现金额', width: 100, name: 'num_total',align: 'left',sortable:true },
                { title: '状态', name: 'verification_code', width: 126, align: 'center', },
                { title: '提现时间', name: 'no_login', width: 200, align: 'center', },
                { title: '到账时间', name: 'success_register', width: 200, align: 'left', },
            ],
        }
    },
    mounted(){
        this.getData()
    },
  
    methods:{
        handleSortChange({name, order}){
            this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
        },
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
            let url=`/api/transfer/withdraw/record`
                 Axios.get(url,)
                 .then(res=>{
                     this.isRefresh=false;
                     if(res.data.code==10000){
                            this.list=res.data.msg.records;
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
        handleStatus(sta){
            switch(sta){
                case 'SUCCESS':return '成功';
                case 'FAIL':return '失败';
                case 'INIT':return '待处理';
                case 'DEALING':return '处理中';
                case 'REFUND':return '退票';
                        default:return '未知' 
            }
       },
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
     formdataTime(time){
       let tem=''
       time? tem=moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss'):tem='待确定'
      return tem
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
