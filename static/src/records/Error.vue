
<template>
    <el-col :span='24' class="config-main">
        <!-- <el-col  >
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
      </el-col> -->
    <el-table
        border
        v-loading="loading2"
        highlight-current-row
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark">

        <el-table-column
        label="序号"
        width='50'
        show-overflow-tooltip  >
         <template slot-scope="scope">{{ scope.$index+1}}</template>
        </el-table-column>

        <el-table-column
        label="账号"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{ scope.row.account}}</template>
        </el-table-column>
        
        <el-table-column
        label="订单号"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{ scope.row.order_no}}</template>
        </el-table-column>
        <el-table-column
        label="原因"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{ scope.row.reason}}</template>
        </el-table-column>
          <el-table-column
        label="创建时间"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{ formdataTime(scope.row.create_time)}}</template>
        </el-table-column>
          <el-table-column
        label="操作者"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{ scope.row.operator}}</template>
        </el-table-column>
          <el-table-column
        label="解决时间"
        show-overflow-tooltip  >
        <template slot-scope="scope">{{ scope.row.update_time}}</template>
        </el-table-column>
          <el-table-column
        label="状态"
        show-overflow-tooltip  >
        <template slot-scope="scope">
          <span style="color:green" v-if="scope.row.status"> 已处理</span>
          <span style="color:red" v-else> 异常</span>
        </template>
        </el-table-column>
          <el-table-column
        label="操作"
        show-overflow-tooltip  >
        <template slot-scope="scope">
                          <el-button    @click="markHandle(scope.row)" size="small"  :type="{'success':scope.row.status}">{{!scope.row.status? '开始处理':'已处理'}}</el-button>               
        </template>
        </el-table-column>
        </el-table>
          <el-pagination
          background
          layout="prev, pager, next"
          :total='total'
          :current-page.sync="page" @current-change="turnPage">
        </el-pagination>

              <el-dialog title="异常处理" :visible.sync="dialogFormVisible" width="50%" :modal-append-to-body='false'>
                  <el-form :model="form">
                        <div style="width:45%;display:inline-block;border-right:2px solid #409EFF" v-show="(typeof form.info!='undefined')">
                              <div v-for="item in form.info" :key="item[0]">
                                    <p style="">{{item[0]}}：</p>
                                    <p style="text-indent:2rem;color:#409EFF;font-size:1rem;">{{item[1]}}</p>
                              </div>
                        </div>
                        <div style="width:50%;display:inline-block;" >
                              <div v-for="item in form.input" :key="item[0]" v-show="(typeof form.input!='undefined')">
                                 <el-form-item :label="item[1]+'：'" label-width="100px" >
                                    <el-input v-model="formMirror[item[0]]" auto-complete="off" autofocus='true'  ></el-input>
                                  </el-form-item>
                              </div>
                              <div v-for="item in form.choice" :key="item[0]" v-show="(typeof form.choice!='undefined')">
                                  <el-form-item :label="item[1]+'：'" :label-width="formLabelWidth">
                                    <el-select v-model="formMirror[item[0]]" :placeholder="'请选择'+item[1]" >
                                      <el-option :label="v" :value="v" v-for="v in item[2]" :key="v"></el-option>
                                    </el-select>
                                  </el-form-item>
                              </div>
                        </div>
                         <p v-show="(typeof form.choice=='undefined'&&typeof form.choice=='undefined')">检测账号故障后提交本页面，清除本条异常记录</p>
                  </el-form>
                  <div slot="footer" >
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sendAddMsg">确 定</el-button>
                  </div>
                </el-dialog>  
       <!-- 分页 -->
    </el-col>
</template>
<script>
import axios from 'axios'
// import Vue from 'Vue'
import moment from 'moment'
import Date from '../components/Date'
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
          formLabelWidth:"100px",
          dialogFormVisible:false,
          endDate:'',

          tableData: [],
          form:{},
          formMirror:{
            id:'',
            // state:''
          },
      }           
    },//data end
    mounted(){
        let routeQuery=this.$route.query;
        if(routeQuery){
          this.input=routeQuery.query;
          this.transfer_type=routeQuery.transfer_type;
          this.getTable(routeQuery);
          this.$route.query.query='';
        } 
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
              let queryStr=`/api/exception`
               axios.get(queryStr,).then((res)=>{
                    let tem=res.data.msg.records;
                        this.loading2=false;
                    if(res.data.code==10000){
                      this.total=res.data.msg.total;
                      this.tableData=tem;
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
      let url=`/api/exception?page_size=${this.pageSize}&page_num=${this.page}`
            axios.get(url,sendData).then((res)=>{
                    let tem=res.data.msg.records;
                        this.loading2=false;
                    if(res.data.code==10000){
                    
                      this.total=res.data.msg.total;
                      this.tableData=[];
                      this.tableData=tem;
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
    
    markHandle(obj){
        this.dialogFormVisible=true
        let url=`/api/exception/handler?id=${obj.id}`
            this.formMirror.id=obj.id;
            axios.get(url,).then((res)=>{
                let tem=res.data.msg,
                    self=this;
                if(res.data.code==10000){
                    typeof tem.choice!=='undefined'? this.createMirrorProperties(tem.choice):''
                    typeof tem.input!=='undefined'? this.createMirrorProperties(tem.input):''
                    self.form=tem
                }else{
                  this.$message({
                    message:res.data.msg,
                    type:'warning'})
                }
            })
            .catch((err)=>{
                this.$message({
                    message:'系统故障',
                    type:'warning'
                  })
            });
    },
    createMirrorProperties(objProperty){
           
           for(let i=0,l=objProperty.length;i<l;i++){
               let o={}
               if(typeof this.formMirror[objProperty[i][0]]=='undefined'){
                   this.formMirror=Object.assign({},this.formMirror,o[objProperty[i][0]]='')
               }
           } 
           console.log(this.formMirror,'mirror')
    },
    sendAddMsg(){
        this.dialogFormVisible=true
        let url=`/api/exception/handler`,
            sendData=this.formdataSendData(this.formMirror)
            axios.post(url,sendData).then((res)=>{
                this.dialogFormVisible=false
                if(res.data.code==10000){
                    this.$message({
                      message:'处理成功',
                      type:'success'})
                    this.getTable()
                }else{
                  this.$message({
                    message:res.data.msg,
                    type:'warning'
                  })
                }
            })
            .catch((err)=>{
                this.$message({
                    message:'系统故障',
                    type:'warning'
                  })
            });
    },
    formdataSendData(obj){
        let s=new FormData()
        for(let v in obj){
          // if(!obj[v])continue
           s.append(`${v}`,obj[v])
        }
        return s;
    },
    formdataTime(time){
       let tem=''
       time? tem=moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss'):tem='待确定'
      return tem
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