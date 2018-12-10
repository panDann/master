
<template>
    <div class="">
      <el-col :span='24' class="config-main">
          <el-col>
              <div class="acc-btn">
              <span class="out-span" style="color:snow;"><strong style="color:yellow">城市服务商</strong> 配置列表</span>
              <el-button type='danger' @click="deleteItems">
                <span v-show="multipleSelection.length" style="font-size:1rem">删除选 {{multipleSelection.length}} 项</span> 
                  <span title="历史收款总金额" style="font-size:1rem" v-show="!multipleSelection.length">￥{{money}}</span> 
              </el-button>
              <el-button type='primary' @click="dialogFormVisible = true">
                  添加账号
              </el-button>
              </div>
          </el-col>
      </el-col>
        <!-- 分页 -->
           <el-dialog title="秘钥" :visible.sync="keyDialog" width="40%" :modal-append-to-body='false'>
                  <p style="word-break:break-all;width:auto" v-html="dialogMsg">
                    {{dialogMsg}}
                  </p>
                  <div slot="footer" >
                    <el-button @click="keyDialog = false">关 闭</el-button>
                  </div>
            </el-dialog> 

            <el-dialog title="定时任务" :visible.sync="timerDialog" width="30%" :modal-append-to-body='false'>
                <el-form :model='timer'>
                  <el-form-item label="支付宝账号：" label-width="150px" >
                           <el-input v-model="timer.merchant_account" auto-complete="off" autofocus='true'  ></el-input>
                   </el-form-item>
                   <el-form-item label="提现账号：" label-width="150px" >
                          <el-select v-model="timer.transfer_account" placeholder="请选择客户ID">
                            <el-option :label="v" :value="v" v-for="v in outputAccountData" :key="v"></el-option>
                          </el-select>
                   </el-form-item>
               
                   <el-form-item label="金额：" label-width="150px" >
                           <el-input v-model="timer.amount" auto-complete="off" autofocus='true'  @keyup.native.enter="sendTimeMsg"></el-input>
                   </el-form-item>
                    <el-form-item label="" label-width="150px" >
                           <el-button @click="clearTimeMsg(timer.merchant_account)" type='danger' plain   v-show="isShowClear">清除定时任务</el-button>
                   </el-form-item>
                </el-form>
                  <div slot="footer" >
                    <el-button @click="timerDialog = false">关 闭</el-button>
                    <el-button type="primary" @click="sendTimeMsg">{{isShowClear? '修 改':'添 加'}}</el-button>
                  </div>
            </el-dialog> 
        <!-- test -->
            <div class="data-item" v-for="v in tableData3" :key="v.id">
              <p class="data-item-account" @mouseover="deleteBtn=true" @mouseout="deleteBtn=false">
                {{v.account}}
                <span class="delete-btn" v-show="deleteBtn" @click="deleteItem(v.id)">&#10005;</span>
              </p>
              <div class="data-item-middle">
                
                  <p class="data-item-other">创建时间：{{formdataTime(v.create_time)}}</p>
              </div>
                  <div style="text-align:center;padding-bottom:.2rem;">
                      <el-badge  class="item">
                          <el-button   @click="modifyItem(v)" size="small" >修改</el-button>               
                      </el-badge>
                      <el-badge :value="v.no_read" class="item" :hidden="!v.no_read">
                        <el-button   @click="transferParam(v)" size="small">收款账号</el-button>  
                      </el-badge>
                  </div>
                  <div style="text-align:center;">
                
                   <el-tooltip :content="'应用ID：'+v.app_id" placement='top' class="item">
                  <img  class='private-img' src="./assets/ID.png"  >
                  </el-tooltip>
                  <el-tooltip content="点击查看私钥" placement='top' class="item">
                      <img  class='private-img' src="./assets/private.png" @click="publicShow(v.app_private_key)" >
                  </el-tooltip>
                  <el-tooltip content="点击查看公钥" placement='top' class="item">
                      <img  class='private-img' src="./assets/public.png" @click="publicShow(v.alipay_public_key)" >
                  </el-tooltip>
                </div>
            </div>
        <div v-if="tableData3.length">
           <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :total='total'
              style="margin-top:.6rem;"
              :current-page.sync="currentPage" @current-change="turnPage">
            </el-pagination>
        </div>
         <!-- 模态框 修改 -->
             <el-dialog title="修改账号" :visible.sync="dialogModifyVisible" width="50%" :modal-append-to-body='false'>
                <el-form :model="modify">
                   <el-form-item label="账号类型：" :label-width="formLabelWidth">
                        <el-select v-model="modify.account_type" placeholder="请选择账号类型">
                        <el-option :label="v[0]" :value="v[1]" v-for="v in accountTypeData" :key="v[0]"></el-option>
                        </el-select>
                    </el-form-item>
                     <div style="width:45%;display:inline-block">
                        <el-form-item label="账号：" label-width="150px">
                          <el-input v-model="modify.account" auto-complete="off" autofocus='true'  ></el-input>
                        </el-form-item>
                     </div>
                      <div style="width:45%;display:inline-block">
                        <el-form-item label="登录密码：" label-width="150px">
                          <el-input v-model="modify.password" auto-complete="off" type="text" placeholder='可不填'></el-input>
                        </el-form-item>
                      </div>
                      <div style="width:45%;display:inline-block">
                          <el-form-item label="应用ID：" :label-width="formLabelWidth" >
                            <el-input v-model="modify.app_id" auto-complete="off" ></el-input>
                          </el-form-item>
                      </div>
                    <transition name="el-zoom-in-top">
                          <el-form-item label="应用私钥：" :label-width="formLabelWidth" >
                            <textarea style="height:5rem;width:90%;"   v-model="modify.app_private_key"  ></textarea>
                          </el-form-item>
                    </transition>
                    <transition name="el-zoom-in-top">
                        <el-form-item label="支付宝公钥：" :label-width="formLabelWidth" >
                          <textarea style="height:5rem;width:90%;"     v-model="modify.alipay_public_key"  ></textarea>
                        </el-form-item>
                    </transition>
                  </el-form>
                  <div slot="footer" >
                    <el-button @click="dialogModifyVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sendModifyMsg">确 定 修 改</el-button>
                  </div>
                </el-dialog> 
                <!-- 模态框 添加-->
                 <el-dialog title="添加账号" :visible.sync="dialogFormVisible" width="50%" :modal-append-to-body='false'>
                  <el-form :model="form">
                    <el-form-item label="账号类型：" :label-width="formLabelWidth">
                        <el-select v-model="form.account_type" placeholder="请选择账号类型">
                        <el-option :label="v[0]" :value="v[1]" v-for="v in accountTypeData" :key="v[0]"></el-option>
                        </el-select>
                    </el-form-item>
                     <div style="width:45%;display:inline-block">
                        <el-form-item label="账号：" label-width="150px">
                          <el-input v-model="form.account" auto-complete="off" autofocus='true'  ></el-input>
                        </el-form-item>
                     </div>
                      <div style="width:45%;display:inline-block">
                        <el-form-item label="登录密码：" label-width="150px">
                          <el-input v-model="form.password" auto-complete="off" type="text" placeholder=''></el-input>
                        </el-form-item>
                      </div>
                 
                   
                      <div style="width:45%;display:inline-block">
                          <el-form-item label="应用ID：" label-width="150px" >
                            <el-input v-model="form.app_id" auto-complete="off" ></el-input>
                          </el-form-item>
                      </div>
                     
                   <transition name="el-zoom-in-top">
                          <el-form-item label="应用私钥：" :label-width="formLabelWidth" >
                            <textarea style="height:5rem;width:90%;"   v-model="form.app_private_key"  ></textarea>
                          </el-form-item>
                    </transition>
                    <transition name="el-zoom-in-top">
                        <el-form-item label="支付宝公钥：" :label-width="formLabelWidth" >
                          <textarea style="height:5rem;width:90%;"     v-model="form.alipay_public_key"  ></textarea>
                        </el-form-item>
                    </transition>
                  </el-form>
                  <div slot="footer" >
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sendAddMsg">确 定</el-button>
                  </div>
                </el-dialog>  
      <!-- <Dialog :intelligent.sync="intelligent"></Dialog> -->
   </div> 
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import moment,{ duration } from 'moment'
import Roll from './components/RollText.vue'

