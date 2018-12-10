
<template>
    <div class="acc-out">
    <el-col :span='24' class="config-main">
        <el-col>
            <div class="acc-btn">
                  <span class="out-span" style="color:snow;"><span style="color:yellow;font-size:inherit">任务</span>配置列表</span>
                  <el-button type='danger' @click="deleteItems">
                      删除选中项
                  </el-button>
                  <el-button type='primary' @click="dialogFormVisible = true">
                      添加账号
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
            @selection-change="handleSelectionChange">

              <el-table-column
              type="selection"
              width="55">
              </el-table-column>
              <el-table-column
              label="账号"
              width="">
              <template slot-scope="scope">{{ scope.row.account }}</template>
              </el-table-column>
             
              <el-table-column
              label="商户ID"
              width="">
              <template slot-scope="scope">
                {{scope.row.uid}}
              </template>
              </el-table-column>

             <el-table-column
              prop="account_type"
              label="账号类型"
              width="">
              </el-table-column>

             <el-table-column
              prop="name"
              label="姓名"
              width="">
              </el-table-column>

              <el-table-column
              label="创建时间"
              width="300">
              <template slot-scope="scope">
                {{formdataTime(scope.row.create_time)}}
              </template>
              </el-table-column>
              <el-table-column
              label="操作"
              width="">
              <template slot-scope="scope">
                <el-badge  class="item">
                    <el-button   @click="modifyItem(scope.row)" size="small" >修改</el-button>    
                </el-badge>
              </template>
              </el-table-column>
        </el-table>
         <!-- 模态框 -->
                <el-dialog title="修改 转出 账号" :visible.sync="dialogModifyVisible" width="30%" :modal-append-to-body='false'>
                      <el-form :model="form">
                        
                        <el-form-item label="账号类型：" :label-width="200">  
                          <el-select v-model="modify.account_type" placeholder="请选择账号类型">
                            <el-option label="支付宝" value="支付宝"></el-option>
                            <el-option label="微信" value="微信"></el-option>
                            <el-option label="QQ" value="QQ"></el-option>    
                            <el-option label="银行卡" value="银行卡"></el-option>    
                          </el-select>
                        </el-form-item>

                        <el-form-item label="账号：" :label-width="formLabelWidth">
                          <el-input v-model="modify.account" auto-complete="off" ></el-input>
                        </el-form-item>
                        <transition name="el-zoom-in-top">
                        <el-form-item label="姓名：" :label-width="formLabelWidth" v-if="(modify.account_type=='银行卡')">
                          <el-input v-model="modify.name" auto-complete="off" placeholder="请输入银行卡绑定的姓名"></el-input>
                        </el-form-item>
                       </transition>
                      </el-form>
                      <div slot="footer" >
                        <el-button @click="dialogModifyVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sendModifyMsg">确 定 修 改</el-button>
                      </div>
                    </el-dialog> 
                <!-- 模态框 -->
                 <el-dialog title="添加 配置 任务" :visible.sync="dialogFormVisible" width="35%" :modal-append-to-body='false'>
                  <el-form :model="form">
                    <el-form-item label="商家账号：" :label-width="formLabelWidth">
                        <el-select v-model="form.account" placeholder="请选择商家类型">
                            <el-option :label="v" :value="v" v-for="v in merchantData" :key="v"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="转出账号：" :label-width="formLabelWidth">
                        <el-select v-model="form.transfer_account" placeholder="请选择转出账号">
                            <el-option :label="v" :value="v" v-for="v in transferData" :key="v"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="选择任务类型：" :label-width="formLabelWidth">
                      <el-select v-model="form.task_type" placeholder="请选择任务类型">
                        <el-option label="定时任务" value="cron"></el-option>
                        <el-option label="单性任务" value="date"></el-option>   
                      </el-select>
                    </el-form-item>

                        <el-form-item label="任务时间：" :label-width="formLabelWidth" v-if="(form.task_type)">
                            
                            <el-time-select
                            v-model="form.task_trigger"
                            :picker-options="{
                                start: '00:00',
                                step: '00:15',
                                end: '23:59'
                            }"
                            placeholder="选择时间"
                            clearable
                            >
                            </el-time-select>

                            <el-select v-model="week_task" placeholder="定制周任务时选择" clearable>
                                <el-option label="周日" value="0" ></el-option>
                                <el-option label="周一" value="1" ></el-option>
                                <el-option label="周二" value="2" ></el-option>
                                <el-option label="周三" value="3" ></el-option>
                                <el-option label="周四" value="4" ></el-option>
                                <el-option label="周五" value="5" ></el-option>
                                <el-option label="周六" value="6" ></el-option>
                            </el-select>
                        </el-form-item>
                       
                       <el-form-item label="优先级：" :label-width="formLabelWidth">
                          <el-input v-model="form.priority" auto-complete="off" placeholder="请输入任务优先级"></el-input>
                       </el-form-item>

                  </el-form>
                    <div slot="footer" >
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sendAddMsg">确 定</el-button>
                    </div>
                </el-dialog>  
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
          merchantData:[],//商家数组
          transferData:[],// 转出账号数组
          money:'',
          multipleSelection: [],// 批量删除
          dialogFormVisible: false,//模态框
          dialogModifyVisible:false,//修改框控制显示
          formLabelWidth: '150px',//模态框label的宽度      
          week_task:'',//商品总数

          form: {//模态框数据
          account: '',
          task_type:'cron',
          transfer_type:'',
          task_trigger:'',
          priority:'',
        },
         modify: {//模态框数据
          id:'',
          account: '',
          task_type:'cron',
          transfer_type:'',
          task_trigger:'',
          priority:'',
        },
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
      getTable(){
              this.loading2=true;
               axios.get('/api/transfer/task',).then((res)=>{
                 this.loading2=false;   
                 let tem=res.data.msg;
                    if(res.data.code==10000){   
                       this.tableData3=tem.task_list;
                       this.merchantData=tem.merchant_account_list;
                       this.transferData=tem.transfer_account_list;
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
      isChecked(id,is){
        let tem;
        //  alert(is);
        // return
        if(is){
          tem=1;
        }else{
          tem=0;
        }
        axios.put(`/api/transfer/task/checked?id=${id}&checked=${tem}`,)
            .then((res)=>{
               if(res.data.code==10000){
                       this.$message({
                        message:res.data.msg,
                        type:'success'
                        });
                        this.getTable();
                    }else{
                       this.$message({
                        message:res.data.msg,
                         type:'warning'
                        })
                    }
            })
    },//isChecked end 
     sendAddMsg(){
        this.form.account=this.form.account.replace(/[\s]/g,'')
        this.dialogFormVisible=false;
        let sendStr=Qs.stringify(this.form);
        let sendArr=[];
        axios.post('/api/transfer/task',sendStr).then((res)=>{
            if(res){
               if(res.data.code==10000){
                       this.$message({
                        message:res.data.msg,
                        type:'success'
                        });
                        this.getTable();
                    }else{
                       this.$message({
                        message:res.data.msg,
                         type:'warning'
                        })
                    }
            }
        });
        
     },//添加条目
      deleteItems(){
          let len=this.multipleSelection.length;
          if(!len){
              this.$message({
                message:'勾选项为空',
                type:'warning'
              })
              return;
          }else{
             let sendArr=[];
                for(let i=0;i<len;i++){
                  sendArr.push(this.multipleSelection[i].id)
                }
            let comf=confirm('确定要删除么？')
            if(comf){
                   axios.delete(`/api/transfer/task?id=${sendArr}`,)
                 .then((res)=>{
                    if(res.data.code==10000){
                       this.$message({
                        message:res.data.msg,
                        type:'success'
                        });
                        this.getTable();
                    }else{
                       this.$message({
                        message:res.data.msg,
                         type:'warning'
                        })
                    }
                 });
            }else{
              return;
            }
           
          }
          console.log(this.multipleSelection)
      },
     modifyItem(scope){
       this.dialogModifyVisible=true;
       this.modify.account=scope.account;
       this.modify.id=scope.id;
       this.modify.account_type=scope.account_type;  
       this.modify.name=scope.name;       
     },//显示修改框
     addSpace(obj){
       if(obj.account_type=='银行卡'){
             this.form.account=obj.account.replace(/[\s]/g,'').replace(/(\d{4})(?=\d)/g,"$1 ")
             console.log(this.form.account)
       }
     },
      sendModifyMsg(){
          let sendStr=Qs.stringify(this.modify);
          axios.put(`/api/transfer/task?${sendStr}`,).then((res)=>{
              if(res){
                if(res.data.code==10000)
                  this.dialogModifyVisible=false;
                       this.$message({
                        message:res.data.msg,
                        type:'success'
                        });
                        this.getTable()
                    }else{
                       this.$message({
                        message:res.data.msg,
                         type:'warning'
                        })
                    }          
                  console.log(res.data)
          });
      },//提交修改信息 end

    formdataTime(time){// 时间格式化
      return moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss')
    },
      transferParam(scope){ 
          this.$router.push({path:`/transfer_out?query=${scope.account.replace(/\s/g,'')}`,
                            params:{
                              name:'query',
                              dataObj:scope.account
                            }
            })
    },
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