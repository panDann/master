<template>
    <div>
       
                 <table class="table table-bordered table-condensed text-center  table-hover table-ellipsis" style='overflow:scroll-x;max-height:700px;' v-loading='loading'>
                    <thead>
                            <tr>
                                    <th style="color:green">
                                            个人支付宝
                                    </th>
                                    <th>
                                        昵称
                                    </th>
                                    <th>密码</th>
                                    <th>支付密码</th>
                                    <th>状态</th>
                                    <th>注册时间</th>
                            </tr>
                    </thead>
                            <tbody>
                                    <tr v-show="personalAlipay">   
                                        <!-- <td rowspan="6" style="color:red" v-show="!personalAlipay">暂未注册</td> -->
                                        <td style="color:#409EFF;cursor:pointer" title="点击修改" @click="isShowModify=true"> {{personalAlipay.reg_account}}</td>
                                        <td> {{personalAlipay.nickname}}</td>
                                        <td> {{personalAlipay.password}}</td>
                                        <td> {{personalAlipay.pay_password}}</td>
                                        <td> {{personalAlipay.stLifeCycle}}</td>
                                        <td> {{personalAlipay.registerTime? formdataTime(personalAlipay.registerTime):''}}</td>
                                    </tr>
                                <tr style="height;3rem;"  v-if="!personalAlipay">
                                    <td colspan="6" style="transition:all 2s linear">
                                        <div style="margin:0 auto;">
                                            <transition name='el-zoom-in-top'>
                                                <div>
                                                    <div class="form-group " style='display:inline-block;'>
                                                    <label class="control-label col-md-4" for="supplier_name" style='display:inline-block'>账号：</label>
                                                    <input class="form-control" type="text" v-model="personalAlipayAddData.account" style='display:inline-block;width:70%;'>
                                                    </div>  
                                                    <div class="form-group " style='display:inline-block;'>
                                                    <label class="control-label col-md-4" for="supplier_name" style='display:inline-block'>昵称：</label>
                                                    <input class="form-control" type="email" v-model="personalAlipayAddData.nickname"  style='display:inline-block;width:70%;'>
                                                    </div> 
                                                    <div class="form-group " style=' display:inline-block;margin-left: .4rem;'>
                                                    <label class="control-label col-md-4" for="supplier_name" style='display:inline-block'>状态：</label>
                                                    <input class="form-control"  v-model="personalAlipayAddData.stLifeCycle" style='display:inline-block;width:70%;'>
                                                    <button class='btn btn-primary' style='display:inline-block;margin-bottom:5px;'  @click='personalSubMsg' >提交信息</button>
                                                    </div> 
                                                </div>
                                            </transition>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                 </table>

                    <el-dialog
                title="提示"
                :visible.sync="isShowModify"
                width="30%"
                :append-to-body="true"
                >
                                    <el-form :model="modify" >
                                        <el-form-item label="支付宝：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="modify.reg_account"  readonly></el-input>
                                        </el-form-item>  
               
                                        <el-form-item label="昵称：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="modify.nickname" ></el-input>
                                        </el-form-item>  
                                        <el-form-item label="密码：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="modify.password" ></el-input>
                                        </el-form-item>
                                        <el-form-item label="支付密码：" :label-width="labelWidth">
                                        <el-input auto-complete="off"  v-model="modify.pay_password" ></el-input>
                                        </el-form-item>

                                        <el-form-item label="状态：" :label-width="labelWidth">
                                         <el-input auto-complete="off"  v-model="modify.stLifeCycle" @keyup.native.enter="subMsg"></el-input>
                                        </el-form-item>  
                                    </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="isShowModify= false">取 消</el-button>
                    <el-button type="primary" @click="subMsg">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
               personalAlipayAddData:{
                  account:'',
                  nickname:'',
                  stLifeCycle:'',
              },
              labelWidth:'150px',
              personalAlipay:'',
              loading:false,
              isShowModify:false,
              modify:{
                  sid:'',
                reg_account:'',
                nickname:'',
                password:'',
                pay_password:'',
                stLifeCycle:'',
              }
        }
    },
    props:['msg'],
    mounted(){
            this.getTable();
            this.personalAlipayAddData.account=this.msg.phone;
            this.personalAlipayAddData.nickname=this.msg.name;
    },
    methods:{
            getTable(){
                    let sendStr=`/api/resource/business_license?idcard=${this.msg.idcard}&page_size=${this.pageSize}&page=${this.currentPage}`;
                    this.loading=true;
                    axios.get(sendStr,)
                        .then((res)=>{
                        this.loading=false;
                        if(res.data.code==10000){
                            let tem=Object.keys(res.data.personal_alipay)
                            !tem.length? this.personalAlipay='':this.personalAlipay=res.data.personal_alipay;
                            this.modifyFun(res.data.personal_alipay)
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
                modifyFun(obj){
                    this.modify.reg_account=obj.reg_account;
                    this.modify.sid=obj.sid;
                    this.modify.nickname=obj.nickname;
                    this.modify.stLifeCycle=obj.stLifeCycle;
                    this.modify.password=obj.password;
                    this.modify.pay_password=obj.pay_password;
                },
                personalSubMsg(){// 个人支付宝提交
                        let url=``;
                        let formdata=new FormData()
                            formdata=this.formdata(this.personalAlipayAddData)
                        url=`/api/resource/account_info`;
                        axios.post(url,formdata)
                            .then((res)=>{
                                if(res.data.code==10000){
                                        this.$message({
                                            message:'添加成功',
                                            type:'success'
                                        });
                                        this.getTable();
                                }else{
                                    this.$message({
                                        message:res.data.msg,
                                        type:'danger'
                                    });
                                }
                            });
                        return; 
                    },
                    formdataTime(time){
                        return moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss')
                    },
                   subMsg(){
                        let url=``;
                        let formdata=new FormData()
                            formdata=this.formdata(this.modify)
                        url=`/api/resource/account_info`;
                        axios.put(url,formdata)
                            .then((res)=>{
                                this.isShowModify=false;
                                if(res.data.code==10000){
                                        this.$message({
                                            message:'修改成功',
                                            type:'success'
                                        });
                                        this.getTable();
                                }else{
                                    this.$message({
                                        message:res.data.msg,
                                        type:'danger'
                                    });
                                    console.error(res.data.msg)
                                }
                            });
                        return; 
                   },
                    formdata(obj){// 格式化参数
                            let tem=new FormData()
                            for(let v in obj){
                                tem.append(`${v}`,obj[v])
                            }
                            return tem
                    },
    }// end methods
}
</script>

<style>

</style>
