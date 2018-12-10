
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
            </div>
           
        </el-col>
        
        <el-table
        :show-summary="true"
        border
        highlight-current-row        
        v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        ref="multipleTable"
        max-height="700"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
        label="账号">
        <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>

          <el-table-column
          label="日期">
          <template slot-scope="scope">
            <div>{{scope.row.transfer_time }}</div>
          </template>
        </el-table-column>
        
        <el-table-column
        prop="sum"
        label="金额(元)"
        show-overflow-tooltip>
        </el-table-column>

         
        </el-table>

          <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total='total'
          :current-page.sync="page" @current-change="sendPage(page)">
        </el-pagination> -->
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
          input:'',
          startDate:'',
          endDate:'',
          tableData3: [],
      }           
        
    },//data end
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
               let queryStr='';
               if(!this.input){
                 this.$message({
                   message:'缺少查询条件',
                   type:'warning'
                 });
                 return
               } 
               queryStr=`/api/report?account=${account}&start_date=${this.startDate}&end_date=${this.endDate}`                      
               axios.get(queryStr,).then((res)=>{
                    let tem=res.data.msg;
                    console.log(res.data)
                    if(res.data.code==10000){
                      this.tableData3=tem;     
                      this.loading2=false;
                    }else{
                       this.$message({
                        message:res.data.msg,
                        type:'warning'
                    });
                    }
               })
               .catch((err)=>{

               });
    },//get table data
      queryAccount(){
          this.getTable(this.input);
      },
      getStartDate(param){
         this.startDate=param.msg
      },
       getEndDate(param){
         this.endDate=param.msg
      },//get date end 
   
    },//methods end 
    components:{
      Date,
    }
  };
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
</style>



// WEBPACK FOOTER //
// src/Statement.vue