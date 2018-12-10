
<template>
    <el-col :span='24' class="config-main">
        <el-col  >
            <div class="tra-btn">
              <template>
                 <div class="end-date" style="display:inline-block;margin-left:10px;" >
                      <el-input v-model="input" placeholder="请输入账号或订单号" clearable @keyup.native.enter="queryAccount()"></el-input>  
                 </div>
              </template>
                <div class="start-date" style="display:inline-block" >
                    <Date choice='起始日期：' @message='getStartDate'></Date>
                </div>
               <div class="end-date" style="display:inline-block" >
                    <Date choice='终止日期：' @message='getEndDate'></Date>
               </div>

               <div class="search"  style="display:inline-block" >
                            <i  class="el-icon-search" @click="queryAccount"></i>
                </div>
                <el-button class="table-p hidden-md-and-down" style="color:snow" type="primary" v-if="transfer_type">{{transfer_type==1? '收款记录表':'转出记录表'}}</el-button>                
            </div>
        </el-col>
        
        <el-table
        :show-summary="true"
        border
        v-loading="loading2"
        highlight-current-row
        :summary-method="getSummaries"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        >

        <el-table-column
        label="收款账号" 
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        
        <el-table-column
        label="订单号" 
        show-overflow-tooltip
        
        >
        <template slot-scope="scope">{{ scope.row.order_no}}</template>
        </el-table-column>

        <el-table-column
        label="交易号"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{ scope.row.trade_no}}</template>

        </el-table-column>

       <el-table-column
        label="支付渠道"
        width="100"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{scope.row.trade_channel}}</template>
        </el-table-column>

          <el-table-column
            prop="amount"
            width="100"
            label="金额（元）" >
             <template slot-scope="scope">
              <span style="color:green" v-if="scope.row.trade_status=='TRADE_SUCCESS'"> {{scope.row.amount}}</span>
              <span style="color:red" v-else> {{scope.row.amount}}</span>
              </template>
          </el-table-column>
     
     <el-table-column
        label="平台手续费"
        width="100"
        prop="pay_fee"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{scope.row.pay_fee}}</template>
        </el-table-column>

        <el-table-column
        label="服务商手续费"
        width="120"
        prop="service_fee"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{scope.row.service_fee }}</template>
        </el-table-column>

          <el-table-column
            prop="receipt_amount"
            width="120"
            label="到账金额（元）">
         <template slot-scope="scope">
           <span style="color:green" v-if="scope.row.trade_status=='TRADE_SUCCESS'"> {{scope.row.receipt_amount}}</span>
           <span style="color:red" v-else> {{scope.row.receipt_amount}}</span>
           </template>
        </el-table-column>

         <el-table-column
        label="付款账号"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{ scope.row.buyer_logon_id}}</template>

        </el-table-column>

         <el-table-column
        label="状态"
            width="100"

        show-overflow-tooltip  >
         <template slot-scope="scope">{{ scope.row.trade_status=='WAIT_BUYER_PAY'? '待支付':scope.row.trade_status=='TRADE_SUCCESS'? '支付成功':'交易超时'}}</template>
        </el-table-column>

        <el-table-column
        label="交易时间" 
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ formdataTime(scope.row.create_time)}}</template>
        </el-table-column>

         <el-table-column
        label="收款时间"
        show-overflow-tooltip
        
         >
        <template slot-scope="scope">{{ formdataTime(scope.row.send_pay_date)}}</template>
        </el-table-column>
        </el-table>

      
          <el-pagination
          background
          layout="prev, pager, next"
          :total='total'
          :current-page.sync="page" @current-change="turnPage()">
        </el-pagination>
       <!-- 分页 -->
    </el-col>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

import Date from './components/Date'



