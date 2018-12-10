
<template>
    <div class="acc-out">
    <el-col :span='24' class="config-main">
        <el-col>
            <div class="acc-btn">
                  <span class="out-span" style="color:snow;"><span style="color:yellow;font-size:inherit">客户</span> 配置列表</span>
                    <!-- <el-tag type="danger">历史转出总金额：￥{{money}}</el-tag>  -->
                  <el-button type='danger' @click="deleteItems">
                      禁用选中项
                  </el-button>
                  <el-button type='primary' @click="dialogFormVisible = true">
                      添加用户
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
              label="客户名称"
              width="">
              <template slot-scope="scope"  >
                  <span v-show="!scope.row.modify" @click="modifyItem(scope.row)" style="color:#409EFF">{{ scope.row.username }}</span><span>{{'（UID：'+scope.row.id+'）'}}</span>
              </template>
              </el-table-column>

             
          <el-table-column
            prop="fee"
            label="手续费率"
            width="">
          </el-table-column>
              <el-table-column
              label="秘钥"
              width="">
              <template slot-scope="scope">
                {{scope.row.secret_key}}<img src="../assets/reset.png" title="重置秘钥" style="width:2rem;padding:.5rem;cursor:pointer"  @click="makeKey(scope)">
              </template>
              </el-table-column>

          <el-table-column
            prop=""
            label="提现方式"
            width="">
              <template slot-scope="scope">
                {{filterWithdrawMode(scope.row.withdraw_mode)}}
              </template>
          </el-table-column>
             <el-table-column
              label="余额"
              width="">
              <template slot-scope="scope">{{ scope.row.balance }}</template>
              </el-table-column>
             
             <el-table-column
              label="状态"
              width="100">
                 <template slot-scope="scope">
                  <el-button size='small'  type='success' v-if="scope.row.state" title="点击禁用" @click="transferState(scope.row)">启用</el-button>
                  <el-button size='small'  type='danger' v-else title="点击启用" @click="transferState(scope.row)">禁用</el-button>
                 </template>
              </el-table-column>
             <el-table-column
              label="路由"
              width="">
              <template slot-scope="scope">
                  <el-button   @click="openRouterDialog(scope.row)" size="small"  >配置路由</el-button>    
              </template>
              </el-table-column>
              <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                  <el-button   @click="transferIn(scope.row)" size="small"  >收款记录</el-button>    
                  <el-button   @click="transferOut(scope.row)" size="small"  >提现记录</el-button>    
              </template>
              </el-table-column>
        </el-table>
         <!-- 模态框 -->
                <el-dialog title="修改 用户" :visible.sync="dialogModifyVisible" width="30%" :modal-append-to-body='false'>
                      <el-form :model="form">
                          <el-form-item label="提现方式：" :label-width="formLabelWidth" >
                              <el-select v-model="modify.withdraw_mode" placeholder="请选择提现方式" >
                                <el-option :label="v[0]" :value="v[1]" v-for="v in withdrawModeList" :key="v[0]"></el-option>
                              </el-select>
                            </el-form-item>
                              <el-form-item label="登录密码：" :label-width="formLabelWidth">
                                 <el-input v-model="modify.password" auto-complete="off"  placeholder="不想修改密码请不要填"></el-input>
                              </el-form-item>
                              <el-form-item label="提现密码：" :label-width="formLabelWidth">
                                 <el-input v-model="modify.pay_password" auto-complete="off" placeholder="不想修改密码请不要填"></el-input>
                              </el-form-item>
                              <el-form-item label="手续费率：" :label-width="formLabelWidth">
                                 <el-input v-model="modify.fee" auto-complete="off" placeholder=""></el-input>
                              </el-form-item>
                              <el-form-item label="手续费率将修改为：" label-width="150px">
                                <span style="font-size:1.2rem;color:green;">{{modify.fee|filterFee}}</span> 
                              </el-form-item>
                      </el-form>
                      <div slot="footer" >
                        <el-button @click="dialogModifyVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sendModifyMsg(modify)">确 定 修 改</el-button>
                      </div>
                </el-dialog> 
                <!-- 模态框 添加-->
                 <el-dialog title="添加 用户" :visible.sync="dialogFormVisible" width="35%" :modal-append-to-body='false'>
                      <el-form :model="form">
                        
                      <div style="width:49%;display:inline-block">
                           <el-form-item label="提现方式：" :label-width="formLabelWidth" >
                              <el-select v-model="form.withdraw_mode" placeholder="请选择提现方式" >
                                <el-option :label="v[0]" :value="v[1]" v-for="v in withdrawModeList" :key="v[0]"></el-option>
                              </el-select>
                            </el-form-item>
                      </div>
                        <el-form-item label="用户名：" :label-width="formLabelWidth">
                          <el-input v-model="form.username" auto-complete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="登录密码：" :label-width="formLabelWidth">
                          <el-input v-model="form.password" auto-complete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="提现密码：" :label-width="formLabelWidth">
                          <el-input v-model="form.pay_password" auto-complete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="手续费率：" :label-width="formLabelWidth">
                                    <el-input v-model="form.fee" auto-complete="off" placeholder=""></el-input>
                        </el-form-item>
                          <el-form-item label="手续费率将设置为：" label-width="150px" v-show="form.fee">
                            <span style="font-size:1.2rem;color:green;">{{form.fee|filterFee}}</span> 
                          </el-form-item>
                      </el-form>
                      <div slot="footer" >
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sendAddMsg">确 定</el-button>
                      </div>
                 </el-dialog>  
                 <!-- 配置路由 -->
                 <el-dialog title="路由 列表" :visible.sync="dialogRouterVisible" width="50%" :modal-append-to-body='false'>
                               <RouterConfig :msg="routerClient" v-if="dialogRouterVisible"></RouterConfig>
                 </el-dialog>  
    </el-col>
   </div> 
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import moment from 'moment'
import RouterConfig from './clientRouterConfig'

