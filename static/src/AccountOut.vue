
<template>
    <div class="acc-out">
    <el-col :span='24' class="config-main">
        <el-col>
            <div class="acc-btn">
                  <span class="out-span" style="color:snow;"><span style="color:yellow;font-size:inherit">转出</span> 账号列表</span>
                  <div style="display:inline-block">
                    <el-input v-model="searchAccountValue" clearable placeholder='按Enter键查询' class="option" @keyup.native.enter="searchMsg(searchAccountValue)"></el-input>
                  </div>
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
              show-overflow-tooltip
              prop="account"
              width="">
              <template slot-scope="scope"><span style="color:#407eff" title="点击修改" @click="modifyItem(scope.row)">{{ scope.row.account }}</span> </template>
              </el-table-column>
             
              <el-table-column
              label="PID"
              width="100">
              <template slot-scope="scope">
                {{scope.row.pid}}
              </template>
              </el-table-column>

             <el-table-column
              label="账号类型"
              width="">
              <template slot-scope="scope">{{ filterAccount(scope.row.account_type)}}</template>
              </el-table-column>

             <el-table-column
              prop="name"
              label="姓名"
              width="">
              </el-table-column>
            <el-table-column
              prop="host"
              label="主机"
              show-overflow-tooltip
              width="">
              </el-table-column>
             
       <el-table-column
        label="余额"
        show-overflow-tooltip  >
        <template slot-scope="scope">
             <span style="cursor:pointer;color:green" v-if="scope.row.state" @click="transferState(scope.row)" title="点击禁用">{{scope.row.balance}}</span>
             <span style="cursor:pointer;color:red" v-else title="点击启用" @click="transferState(scope.row)">{{scope.row.balance}}</span>
        </template>
        </el-table-column>

        <el-table-column
            width="120"
            label="服务商余额"  >
           <template slot-scope="scope">
              <span style="color:green"> {{scope.row. service_balance}}</span>
           </template>
        </el-table-column>

        <el-table-column
            width="100"
            label="客户余额"  >
           <template slot-scope="scope">
              <span style="color:green"> {{scope.row.client_balance}}</span>
           </template>
        </el-table-column>

            <el-table-column
              label="授权"
              prop='app_auth_token'
              width="">
              <template slot-scope="scope">
                            <el-button @click="copyToken(scope.row.id)" size='small' v-show="!scope.row.app_auth_token">复制链接</el-button>
                            <input type="text" v-model="scope.row.auth_url" style="display:none" :id="'token'+scope.row.id">
              </template>
              </el-table-column>
              <el-table-column
              label="创建时间"
              width="200">
              <template slot-scope="scope">
                {{formdataTime(scope.row.create_time)}}
              </template>
              </el-table-column>
              <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">

              <el-badge  class="item">
                  <el-button   @click="transferParam(scope.row,2)" size="small" >提现记录</el-button>    
              </el-badge>
              <el-badge :value="scope.row.no_read" class="item" :hidden="!scope.row.no_read">
                  <el-button   @click="transferParam(scope.row,1)" size="small">转出记录</el-button>  
              </el-badge>                 
              </template>
              </el-table-column>
        </el-table>
         <!-- 模态框 -->
                <el-dialog title="修改 转出 账号" :visible.sync="dialogModifyVisible" width="30%" :modal-append-to-body='false'>
                      <el-form :model="modify">
                        
                        <div style="width:49%;display:inline-block">
                            <el-form-item label="城市服务：" label-width="100px" >
                                  <el-select v-model="modify.isv_id" placeholder="请选择城市服务账号">
                                    <el-option :label="v[0]" :value="v[1]" v-for="v in isvListData" :key="v[0]"></el-option>
                                  </el-select>
                          </el-form-item>
                      </div>
                      <div style="width:49%;display:inline-block">
                        <el-form-item label="主   机：" :label-width="formLabelWidth" >
                          <el-input v-model="modify.host" auto-complete="off" autofocus=true ></el-input>
                        </el-form-item>
                      </div>

                       <div style="width:49%;display:inline-block">
                         <el-form-item label="账号类型：" :label-width="formLabelWidth">  
                          <el-select v-model="modify.account_type" placeholder="请选择账号类型">
                            <el-option :label="v[0]" :value="v[1]" v-for="v in accountTypeData" :key="v[0]"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>

                     
                      <div style="width:49%;display:inline-block">
                           <el-form-item label="客户：" :label-width="formLabelWidth" >
                              <el-select v-model="modify.client_id" placeholder="请选择客户ID" >
                                <el-option label="系统账号" value="-1"></el-option>
                                <el-option :label="v[0]" :value="v[1]" v-for="v in clientIdData" :key="v[0]"></el-option>
                              </el-select>
                            </el-form-item>
                      </div>

                        <el-form-item label="账号：" :label-width="formLabelWidth">
                          <el-input v-model="modify.account" auto-complete="off" ></el-input>
                        </el-form-item>

                         <!-- <el-form-item label="客户ID：" :label-width="formLabelWidth" >
                          <el-select v-model="modify.client_id" placeholder="请选择客户ID">
                            <el-option :label="v[0]" :value="v[1]" v-for="v in clientIdData" :key="v[0]"></el-option>
                          </el-select>
                        </el-form-item> -->
                        <transition name="el-zoom-in-top">
                        <el-form-item label="姓名：" :label-width="formLabelWidth" v-if="(modify.account_type==9)">
                          <el-input v-model="modify.name" auto-complete="off" placeholder="请输入银行卡绑定的姓名"></el-input>
                        </el-form-item>
                       </transition>
                        <el-form-item label="PID：*" :label-width="formLabelWidth">
                          <el-input v-model="modify.pid" auto-complete="off" ></el-input>
                        </el-form-item>

                        <el-form-item label="负责人：*" :label-width="formLabelWidth">
                          <el-input v-model="modify.principal" auto-complete="off" ></el-input>
                        </el-form-item>
                        <div style="width:49%;display:inline-block" v-show="(modify.account_type==1)">
                        <el-form-item label="登录密码：" label-width="100px" >
                           <el-input v-model="modify.password" auto-complete="off" autofocus='true'  ></el-input>
                         </el-form-item>
                      </div>
                       <div style="width:49%;display:inline-block" v-show="(modify.account_type==1)">
                        <el-form-item label="支付密码：" label-width="100px" >
                           <el-input v-model="modify.pay_password" auto-complete="off" autofocus='true'  ></el-input>
                         </el-form-item>
                      </div>
                   
                      
                        <div style="width:49%;display:inline-block" v-show="(modify.account_type==1)">
                        <el-form-item label="所属设备：" label-width="100px">
                           <el-input v-model="modify.device" auto-complete="off" autofocus='true'  ></el-input>
                         </el-form-item>
                      </div>
                      <div style="width:49%;display:inline-block" v-show="(modify.account_type==1)">
                        <el-form-item label="使用时长：" label-width="100px" >
                           <el-input v-model="modify.duration" auto-complete="off" autofocus='true'  placeholder='时长单位秒'></el-input>
                         </el-form-item>
                      </div>
                      
                      </el-form>
                      <div slot="footer" >
                        <el-button @click="dialogModifyVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sendModifyMsg">确 定 修 改</el-button>
                      </div>
                    </el-dialog> 
                <!-- 模态框 -->
                 <el-dialog title="添加 转出 账号（带 * 为必填项）" :visible.sync="dialogFormVisible" width="35%" :modal-append-to-body='false'>
                  <el-form :model="form">
                    <div style="width:49%;display:inline-block">
                          <el-form-item label="城市服务：" label-width="100px" >
                                <el-select v-model="form.isv_id" placeholder="请选择城市服务账号">
                                  <el-option :label="v[0]" :value="v[1]" v-for="v in isvListData" :key="v[0]"></el-option>
                                </el-select>
                        </el-form-item>
                     </div>
                     <div style="width:49%;display:inline-block">
                      <el-form-item label="主   机：" :label-width="formLabelWidth" >
                        <el-input v-model="form.host" auto-complete="off" autofocus=true ></el-input>
                      </el-form-item>
                     </div>
            
                   <div style="width:100%;border:1px solid #409EFF;height:0;margin:10px 0;"></div>

                      <div style="width:49%;display:inline-block">
                         <el-form-item label="账号类型：" :label-width="formLabelWidth">  
                          <el-select v-model="form.account_type" placeholder="请选择账号类型">
                            <el-option :label="v[0]" :value="v[1]" v-for="v in accountTypeData" :key="v[0]"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
  
                  

                      <div style="width:49%;display:inline-block">
                           <el-form-item label="客户：" :label-width="formLabelWidth" >
                              <el-select v-model="form.client_id" placeholder="请选择客户ID" >
                                <el-option label="系统账号" value="-1"></el-option>
                                <el-option :label="v[0]" :value="v[1]" v-for="v in clientIdData" :key="v[0]"></el-option>
                              </el-select>
                            </el-form-item>
                      </div>
                        <el-form-item label="姓名：*" :label-width="formLabelWidth" >
                          <el-input v-model="form.name" auto-complete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="账号：*" :label-width="formLabelWidth">
                          <el-input v-model="form.account" auto-complete="off" @keyup.native="addSpace(form)"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人：*" :label-width="formLabelWidth">
                          <el-input v-model="modify.principal" auto-complete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="PID：*" :label-width="formLabelWidth">
                          <el-input v-model="form.pid" auto-complete="off" ></el-input>
                        </el-form-item>
                      <div style="width:49%;display:inline-block" v-show="(form.account_type==1)">
                        <el-form-item label="登录密码：*" label-width="100px" >
                           <el-input v-model="form.password" auto-complete="off" autofocus='true'  ></el-input>
                         </el-form-item>
                      </div>
                     <div style="width:49%;display:inline-block" v-show="(form.account_type==1)">
                        <el-form-item label="支付密码：" label-width="100px" >
                           <el-input v-model="form.pay_password" auto-complete="off" autofocus='true'  ></el-input>
                         </el-form-item>
                      </div>
                         <div style="width:49%;display:inline-block" v-show="(form.account_type==1)">
                        <el-form-item label="所属设备：" label-width="100px">
                           <el-input v-model="form.device" auto-complete="off" autofocus='true'  ></el-input>
                         </el-form-item>
                      </div>
                      <div style="width:49%;display:inline-block" v-show="(form.account_type==1)">
                        <el-form-item label="使用时长：" label-width="100px" >
                           <el-input v-model="form.duration" auto-complete="off" autofocus='true'  placeholder='时长单位秒'></el-input>
                         </el-form-item>
                      </div>
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
          money:'',
          multipleSelection: [],// 批量删除
          dialogFormVisible: false,//模态框
          dialogModifyVisible:false,//修改框控制显示
          formLabelWidth: '100px',//模态框的宽度      
          commodities:[],//商品总数
          clientIdData:[],// client id cache
          accountTypeData:[], // storage account_type data
          isvListData:'',//城市服务商数据
          searchAccountValue:'',

          form: {//模态框数据
          account: '',
          account_type: '',
          name:'',
          client_id:'-1',
          device:'',
          isv_id:'',
          host:'',
          duration:'',
          password:'',
          pay_password:'',
          pid:'',
          interface:'',
          principal:'',
          },
         modify: {//模态框数据
          id:'',
          account: '',
          account_type: '',
          name:"",
          client_id:'',
          device:'',
          isv_id:'',
          host:'',
          duration:'',
          password:'',
          pay_password:'',
          pid:'',
          interface:'',
          principal:'',
        },
      }           
        
    },//data end

    mounted(){
        this.getTable();
    },
    filters:{
     
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
       filterAccount(value){
        return this.accountTypeData.filter((item)=>{
          return item[1]==value
        })[0][0]
      },
      getTable(){
              this.loading2=true;
               axios.get('/api/transfer/account/transfer',).then((res)=>{
                 this.loading2=false;   
                 let tem=res.data.msg;
                    if(res.data.code==10000){   
                      this.tableData3=tem.accounts;
                      this.accountTypeData=tem.account_type;
                       this.isvListData=tem.isv_list;
                      this.clientIdData=res.data.msg.client_list;
                       this.money=res.data.msg.sum;                   
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
     transferState(obj){// 状态转换
        // if(!this.checkAuthorization(obj))return false;
        let url=`/api/transfer/state?transfer_type=1&id=${obj.id}&state=${!obj.state}`
        axios.get(url)
             .then(res=>{
               let tem=res.data;
               if(tem.code==10000){
                 this.$message({
                   message:'操作成功',
                   type:'success'})
                 
                 obj.state=!obj.state
               }else{
                  this.$message({
                   message:tem.msg,
                   type:'warning'})
               }
             })
             .catch(err=>{
                  this.$message({
                   message:'系统故障',
                   type:'error'})
              })
      },
     sendAddMsg(){
        this.form.account=this.form.account.replace(/[\s]/g,'')
        this.dialogFormVisible=false;
        let sendStr=Qs.stringify(this.form);
        let sendArr=[];
        axios.post('/api/transfer/account/transfer',sendStr).then((res)=>{
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
     searchMsg(value){
             this.loading2=true;
               let url=`/api/transfer/account/transfer?account=${value}`
               axios.get(url,).then((res)=>{
                 this.loading2=false;   
                 let tem=res.data.msg;
                    this.commodities=res.data.msg.commodities;
                    if(res.data.code==10000){   
                      this.tableData3=tem.accounts;
                      this.accountTypeData=tem.account_type;
                      this.clientIdData=res.data.msg.client_list;
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
     copyToken(id){
      let H=document.getElementById(`token${id}`)
          H.style.display='block'
          H.focus()
          H.select()
      let copyMsg=document.execCommand('copy')
         if(copyMsg){
          H.style.display='none'
           this.$message({
             message:'复制成功',
             type:'success'
           })
         }
      },
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
                   axios.delete(`/api/transfer/account/transfer?id=${sendArr}`,)
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
       this.modify.isv_id=scope.isv_id;
       this.modify.host=scope.host;
       this.modify.account_type=scope.account_type;  
       this.modify.name=scope.name;       
       this.modify.device=scope.device;       
       this.modify.duration=scope.duration;       
       this.modify.password=scope.password;       
       this.modify.pid=scope.pid;       
       this.modify.pay_password=scope.pay_password;       
       this.modify.principal=scope.principal;       
       let self=this;
       setTimeout(()=>{
        self.modify.client_id=scope.client_id;
       },100)

     },//显示修改框
     addSpace(obj){
       if(obj.account_type=='银行卡'){
             this.form.account=obj.account.replace(/[\s]/g,'').replace(/(\d{4})(?=\d)/g,"$1 ")
             console.log(this.form.account)
       }
     },
      sendModifyMsg(){
          let sendStr=Qs.stringify(this.modify);
          axios.put(`/api/transfer/account/transfer?${sendStr}`,).then((res)=>{
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
      transferParam(scope,type){ 
          this.$router.push({path:`/transfer_out?query=${scope.account.replace(/\s/g,'')}&transfer_type=${type}`,
                            params:{
                              name:'query',
                              dataObj:scope.account,
                            }
            });
          this.$store.commit('modifyHeadStatus','4-2')

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