export default {
        data (){
        return {
          loading2:false,
          page:1,
          transfer_type:1,// 记录类型
          total:10,// 总记录条数
          input:'',
          startDate:'',
          endDate:'',
          tableData3: [],
      }           
        
    },//data end

    mounted(){
          this.getTable();
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sendPage(page){
          this.getTable(this.input,page);
      },
      getTable(){
              let  queryStr=`/api/transfer/record/merchant?${this.$route.query.query? 'account':'client_id'}=${this.$route.query.query? this.$route.query.query:this.$route.query.client_id }`
               axios.get(queryStr,).then((res)=>{
                    let tem=res.data.msg.records;
                      this.loading2=false;
                    if(res.data.code==10000){
                      for(let i=0;i<tem.length;i++){
                          tem[i].transfer_time=moment(tem[i].transfer_time).utc().zone(-0).format('YYYY-MM-DD HH:mm:ss')
                      }
                      this.total=res.data.msg.total;
                      this.tableData3=[];
                      this.tableData3=tem;
                      this.loading2=false;
                    }else{
                      this.$message({
                        message:res.data.msg,
                        type:'warning'
                      })
                    }
               })
               .catch((err)=>{
                    console.log(err)
               });
    },//get table data
    turnPage(){
          let sendData=new URLSearchParams() 
          this.input? sendData.append('account',this.input):""
          this.$route.query.client_id? sendData.append('client_id',this.$route.query.client_id):""
          this.pageSize? sendData.append('page_size',this.pageSize):sendData.append('page_size','')
          this.page? sendData.append('page_num',this.page):sendData.append('page_num','')
            let url=`/api/transfer/record/merchant?${sendData}`
            axios.get(url).then((res)=>{
                    let tem=res.data.msg.records;
                        this.loading2=false;
                    if(res.data.code==10000){
                      for(let i=0;i<tem.length;i++){
                          tem[i].transfer_time=moment(tem[i].transfer_time).utc().zone(-0).format('YYYY-MM-DD HH:mm:ss')
                      }
                      this.total=res.data.msg.total;
                      this.tableData3=[];
                      this.tableData3=tem;
                    }else{
                      this.$message({
                        message:res.data.msg,
                        type:'warning'
                      })
                    }
               })
               .catch((err)=>{
                    console.log(err)
               });
    },
      queryAccount(){
        this.turnPage()
      },
      getStartDate(param){
         this.startDate=param.msg
      },
       getEndDate(param){
         this.endDate=param.msg
        //  alert(this.endDate)
      },//get date end
         getSummaries(obj){
        // console.log(obj,'obj')
        let {columns,data} = obj,
            sums=[],
            dataAmount=0,
            dataPayFee=0,
            dataServiceFee=0,
            dataReceiptAmount=0
        let values=data.map((item,index)=>{
                  if(item.trade_status=="TRADE_SUCCESS"){
                    dataAmount+=parseFloat(item.amount)
                    dataPayFee+=parseFloat(item.pay_fee)
                    dataServiceFee+=parseFloat(item.service_fee)
                    dataReceiptAmount+=parseFloat(item.receipt_amount)
                    return item.amount
                  }
              });
          columns.forEach((item,index)=>{
              if(index===0){
                sums[index]='成功总计：'
                return
              }
              if(item.property=='amount'){
                sums[index]=dataAmount.toFixed(2)
              }
              if(item.property=='receipt_amount'){
                sums[index]=dataReceiptAmount.toFixed(2)
              }
              if(item.property=='pay_fee'){
                sums[index]=dataPayFee.toFixed(2)
              }
              if(item.property=='service_fee'){
                sums[index]=dataServiceFee.toFixed(2)
              }
          })
          return sums
      }, 
    formdataTime(time){
       let tem=''
       time? tem=moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss'):tem='待确定'
      return tem
    }
    },//methods end 
    getParam(){
    },
    components:{
      Date,
    }
  };

    // getTime('Wed, 25 Apr 2018 18:46:16 GMT')
</script>

<style>
.tra-btn{
    width: 100%;
    background:rgb(84, 92, 100);
    border-radius: 4px;
    margin-bottom: 5px;
}
.tra-btn button{
    float: right;
    margin: 18px;
}
.tra-btn .start-date{
      padding: 20px;
      
}
.tra-btn::before{
    content: '';
    display: block;    
    clear: both;
}
.tra-btn::after{
    content: '';
    display:block;
    clear: both;
}
.search i{
  /* margin-top: 10px; */
  background: rgb(19, 109, 211);
  color: snow;
  padding: 13px;;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 8px;
}
.search i:hover{
  opacity: .7;
}
.table-p{
  margin: 10px;
  padding-bottom: none;
  
  /* border-right: black .5px solid; */
}
@media (max-width: 1500px) {
  .table-p{
    /* display: none; */
    margin: 0;
    /* padding: .3rem; */
    position: absolute;
    right: 0%;
  }
}
</style>



// WEBPACK FOOTER //
// src/Transfer.vue