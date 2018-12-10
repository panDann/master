<template>
     <div>
             <div style=';margin-top:10px;' class='ctn-table-div'>
             <Personal :msg='msg'></Personal>
            <table class="table table-bordered table-condensed text-center  table-hover table-ellipsis" style='overflow:scroll-x;max-height:700px;' v-loading='loading'>
                    <thead>
                            <tr>
                                    <th>
                                            序号
                                    </th>
                                    <th>
                                        企业号
                                    </th>
                                    <th>邮箱</th>
                                    <th>企业名</th>
                                    <th>图片</th>
                                    <th>信用码</th>
                                    <th>登记处</th>
                                    <th>注册日</th>
                                    <th>数据源</th>
                                    <th>操作</th>
                            </tr>
                    </thead>
                            <tbody>
                                <tr v-for='(v,i) in tableData' :key="i">
                                        <td>{{i+1}}</td>
                                        <td style="max-width:5rem;text-overflow:ellipsis;overflow:hidden;" :title="v.enterprise_num"> {{v.enterprise_num}}</td>
                                         <td style="color:green" >
                                               <span style="color:green;"  v-show="!v.modify" @mouseover="Show(v)" @mouseout="v.modifyShow=true">
                                                                   {{v.email}}
                                                                   <transition name="el-zoom-in-top">
                                                                     <Show :msg='showData' v-show="!v.modifyShow"></Show>
                                                                   </transition>
                                                </span>
                                                         <img src="../assets/modify.png" style="cursor:pointer" title="修改支付宝信息"   @click="showModifyModal(v)" v-if="v.reg_account" v-show="!v.modify">
                                                         <img src="../assets/add.png" style="cursor:pointer" title="添加支付宝信息" @click="showAddModal(v)" v-else v-show="!v.modify">
                                            <input class="form-control" v-model="v.email" v-show="v.modify" @keyup.enter="sendEmail(v)">
                                        </td>
                                        <td> {{v.name}}</td>
                                         <td style="max-width:3rem;text-overflow:ellipsis;overflow:hidden;">
                                            <el-popover placement="right" trigger="hover">
                                                <img :src="v.img+'?'+Math.random()" style="width:20rem;height:10rem;">
                                                <span style="display:inline-block;color:green;max-width:3rem;text-overflow:ellipsis;overflow:hidden;" slot='reference' >{{v.img}}</span>
                                            </el-popover>
                                        </td>
                                        <td style="max-width:3rem;text-overflow:ellipsis;overflow:hidden;" :title="v.social_credit_code"> {{v.social_credit_code}}</td>
                                        <td style="max-width:3rem;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;" :title="v.registration_authority"> {{v.registration_authority}}</td>
                                        <td> {{formdataTime(v.registration_date)}}</td>
                                        <td> {{v.data_source}}</td>
                                        <td>
                                        <el-button type="primary" plain size="mini"  @click='v.modify=!v.modify'>{{v.modify? '取消':'修改'}}</el-button>
                                        <!-- <el-button type="success" plain size="mini"  @click='addAlipay(v.id)' v-show="v.reg_account">增加</el-button> -->
                                        </td>
                                </tr>
                                <tr style="height;3rem;" >
                                    <td colspan="10" style="transition:all 2s linear">
                                        <div style="margin:0 auto;">
                                            <span style='font-size:2rem;cursor:pointer' @click='showStateTransfer' v-show="isShowAdd" title="添加营业执照">+</span>
                                            <transition name='el-zoom-in-top'>
                                                <div v-if="isShowInput">
                                                    <div class="form-group " style='display:inline-block;'>
                                                    <label class="control-label col-md-4" for="supplier_name" style='display:inline-block'>企业二维码：</label>
                                                    <input class="form-control" type="file" @change="readFile" style='display:inline-block;width:70%;'>
                                                    </div>  
                                                    <div class="form-group " style='display:inline-block;'>
                                                    <label class="control-label col-md-4" for="supplier_name" style='display:inline-block'>邮箱：</label>
                                                    <input class="form-control" type="email" v-model="addData.email"  style='display:inline-block;width:70%;'>
                                                    </div> 
                                                    <div class="form-group " style=' display:inline-block;margin-left: .4rem;'>
                                                    <label class="control-label col-md-4" for="supplier_name" style='display:inline-block'>数据源：</label>
                                                    <input class="form-control"  v-model="addData.data_source" style='display:inline-block;width:70%;'>
                                                    <button class='btn btn-primary' style='display:inline-block;margin-bottom:5px;'  @click='subMsg' v-loading="submitLoading">提交信息</button>
                                                    <!-- <button class="btn default-btn" style='display:inline-block;margin-bottom:5px;' size='mini' @click="hideSub">X</button> -->
                                                    </div> 
                                                    <div class="form-group " style=' display:inline-block;margin-left: .4rem;'>
                                                    <button class="btn default-btn" style='display:inline-block;margin-bottom:5px;' size='mini' @click="hideSub">&#10005;</button>
                                                    </div> 
                                                </div>
                                            </transition>
                                        </div>
                                    </td>
                                </tr>
                    </tbody>
            </table>
            </div>
            <!-- 企业支付宝模态框 -->
             <el-dialog
                title="提示"
                :visible.sync="dialogEnterpriseAlipay"
                width="30%"
                :append-to-body="true"
                >
                                    <el-form :model="addEnterpriseAlipayData" v-if="isShowEnterpriseAdd">
                                        <el-form-item label="支付宝：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="addEnterpriseAlipayData.account" ></el-input>
                                        </el-form-item>  
               
                                        <el-form-item label="昵称：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="addEnterpriseAlipayData.nickname" ></el-input>
                                        </el-form-item>  

                                         <el-form-item label="状态：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="addEnterpriseAlipayData.stLifeCycle" @keyup.native.enter="subEnterpriseAlipay"></el-input>
                                        </el-form-item>  
                                    </el-form>

                                    <el-form :model="modifyEnterpriseAlipayData" v-else>
                                        <el-form-item label="支付宝：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="modifyEnterpriseAlipayData.reg_account"  readonly></el-input>
                                        </el-form-item>  
                                        <el-form-item label="昵称：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="modifyEnterpriseAlipayData.nickname" ></el-input>
                                        </el-form-item>  
                                        <el-form-item label="密码：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="modifyEnterpriseAlipayData.password" ></el-input>
                                        </el-form-item>
                                        <el-form-item label="支付密码：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="modifyEnterpriseAlipayData.pay_password" ></el-input>
                                        </el-form-item>

                                        <el-form-item label="状态：" :label-width="labelWidth">
                                         <el-input auto-complete="off"  v-model="modifyEnterpriseAlipayData.stLifeCycle" @keyup.native.enter="subEnterpriseAlipay"></el-input>
                                        </el-form-item>  
                                    </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogEnterpriseAlipay = false">取 消</el-button>
                    <el-button type="primary" @click="subEnterpriseAlipay">确 定</el-button>
                </span>
            </el-dialog>
            <div style="display:inline-block;">
                                        <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :page-size="pageSize"
                                        :total="page" @current-change='turnPage' :current-page.sync=currentPage>
                                        </el-pagination>
            </div>
    </div>     
