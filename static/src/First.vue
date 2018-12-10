
<template>
    <div class="acc-out">
    <el-col :span='24' class="config-main">
        <el-col>
            <div class="acc-btn">
                  <span class="out-span" style="color:snow;"><span style="color:yellow;font-size:inherit">汇总</span> 账号列表</span>
                  <div style="display:inline-block">
                    <!-- <el-input v-model="searchAccountValue" clearable placeholder='按Enter键查询' class="option" @keyup.native.enter="searchMsg(searchAccountValue)"></el-input> -->
                        <el-date-picker
                            v-model="searchDate"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            >
                        </el-date-picker>
                           <el-button type='primary' style="margin:0;margin-left:.5rem;" @click="searchData">
                              查 询
                           </el-button>
                  </div> 
                  <el-button type='primary'>
                      收益：<strong style="font-size:1rem;">{{summary.income}}</strong> 元
                  </el-button>
                  <el-button type='primary'> 
                      平台费：<strong style="font-size:1rem;">{{summary.fee}}</strong> 元
                  </el-button>
                  
                
                   <el-button type='danger' >
                      交易流水：<strong style="font-size:1rem;">{{summary.detail}}</strong> 元
                  </el-button>
                  
                  
            </div>     
        </el-col>
        <el-table
            v-loading="loading2"
            element-loading-text="拼命加载中"
            highlight-current-row        
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            max-height='700'
            border
            style="width: 100%"
           >

     
            <el-table-column
              prop="username"
              label="客户名"
              show-overflow-tooltip
              width="">
              </el-table-column>

               <el-table-column
              prop="detail"
              label="流水"
              show-overflow-tooltip
              width="">
              </el-table-column>

               <el-table-column
              prop="income"
              label="收入"
              show-overflow-tooltip
              width="">
              </el-table-column>
               <el-table-column
              prop="fee"
              label="平台费"
              show-overflow-tooltip
              width="">
              </el-table-column>
        </el-table>
           <!-- <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :total='total'
              style="margin-top:.6rem;"
              :current-page.sync="currentPage" @current-change="turnPage">
            </el-pagination> -->
         <!-- 模态框 -->
    </el-col>
   </div> 
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import moment from 'moment'
export default {
        data (){
        return {
          loading2:false,//控制加载延迟
          tableData3: [],//表格数据
          money:'',
          searchDate:'',

          total:1,// page number
          currentPage:1,
          pageSize:10,

          summary: {
         
            }
      }           
        
    },//data end

    mounted(){
        this.getTable();
    },
    filters:{
     
    },
    methods: {
      getTable(){
              this.loading2=true;
               axios.get('/api/report',).then((res)=>{
                 this.loading2=false;   
                 let tem=res.data.msg;
                    if(res.data.code==10000){   
                      this.tableData3=tem.clients;
                      this.summary=tem.summary
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
    searchData(){
          this.loading2=true;
               console.log(this.searchDate)
               let url=`/api/report?start_date=${moment(this.searchDate[0]).zone(-8).format('YYYY-MM-DD')}&end_date=${moment(this.searchDate[1]).zone(-8).format('YYYY-MM-DD')}`
               axios.get(url,).then((res)=>{
                 this.loading2=false;   
                 let tem=res.data.msg;
                    if(res.data.code==10000){   
                      this.tableData3=tem.clients;
                      this.summary=tem.summary
                    }else{
                      this.$message({
                        message:res.data.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                    console.error(err)
               });
    }
    
    },//methods end 
  
    components:{
    }
  }
  

</script>

<style slot>
.acc-btn{
    width: 100%;
    background:rgb(84, 92, 100);
    height: 50px;
    border-radius: 4px;
    margin-bottom: 5px;
}
.acc-btn button{
    float: right;
    margin: 5px;
}
.acc-btn .out-span{
  display: inline-block;
  /* border: .5px solid; */
      /* margin-top: 15px; */
      padding: 14.5px;
      border-radius: 4px;
     background-color: #409EFF;
      border-right: .2px solid black;
}
.acc-btn::before{
    content: '';
    display: block;    
    clear: both;
}
.acc-btn::after{
    content: '';
    display:block;
    clear: both;
}
.item{
  margin-top: 10px;
  padding: -20px;
}
</style>



// WEBPACK FOOTER //
// src/AccountOut.vue