export default {
        data (){
        return {
          loading2:false,//控制加载延迟
          tableData3: [],//表格数据
          money:'',
          multipleSelection: [],// 批量禁用
          dialogFormVisible: false,//模态框
          dialogModifyVisible:false,//修改框控制显示
          formLabelWidth: '120px',//模态框     
          withdrawModeList:[],

          form: {//模态框数据
          username:'',
          password:'',
          pay_password:'',
          fee:"",
          withdraw_mode:'',
         },
          modify: {//模态框数据
            id:'',
            password:'',
            pay_password:'',
            fee:"",
             withdraw_mode:'',
          },
          dialogRouterVisible:false,
          routerClient:'',
      }           
        
    },//data end

    mounted(){
        this.getTable();
    },
    components:{
       RouterConfig
    },
    filters:{
      filterFee(value){
            return parseFloat(value*100).toFixed(2)+'%'
      },
     
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
               axios.get('/api/user/client',).then((res)=>{
                 this.loading2=false;   
                 let tem=res.data;
                    if(res.data.code==10000){   
                       console.log(this.tableData3)
                      this.addModifyIndex(tem.msg)
                      this.withdrawModeList=tem.withdraw_mode_list
                      this.tableData3=tem.msg;
                    }else{
                      this.$message({
                        message:res.data.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                    this.$message({
                        message:'系统错误',
                        type:'warning'
                      });
               });
    },//get table data
      addModifyIndex(obj){
        for(let v=0,l=obj.length;v<l;v++){
            obj[v].modify=false
        }
      },
  
     makeKey(scope){
           let conf=confirm("确定要重新生成秘钥？")
               this.keyLoading=true;
           if(conf){
               axios.post('/api/user/secret_key?id='+scope.row.id+'',)
                    .then((res)=>{
                     this.keyLoading=false;
                 let tem=res.data.msg;
                    if(res.data.code==10000){
                         this.$message({
                        message:'重置成功',
                        type:'success'
                      });   
                        scope.row.secret_key=tem;
                        // this.getTable()
                    }else{
                      this.$message({
                        message:res.data.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                    this.$message({
                        message:err,
                        type:'warning'
                      });
               });
           }// if end
       },// makeKey end 
     sendAddMsg(){
        this.dialogFormVisible=false;
        let sendStr=Qs.stringify(this.form);
        axios.post('/api/user/client',sendStr).then((res)=>{
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
            let comf=confirm('确定要禁用么？')
            if(comf){
                   axios.delete(`/api/user/client?id=${sendArr}`,)
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
       this.modify.id=scope.id;
       this.modify.fee=scope.fee;
       this.modify.withdraw_mode=scope.withdraw_mode;
     },//显示修改框
     addSpace(obj){
       if(obj.account_type=='银行卡'){
             this.form.account=obj.account.replace(/[\s]/g,'').replace(/(\d{4})(?=\d)/g,"$1 ")
             console.log(this.form.account)
       }
     },
    sendModifyMsg(obj){
          let sendData=this.formdataData(this.modify)
            axios.put(`/api/user/client`,sendData)
                 .then((res)=>{
                        if(res.data.code==10000){
                            this.$message({
                                message:'修改成功',
                                type:'success'
                                });
                                this.dialogModifyVisible=false
                                this.getTable()
                            }else{
                            this.$message({
                                message:res.data.msg,
                                type:'warning'
                                })
                            }          
                        });
      },//提交修改信息 end

    formdataTime(time){// 时间格式化
      return moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss')
    },
     filterWithdrawMode(val){
        return this.withdrawModeList.filter(item=>{
               return item[1]==val
        })[0][0]
      },
    formdataData(obj){
        let s=new FormData()
        for(let v in obj){
            if(obj[v]){
              v=='fee'? s.append(`${v}`,parseFloat(obj[v]).toFixed(4)):s.append(`${v}`,obj[v])
            }else{
              continue
            }
        }
        return s;
    },
    transferOut(scope){ 
          this.$router.push({path:`/transfer_out?client_id=${scope.id}&transfer_type=1`,
                            params:{
                              name:'client_id',
                              dataObj:scope.id
                            }
            });
          this.$store.commit('modifyHeadStatus','4-1')
    },
    transferIn(scope){ 
          this.$router.push({path:`/transfer_in?client_id=${scope.id}`,
                            params:{
                              name:'client_id',
                              dataObj:scope.id
                            }
            });
          this.$store.commit('modifyHeadStatus','4-2')
    },
    transferConfig(){
        this.$router.push('/config_account')
    },
    transferState(obj){
      let url=`/api/user/client/state?id=${obj.id}&state=${!obj.state}`;
        axios.post(url)
                 .then((res)=>{
                    if(res.data.code==10000){
                       this.$message({
                        message:'修改成功',
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
    },
    openRouterDialog(obj){
         this.dialogRouterVisible=true;
         this.routerClient=obj.id
    }
    },//methods end 
  
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