</template>


<script>
import axios from 'axios'
import moment,{ lang } from 'moment'
import Qs from 'qs'
import Personal from './personalAlipay.vue'
import Show from './Show.vue'

export default {
     data() {
          return {
              tableData:[],
              loading:false,
              label:'',
              pageSize:10,
              page:10,
              currentPage:1,
              dialogEnterpriseAlipay:false,//
              isShowEnterpriseAdd:false,// 判断是修改还是添加
              labelWidth:"150px",
              
              addEnterpriseAlipayData:{
                  id:'',
                  account:'',
                  nickname:'',
                  stLifeCycle:'',
              },
              modifyEnterpriseAlipayData:{
                   sid:'',
                reg_account:'',
                nickname:'',
                password:'',
                pay_password:'',
                stLifeCycle:'',
              },
              showData:[],// 效果框数据
              isShowPersonal:false,
              addData:{
                  img:'',
                  data_source:'',
                  idcard:'',
                  email:''
              },
              isShowAdd:true,
              isShowInput:false,
              submitLoading:false,
          };
        },
    props:["msg"],
    mounted(){
            this.getTable();
    },
    methods: {
            
     getTable(){
        let sendStr=`/api/resource/business_license?idcard=${this.msg.idcard}&page_size=${this.pageSize}&page=${this.currentPage}`;
        this.loading=true;
        axios.get(sendStr,)
             .then((res)=>{
               this.loading=false;
               if(res.data.code==10000){
                 this.tableData=res.data.msg;
                 this.tableData.map(item=>{
                     item.modify=false;
                     item.modifyShow=true;
                 })
                 console.log(this.tableData,'log')
                //  this.modifyEnterpriseFun(this.tableData)
                 this.page=res.data.total;
                }else{
                     this.$message({
                        message:res.data.msg,
                        type:'error'
                    });
                }
             })
        .catch((err)=>{
            console.error(err)
        }) 
     },// get table data function
     showModifyModal(obj){
                    this.dialogEnterpriseAlipay=true;
                  this.isShowEnterpriseAdd=false;
                   this.modifyEnterpriseAlipayData.reg_account=obj.reg_account;
                    this.modifyEnterpriseAlipayData.sid=obj.sid;
                    this.modifyEnterpriseAlipayData.nickname=obj.nickname;
                    this.modifyEnterpriseAlipayData.stLifeCycle=obj.stLifeCycle;
                    this.modifyEnterpriseAlipayData.password=obj.password;
                    this.modifyEnterpriseAlipayData.pay_password=obj.pay_password;
     },
     showAddModal(obj){
            this.isShowEnterpriseAdd=true;
            this.dialogEnterpriseAlipay=true;
            this.addEnterpriseAlipayData.account=obj.email;
            this.addEnterpriseAlipayData.nickname=this.msg.name;
     },
     subEnterpriseAlipay(){
            let url=`/api/resource/account_info`,
                sendData='';
            if(this.isShowEnterpriseAdd){
                sendData=this.formdata(this.addEnterpriseAlipayData)
                axios.post(url,sendData)
                     .then(res=>{
                          this.dialogEnterpriseAlipay=false;
                           if(res.data.code==10000){
                               this.$message({
                                   message:'添加成功',
                                   type:'success'
                               });
                               this.getTable()
                           }else{
                                this.$message({
                                   message:res.data.msg,
                                   type:'error'
                               });
                           }// end if 
                      })
                      .catch(err=>{
                             this.$message({
                                   message:err,
                                   type:'error'
                               });
                      })
               }else{
                 sendData=this.formdata(this.modifyEnterpriseAlipayData)
                 axios.put(url,sendData)
                     .then(res=>{
                          this.dialogEnterpriseAlipay=false;
                           if(res.data.code==10000){
                               this.$message({
                                   message:'修改成功',
                                   type:'success'
                               });
                               this.getTable()
                           }else{
                                this.$message({
                                   message:res.data.msg,
                                   type:'error'
                               });
                           }// end if 
                      })
                      .catch(err=>{
                             this.$message({
                                   message:err,
                                   type:'error'
                               });
                      })
               }// end if 
     },// end func 
     formdata(obj){// 格式化参数
            let tem=new FormData()
            for(let v in obj){
                tem.append(`${v}`,obj[v])
            }
            return tem
     },
  
  readFile(){
        let e=window.event;
        let file=e.target.files
        this.addData.img=file[0]
        this.addData.idcard=this.msg;
  },
  modifyAlipayItem(obj){
         console.log(obj)
        //  obj.modify=obj.modify;
        if(obj.modify){
            obj.modify=false
        }else{
            obj.modify=true
        }
         console.log(obj,'ma')

  },
  sendEmail(obj){// 邮箱修改
    let formdata=new URLSearchParams()
        formdata.append('id',obj.id)
        formdata.append('email',obj.email)
    let url=`/api/resource/business_license`;
    axios.put(url,formdata)
        .then((res)=>{
            obj.modify=false;
            if(res.data.code==10000){
                    this.$message({
                        message:'修改成功',
                        type:'success'
                    });
                   this.getTable()

            }else{
                this.$message({
                    message:res.data.msg,
                    type:'danger'
                });
                console.error(res.data.msg)
            }
        });
  },
  stateChange(){
  
  },
  Show(obj){
      this.showData=obj;
      obj.modifyShow=false;
      console.log(obj)
  },
  subMsg(){
    let url=``;
    let formdata=new FormData()
        this.addData.idcard=this.msg.idcard
        formdata=this.formdata(this.addData)
    this.submitLoading=true;
    console.log(formdata,'fro')
    url=`/api/resource/business_license`;
    axios.post(url,formdata)
        .then((res)=>{
            this.submitLoading=false;
            if(res.data.code==10000){
                    this.$message({
                        message:'添加成功',
                        type:'success'
                    });
                    this.getTable();
                    this.isShowAdd=true;
                    this.isShowInput=false;
            }else{
                this.$message({
                    message:res.data.msg,
                    type:'danger'
                });
                console.error(res.data.msg)
            }
        })
        .catch(err=>{
            this.$message({
                    message:'系统异常',
                    type:'danger'
                });
        });
    
    return;          
},//
formdataTime(time){
        return moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss')
},
hideSub(){
     this.isShowAdd=true;
     this.isShowInput=false;
},

deleteItem(name){
    let url=`/api/resource/business_license?id=${name}`;
    let conf=confirm('确定要删除么？')
    if(conf){
        axios.delete(url)
        .then((res)=>{
            if(res.data.code==10000){
                this.getTable();
                this.$message({
                 message:'删除成功',
                 type:'success'
                 });
            }else{
                 this.$message({
                 message:res.data.msg,
                 type:'error'
                 });
            }
        })
    }else{
        return
    } // end if           
      
  },// delete end 
  showStateTransfer(){
    this.isShowAdd=false;
    this.isShowInput=true;
  },
  turnPage(){
    let sendStr=`/api/resource/moments?id=${this.msg}&page_size=${this.pageSize}&page=${this.currentPage}`;
    this.loading=true;
    axios.get(sendStr,)
    .then((res)=>{
        if(res.data.code==10000){
             this.tableData=res.data.msg;
             this.loading=false;
            //console.log(res.data.msg,'/api/resource/moments')
        }
    })
    .catch((err)=>{
        console.error(err)
    }) 
 },
    },// end methods
    components:{
        Personal,
        Show
    }

}
</script>
