<template>
  <div id="record" style="text-align:center;margin:0 auto;width:100%;overflow:auto;">
       <Row style="margin-bottom:.5rem;">
        <Col span="8">
           订单号： <Input v-model="form.order_no" placeholder="订单号" clearable style="width: 200px" />
        </Col>
        <Col span="8">
           输入起止日期： <DatePicker type="daterange" @on-change="getDate" placement="bottom-end" placeholder="日期" style="width: 200px"></DatePicker>
        </Col>
        <Col span="4">
        <Button type="primary" @click="searchNote">查 询</Button>
        <!-- <Button type="primary" ghost @click="resetForm">重 置</Button> -->
        </Col>
      </Row>
      <Table border :columns="columns5" :data="tableData" ></Table>
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
                        title: '交易号',
                        key: 'trade_no',
                    },
                    {
                        title: '订单金额',
                        key: 'amount',
                        sortable: true,
                         render:(h,params)=>{
                            return h('span',{
                                stlye:{
                                    color:'green'
                                }
                            },params.row.amount) 
                        }
                    },
                     {
                        title: '实际到账金额',
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
                        title: '平台手续费',
                        key: 'pay_fee',
                       
                    },
                    {
                        title: '服务手续费',
                        key: 'service_fee',
                        // sortable: true,
                      
                    },
                     {
                        title: '创建时间',
                        key: 'create_time',
                        render:(h,params)=>{
                            return h('span',this.formdataTime(params.row.create_time)) 
                        }
                    },
                     {
                        title: '支付状态',
                        key: 'trade_status',
                        render:(h,params)=>{
                            return h('span',params.row.trade_status=='WAIT_BUYER_PAY'? '待支付':params.row.trade_status=='TRADE_SUCCESS'? '支付成功':'交易超时') 
                        }
                    }
                ],
                tableData: [],
     form:{
        order_no:'',
        start_date:"",
        end_date:"",
     },
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
          let sendStr=`/api/transfer/record/client_merchant?page_size=${this.pageSize}`;
          Axios.get(sendStr,)
          .then((res)=>{
              this.loading=false;
              if(res.data.code==10000){
                this.tableData=res.data.msg.records
                this.page=res.data.msg.total
                // this.checkPageButton()
              }else{
                  this.$Message.error(res.data.msg)
              }
          })
          .catch((err)=>{
                  this.$Message.error('系统故障')
          })
      },
      searchNote(){
               let sendData=this.formdataData(this.form)
               let sendStr=`/api/transfer/record/client_merchant?page_size=${this.pageSize}&${sendData}`;
               Axios.get(sendStr,)
                    .then((res)=>{
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
      getDate(sta,end){
        [this.form.start_date,this.form.end_date]=sta
      },
      resetForm(){
            this.form.date=''
            this.form.start_date=''
            this.form.end_date=''
            this.getTable()
      },
      formdataData(){
        let data=new URLSearchParams();
        for(let v in this.form){
            this.form[v]? data.append(`${v}`,this.form[v]):''
        }
        return data
      },
        handleTableData(obj){
                for(let v in obj){

                }
        },
   
        formdataTime(time){
        let tem=''
        time? tem=moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss'):tem='待确定'
        return tem
        },
         turnPage(index){
               this.loading=true;
               let sendData=this.formdataData(this.form)
               let sendStr=`/api/transfer/record/client_merchant?page_num=${this.currentPage}&page_size=${this.pageSize}&${sendData}`;
               Axios.get(sendStr,)
                    .then((res)=>{
                        if(res.data.code==10000){
                          this.loading=false;
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