export default {
        data (){
        return {
          loading2:false,//控制加载延迟
          tableData3: [],//表格数据
          money:'',
          multipleSelection: [],// 批量删除
          dialogFormVisible: false,//模态框
          dialogModifyVisible:false,//修改框控制显示
          formLabelWidth: '150px',//模态框的宽度    
          accountTypeData:[], // storage account_type data
          accountFirstData:['客户','身份证','主机'],// 主机类型
          accountFirstValue:'',
          accountSecondValue:'',
          accountAllData:[],// 缓存三个列表类型数据
          accountSecondData:[],//第二选框值

          deleteBtn:false,
          timerDialog:false,
           
          dialogMsg:'', 
          keyDialog:false,
          total:1,// page number
          currentPage:1,
          pageSize:10,
          intelligent:1,

          form: {//模态框数据
              account: '',
              account_type:'',
              password: '',
              app_id:'',
              app_private_key:"",
              alipay_public_key:"",
          },
          modify: {//模态框数据
              id:'',
              account: '',
              password: '',
              account_type:'',
              app_id:'',
              app_private_key:"",
              alipay_public_key:"",
          },
          timer:{
            merchant_account:"",
            transfer_account:'',
            amount:'',
          },
          isShowClear:false,
          outputAccountData:[],//提现账号
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
               let url=`/api/transfer/account/isv`
               axios.get(url,).then((res)=>{
                    let tem=res.data;
                    this.loading2=false;
                    if(res.data.code==10000){   
                       this.tableData3=tem.msg.accounts;
                       this.accountTypeData=tem.msg.account_type;
                       this.setTrue(this.tableData3);
                       this.money=tem.msg.sum; 
                       this.total=tem.msg.total  
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
               axios.get(`/api/transfer/account/isv&page=${this.currentPage}&page_size=${this.pageSize}`,).then((res)=>{
                 let tem=res.data.msg.accounts;
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
                   this.$message({
                        message:'系统故障',
                        type:'warning'
                      });
               });
      },
      transferState(obj){// 状态转换
        let url=`/api/transfer/state?id=${obj.id}&state=${!obj.state}`
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
    
       getFile(type){
        let file=window.event.target.files[0]
        if(type=='modify'){
          this.modify.file=file
          // this.modify.qrcode=window.event.target.result
        }else{
            this.form.file=file
        } 
      },
      timerTask(account){
        this.timerDialog=true;
        let url=`/api/transfer/task?merchant_account=${account}`;
            axios.get(url,).then((res)=>{
                    let tem=res.data.msg;
                    if(res.data.code==10000){
                      if(tem.transfer_account_list.length){
                         this.outputAccountData=tem.transfer_account_list;
                      }else{
                        let conf=confirm('未配置提现账号，是否前往配置？')
                            conf? this.$router.push('/account_out'):''
                      }
                      tem.task_info.amount? this.timer=tem.task_info:this.timer.merchant_account=account  
                      tem.task_info.amount? this.isShowClear=true:this.isShowClear=false  

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
      },
      sendTimeMsg(){
          let url=`/api/transfer/task`,
              sendData=this.formdata(this.timer)
              axios.post(url,sendData).then((res)=>{
                      let tem=res.data;
                      this.timerDialog=false;
                      if(res.data.code==10000){
                          this.$message({
                          message:tem.msg,
                          type:'success'
                        });
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
      },
      clearTimeMsg(merchant_account){
          let conf=confirm(`确定要清除 ${merchant_account} 转账任务？`)
              if(!conf)return;
          let url=`/api/transfer/task?merchant_account=${merchant_account}`
              axios.delete(url).then((res)=>{
                      let tem=res.data;
                      if(res.data.code==10000){
                        this.timer={
                                merchant_account:"",
                                transfer_account:'',
                                amount:'',
                              },
                          this.timerDialog=false;
                          this.$message({
                          message:'清除成功',
                          type:'success'
                        });
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
      },
     sendAddMsg(){// add item
        this.dialogFormVisible=false;
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
        let sendStr=new FormData()
            for(let v in this.form){
              sendStr.append(`${v}`,this.form[v])
            }
        axios.post('/api/transfer/account/isv',sendStr,config)
             .then((res)=>{
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
                            });
                        }
                     }})// then end 
              .catch(err=>{
                     this.$message({
                            message:`请求发生未知错误${err}`,
                            type:'warning'
                        });
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
          }
          let sendArr=[];
                for(let i=0;i<len;i++){
                  sendArr.push(this.multipleSelection[i].id)
                }
            let comf=confirm('确定要删除么？')
            if(comf){
                   axios.delete(`/api/transfer/account/isv?id=${sendArr}`,)
                        .then((res)=>{
                          if(res.data.code==10000){
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
                         });
            }
      },// delete end
         deleteItem(id){
            let comf=confirm('确定要删除么？')
            if(!comf)return;
                   axios.delete(`/api/transfer/account/isv?id=${id}`,)
                        .then((res)=>{
                          if(res.data.code==10000){
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
                         });
      },// delete end
      modifyItem(scope){
        this.dialogModifyVisible=true;
        this.modify.id=scope.id
        this.modify.account=scope.account
        this.modify.password=scope.password
        this.modify.account_type=scope.account_type
        this.modify.app_id=scope.app_id
        this.modify.app_private_key=scope.app_private_key
        this.modify.alipay_public_key=scope.alipay_public_key
     },//显示修改框
      sendModifyMsg(){
          let sendStr=new FormData()
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
            for(let v in this.modify){
               sendStr.append(`${v}`,this.modify[v])
            }
            console.log(sendStr.get('file'),this.modify.file,'file')
          axios.put(`/api/transfer/account/isv`,sendStr,config).then((res)=>{
                if(res.data.code==10000){
                      this.dialogModifyVisible=false;
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
      },//提交修改信息
      transferParam(scope){ 
          this.$router.push({path:`/account_in?query=${scope.id}`,
                            params:{
                              name:'query',
                              dataObj:scope.isv_id
                            }
            });

          this.$store.commit('modifyHeadStatus','2-1')
    },// router transport param
    formdataTime(time){
      return moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss')
    },
     formdata(obj){
       let o=new FormData()
       if(typeof obj !='object'){
          alert('数据格式化出错')
          return
       }
       for(let v in obj){
         obj[v]? o.append(`${v}`,obj[v]):o.append(`${v}`,'')
       }
       return o
    },
    publicShow(text){//   处理公钥
     this.keyDialog=true;
     this.dialogMsg=text.replace(/\n/ig,'<br>');
    },
    handleListShow(index){
        if(index==1){
          this.accountSecondData=this.accountAllData.msg.client_list
        }else if(index==2){
          this.accountSecondData=this.accountAllData.msg.idcard_list
        }else{
          this.accountSecondData=this.accountAllData.msg.host_list
        }
    },
    sendSecondMsg(value){
         let url=this.accountFirstValue==1? `/api/transfer/account/isv?client_id=${value}`:this.accountFirstValue==2? `/api/transfer/account/isv?idcard=${value}`:`/api/transfer/account/isv?host=${value}`
             this.loading2=true;
              axios.get(url,).then((res)=>{
                  let tem=res.data;
                  this.loading2=false;
                  if(res.data.code==10000){   
                      this.tableData3=tem.msg.accounts;
                      this.setTrue(this.tableData3)
                      this.money=tem.msg.sum; 
                      this.total=tem.msg.total  
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
    },
    transferMaster(obj){
      let sendData=new FormData(),
          url= `/api/transfer/master`
          // conf=confirm('同组其他账号，将默认为非主账号，继续？')
          // if(!conf){
          //   obj.master=!obj.master
          //   return;}
          // alert(obj.master)
          if(obj.master){
            sendData.append('id',obj.id)
            sendData.append('state',1)
          }else{
            sendData.append('id',obj.id)
            sendData.append('state',0)
          }
          axios.post(url,sendData).then((res)=>{
                if(res.data.code==10000){  
                    this.$message({
                    message:obj.master? ` ${obj.account} 设置为主账号`:'关闭主账号',
                    type:'success'
                    }); 
                    this.getTable()
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
    },
    setTrue(arr){
      for(let i=0,l=arr.length;i<l;i++){
        if(arr[i].master){
          arr[i].master=true
        }else{
          arr[i].master=false
        }
      }
    }
    },//methods end
    
    filters:{
      keyEnter(value){
      }
    },
    components:{
      // Dialog,
      Roll,
    },
  }
  

</script>

<style scoped>
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

.data-item{
  width:20%;
   /* display: flex;
  flex-flow: row wrap;
  justify-content: space-around; */
  background:snow;
  display: inline-block;
  height: 20rem;
  border-radius: .4rem;
  box-shadow: 1px 2px 3px ;
  transition:  all .3s;
  margin: .5rem;
  position: relative;
  transform: translateY(.3rem);
}
.data-item:hover{
  transform: translateY(0px);
  box-shadow: 1px 5px 3px ;
}
.data-item-account{
  padding: .9rem;
  text-align: center;
  border-bottom: 1px solid pink;
  /* padding-bottom: 0rem; */
  margin: 0;
}
.delete-btn{
  position: absolute;
  right: .5rem;
  top: -.2rem;
}
.delete-btn:hover{
  /* border-radius: .1rem;; */
  cursor: pointer;
  /* background: red; */
  color: rgb(228, 19, 19);
}
.data-item-other{
  padding-left: 4rem;
 
}
.data-item-middle{
  border-bottom: 1px solid blueviolet;
   max-height: 11rem;
   padding-top: .5rem;
   transition: all .5s;
  overflow: scroll;
}

.data-item-middle::-webkit-scrollbar{
  width: 5px;
}
/* .data-item-middle:hover{
  background: #409EFF;
  color: snow;
  border-radius: .5rem;

} */
.data-item-middle::-webkit-scrollbar-thumb {
border-radius:10px;
background:rgba(12, 223, 117, 0.1);
box-shadow:inset 0 0 6px rgba(0,0,0,0.5);
}

</style>

// WEBPACK FOOTER //
// src/AccountIn.vue