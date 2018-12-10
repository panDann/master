
<template>

    <div class="acc-out">
    <el-col :span='24' class="config-main">
        <el-col>
            <div class="acc-btn">
            <span class="out-span" style="color:snow;"><i style="cursor:pointer" @click="backRouter">《 返回</i><strong style="margin-left:2rem;color:yellow">配置</strong> 账号</span>
            <el-select v-model="clientListID" clearable placeholder="勾选后选择客户" style="" class="option" @change="sendAccount(clientListID)" v-show="multipleSelection.length">
                            <el-option
                            v-for="item in clientList"
                            :key="item[1]"
                            :label="item[1]"
                            :value="item[0]">
                            </el-option>
            </el-select>
         
            </div>
        </el-col>
        <el-table
        v-loading="loading2"
        border
        type="index"
        highlight-current-row        
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        max-height='700'
        style="width: 100%"
        @selection-change="handleSelectionChange">
       <el-table-column
          type="selection"
          width="55">
          </el-table-column>
        <!-- <el-table-column
          prop="uid"
          label="商户ID"
          width="100">
          </el-table-column> -->
          <el-table-column
          label="姓名"
          width="">
          <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
         
    
         <el-table-column
          label="身份证号"
          width="">
          <template slot-scope="scope">{{ scope.row.idcard }}</template>
          </el-table-column>

         <el-table-column
          label="账号数量"
          width="">
          <template slot-scope="scope">{{ scope.row.count }}</template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total='total'
          style="margin-top:.6rem;"
          :current-page.sync="currentPage" @current-change="turnPage">
        </el-pagination>
         <!-- 模态框 修改 -->
           

    </el-col>
      <!-- <Dialog :intelligent.sync="intelligent"></Dialog> -->

   </div> 
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import moment,{ duration } from 'moment'
// import Dialog from './components/Dialog.vue'

export default {
        data (){
        return {
          loading2:false,//控制加载延迟
          tableData3: [],//表格数据
          accountTypeData:[],// 账号类型数据
          multipleSelection: [],// 批量删除
          dialogModifyVisible:false,//修改框控制显示
          formLabelWidth: '150px',//模态框的宽度      
          commodities:[],//商品总数
          clientList:[],// 主机
          clientListID:'',
           
          keyDialog:false,
          total:1,// page number
          currentPage:1,
          pageSize:10,
          intelligent:1,
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
      backRouter(){
          this.$router.back()
      },
      getTable(){
              this.loading2=true;
               let url='/api/transfer/allot'
               axios.get(url,).then((res)=>{
                    let tem=res.data;
                    this.loading2=false;
                    if(res.data.code==10000){   
                      this.tableData3=tem.msg.accounts;
                       this.clientList=tem.msg.client_list;
                      // console.log(this.accountTypeData)
                    }else{
                      this.$message({
                        message:tem.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                   this.$message({
                        message:'系统故障',
                        type:'warning'
                      });
               });
    },//get table data
    turnPage(){
               this.loading2=true;
               axios.get(`/api/transfer/account/merchant&page=${this.currentPage}&page_size=${this.pageSize}`,).then((res)=>{
                 let tem=res.data.msg.accounts;
                    this.commodities=res.data.msg.commodities;
                    if(res.data.code==10000){   
                      this.tableData3=tem;
                       this.loading2=false;
                      // console.log(tem)
                    }else{
                      this.$message({
                        message:res.data.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                   this.$message({
                        message:'系统故障',
                        type:'warning'
                      });
               });
    },
 
    sendAccount(userid){
          let len=this.multipleSelection.length,
              url='/api/transfer/allot',
              sendData=new FormData()
          let sendArr=[];
                for(let i=0;i<len;i++){
                  sendArr.push(this.multipleSelection[i].idcard)
                }
          let comf=confirm('确定要添加么？')
              if(!comf)return;
              sendData.append('idcards',sendArr)
              sendData.append('client_id',userid)
              axios.post(url,sendData)
                   .then(res=>{
                     let tem=res.data
                     if(tem.code=10000){
                          this.$message({
                              message:'分配成功',
                              type:'success'
                          });
                     }else{
                          this.$message({
                                message:res.data.msg,
                                type:'error'
                              });
                     }
                   })
                   .catch(err=>{
                           this.$message({
                              message:'系统故障',
                              type:'error'
                              });
                   })
    },
      isChecked(id,is){
        let tem;
        if(is){
          tem=1;
        }else{
          tem=0;
        }
        axios.put(`/api/transfer/account/merchant/checked?id=${id}&checked=${tem}`,)
            .then((res)=>{
              if(res==10000){
                  console.log(res.data)
              }
            })
    },//isChecked end 

    formdataTime(time){
      return moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss')
    },
    publicShow(text){//   处理公钥
     this.keyDialog=true;
     this.dialogMsg=text.replace(/\n/ig,'<br>');
    }
    },//methods end
    
    filters:{
      keyEnter(value){
      }
    },
    components:{
      // Dialog,
    },
  }
  

</script>

<style >
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
.qrcode-img{
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
#img-url{
  border-radius: 4px;
  border: skyblue .5 solid;
}
.item{
  margin-top: 10px;
  padding: -20px;
}
.private-img{
  width: 1.5rem;
  height: 1.5rem;
}

</style>

// WEBPACK FOOTER //
// src/AccountIn.vue