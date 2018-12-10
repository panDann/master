
<template>
    <el-col :span='24' class="config-main">
        <el-col  >
            <div class="tra-btn">
              <template>
                 <div class="end-date" style="display:inline-block;margin-left:10px;" >
                      <el-input v-model="input" placeholder="请输入账号" clearable></el-input>  
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
                <el-button class="table-p hidden-md-and-down" style="color:snow" type="primary"  v-if="transfer_type">{{transfer_type==1? '收款记录表':'转出记录表'}}</el-button>                
            </div>
           
      </el-col>
        
      

    <el-table
        :show-summary="true"
        border
        v-loading="loading2"
        highlight-current-row
        element-loading-text="拼命加载中"
        :summary-method="getSummaries"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        >

        <el-table-column
        label="商家账号" 
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ scope.row.merchant_account }}</template>
        </el-table-column>
        
        <!-- <el-table-column
        label="转出账号" 
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ scope.row.transfer_account}}</template>
        </el-table-column> -->

        <el-table-column
        label="订单号"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{ scope.row.order_no}}</template>
        </el-table-column>

       <el-table-column
        prop="account_type"
        label="账号类型"
            width="100"

        show-overflow-tooltip  >
        </el-table-column>

        <el-table-column
            prop="amount"
            width="100"
          label="金额（元）"
         >
         <template slot-scope="scope">
           <span style="color:green" v-if="scope.row.status=='SUCCESS'"> {{scope.row.amount}}</span>
           <span style="color:red" v-else> {{scope.row.amount}}</span>
           </template>
        </el-table-column>


         <el-table-column
            prop="receipt_amount"
            width="120"
            label="客户到账">
         <template slot-scope="scope">
           <span style="color:green" v-if="scope.row.status=='SUCCESS'"> {{scope.row.receipt_amount}}</span>
           <span style="color:red" v-else> {{scope.row.receipt_amount}}</span>
           </template>
        </el-table-column>

   <el-table-column
        label="原因" 
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ scope.row.reason}}</template>
        </el-table-column>

         <el-table-column
        label="备注"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{ scope.row.remark}}</template>
        </el-table-column>

        
         <el-table-column
        label="状态"
            width="100"

        show-overflow-tooltip  >
         <template slot-scope="scope">{{ handleStatus(scope.row.status)}}</template>
        </el-table-column>

         <el-table-column
        label="交易时间" 
        show-overflow-tooltip
        
        >
        <template slot-scope="scope">{{ formdataTime(scope.row.create_time)}}</template>
        </el-table-column>

  
        </el-table>
          <el-pagination
          background
          layout="prev, pager, next"
          :total='total'
          :current-page.sync="page" @current-change="turnPage">
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
          transfer_type:'',// 记录类型
          pageSize:10,
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
      getTable(account){
              this.loading2=true;
              let temRoute=this.$route.query
              let queryStr=`/api/transfer/record/transfer?${temRoute.query? 'account':'client_id'}=${this.$route.query.query? this.$route.query.query:this.$route.query.client_id}&transfer_type=${this.$route.query.transfer_type}`
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
          this.$route.query.query? sendData.append('account',this.$route.query.query):""
          this.$route.query.client_id? sendData.append('client_id',this.$route.query.client_id):""
          this.$route.query.transfer_type? sendData.append('transfer_type',this.$route.query.transfer_type):""
          this.pageSize? sendData.append('page_size',this.pageSize):sendData.append('page_size','')
          this.page? sendData.append('page_num',this.page):sendData.append('page_num','')
        let url=`/api/transfer/record/transfer?${sendData}`
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
              // this.loading2=true;
              // let sendData=new URLSearchParams() 
              // this.input? sendData.append('account',this.input):sendData.append('account','')
              // this.$route.query.query? sendData.append('account',this.$route.query.query):""
              // this.$route.query.client_id? sendData.append('client_id',this.$route.query.client_id):""
              // this.transfer_type? sendData.append('transfer_type',this.transfer_type):sendData.append('transfer_type','')
              //  axios.get(queryStr,).then((res)=>{
              //       let tem=res.data.msg.records;
              //           this.loading2=false;
              //       if(res.data.code==10000){
              //         for(let i=0;i<tem.length;i++){
              //             tem[i].transfer_time=moment(tem[i].transfer_time).utc().zone(-0).format('YYYY-MM-DD HH:mm:ss')
              //         }
              //         this.total=res.data.msg.total;
              //         this.tableData3=[];
              //         this.tableData3=tem;
              //       }else{
              //         this.$message({
              //           message:res.data.msg,
              //           type:'warning'
              //         })
              //       }
              //  })
              //  .catch((err)=>{
              //       console.log(err)
              //  });
      },
      getSummaries(obj){
        // console.log(obj,'obj')
        let {columns,data} = obj,
            sums=[],
            dataAmount=0,
            dataReceiptAmount=0
        let values=data.map((item,index)=>{
                  if(item.status=="SUCCESS"){
                    dataAmount+=parseFloat(item.amount)
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
             
          })
          return sums
      }, 
      getStartDate(param){
         this.startDate=param.msg
      },
       getEndDate(param){
         this.endDate=param.msg
        //  alert(this.endDate)
      },//get date end 
    formdataTime(time){
       let tem=''
       time? tem=moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss'):tem='待确定'
      return tem
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
    },//methods end 
   
    components:{
      Date,
    }
  };

    // getTime('Wed, 25 Apr 2018 18:46:16 GMT')
</script>

<style scoped>

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