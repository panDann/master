<template>
  <div id="record" style="text-align:center;margin:0 auto;width:80%;overflow:auto;">
      <Table border :columns="columns5" :data="tableData" width="1200"></Table>
          <br>
      <Page :current.sync="currentPage" :total="page" :page-size="pageSize" @on-change="turnPage"/>
  </div>
</template>

<script>

import Axios from 'axios'
import moment from 'moment';

export default {
  name: 'app',
   data () {
    return {
     columns5: [
                    {
                        title: '订单号',
                        key: 'order_no',
                    },
                    {
                        title: '提现金额',
                        key: 'receipt_amount',
                        sortable: true,
                         render:(h,params)=>{
                            return h('span',{
                                stlye:{
                                    color:'green'
                                }
                            },params.row.receipt_amount) 
                        }
                    },
                     {
                        title: '提现手续费',
                        key: 'withdraw_fee',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render:(h,params)=>{
                            return h('div',this.handleStatus(params.row.status)) 
                        }
                    },
                    {
                        title: '提现时间',
                        key: 'create_time',
                        // sortable: true,
                        render:(h,params)=>{
                            return h('span',this.formdataTime(params.row.create_time)) 
                        }
                    },
                     {
                        title: '到账时间',
                        key: 'transger_time',
                        render:(h,params)=>{
                            return h('span',params.row.transfer_time? this.formdataTime(params.row.transfer_time):'未到账') 
                        }
                    }
                ],
                tableData: [],
         
      listMirror:[],
      pageSize:8,
      currentPage:1,      
      page:1,
      loading: false,
    }
  },
  computed:{
     
  },
  mounted(){
    this.getTable()
  },
  methods: {
    
      getTable(){
          this.loading=true;
          let sendStr=`/api/transfer/withdraw/record?page_size=${this.pageSize}`;
          Axios.get(sendStr,)
          .then((res)=>{
              this.loading=false;
              if(res.data.code==10000){
                this.tableData=res.data.msg.records
                this.page=res.data.msg.total
              }else{
                  this.$Message.error(res.data.msg)
              }
          })
          .catch((err)=>{
              console.log(err)
          })
      },
    handleTableData(obj){
            for(let v in obj){

            }
    },
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
    formdataTime(time){
       let tem=''
       time? tem=moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss'):tem='待确定'
      return tem
    },
    
      turnPage(index){
               this.loading=true;
               let sendStr=`/api/transfer/withdraw/record?page=${this.currentPage}&page_size=${this.pageSize}`;
               Axios.get(sendStr,)
                    .then((res)=>{
                        this.loading=false;
                        if(res.data.code==10000){
                            this.tableData=res.data.msg.records
                        }else{
                         this.$Message.error(res.data.msg)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
      },
      checkPageButton(index){
         if(index=='pre'){
              if(this.currentPage==1){
                this.$Message.error('已经是首页')
                this.loading=false;
                return 0
              }else{
                this.currentPage--
              }
         }else if(index="next"){
             if(this.currentPage==this.page){
                this.$Message.error('已经是尾页')
                this.loading=false;
                return 0
              }else{
                this.currentPage++
              }
         }else{
           
         }
          
      },// f end

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.footer{
  display: flex;
  margin-top: 1rem;
  justify-content: space-around;
}
.rotate{
  animation: refresh 1s infinite linear;
}
@keyframes refresh {
  0%{
    transform: rotate(0deg)
  }
   100%{
    transform: rotate(-360deg)
  }
}
</style>
