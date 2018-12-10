<template>
    
<div>
      <div class="container">
          <el-col  >
                <el-card class="box-card" 
                v-loading="messageLoading"
      
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                        <div slot="header" class="clearfix">
                            <span class="username">{{userData.username}}<span style="font-size:8px;color:black;margin-left:10px;">(带*为可修改的选项)</span> </span>
                        </div>
                        <div class="container">
                           <el-radio-group v-model="labelPosition" size="small" v-show="0">
                            <el-radio-button label="left">左对齐</el-radio-button>
                            <el-radio-button label="right">右对齐</el-radio-button>
                            <el-radio-button label="top">顶部对齐</el-radio-button>
                         </el-radio-group>
                           
                            <el-form :label-position="labelPosition" label-width="150px" >
                           
                                    <el-form-item label="商户ID：">
                                        <el-input v-model="userData.merchant_id" readonly></el-input>
                                    </el-form-item>
                                    <!-- <el-form-item label="通知接口：*">
                                        <el-input v-model="userData.notify_url"></el-input>
                                    </el-form-item> -->
                                    <!-- <el-form-item label="支付比例：*" label-width="">
                                    <el-select   v-model="userData.proportion">
                                        <el-option :label="(v-1)*10+'%'" :value="(v-1)*10" v-for="v in 11"  :key="v" ></el-option>
                                    </el-select>
                                    </el-form-item> -->
                                    <el-form-item label=" 单笔交易上限：*">
                                        <el-input v-model="userData.once_amount_limit"></el-input>
                                    </el-form-item>
                                    <el-form-item label="   新密码：">
                                        <el-input v-model="userData.new_password" placeholder='若不想修改密码，请不要填此项'></el-input>
                                    </el-form-item> 
                                    <el-form-item label=" 确认新密码：">
                                        <el-input v-model="userData.new_password_repeat" placeholder='若不想修改密码，请不要填此项'></el-input>
                                    </el-form-item>
                                     <!-- <el-form-item label="秘钥：">
                                        <el-input v-model="userData.secret_key" style="display:inline-block;" 
                                         v-loading="messageLoading"
                                         readonly
                                         element-loading-spinner="el-icon-loading"
                                         element-loading-background="rgba(0, 0, 0, 0.8)"
                                        ></el-input>
                                         <button class="input-btn" @click="makeKey"> 重新生成秘钥</button>

                                    </el-form-item> -->
                                    
                                    <el-form-item>
                                         <el-button type="primary" @click="sendMessage">提交</el-button>

                                    </el-form-item>
                               </el-form>
                        </div>
                </el-card>
          </el-col>
      </div>
          

</div>


</template>
<script>

import axios from 'axios'
export default {
    data (){
        return{
            activeNames:1,
            messageLoading:false,
            keyLoading:false,
            labelPosition:'left',
            userData:{
                // proportion:'',
                once_amount_limit:'',
                new_password:'',
                notify_url:'',
            }
        }
    },
    mounted(){
        this.getMessage()
    },
    methods:{
       getMessage(){
               this.messageLoading=true;
             
               axios.get('/api/user/personal_info')
                    .then((res)=>{
                 let tem=res.data.msg;
                    if(res.data.code==10000){   
                       this.userData=tem;
                       this.messageLoading=false;
                      console.log(tem)
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
                        type:'danger'
                      });
               });
       },
       sendMessage(){// 保存修改信息
               this.messageLoading=true;
                 let sendData=new FormData();
                  for(let v in this.userData){
                     this.userData[v]? sendData.append(`${v}`,this.userData[v]):'';
                  }
                if(this.userData.new_password!=this.userData.new_password_repeat){
                    this.$message({
                        message:'两次密码不一致',
                        type:'warning'
                    });
                    return
                }
               axios.post('/api/user/personal_info',sendData)
                    .then((res)=>{
                 this.messageLoading=false;
                 let tem=res.data.msg;
                    if(res.data.code==10000){   
                       this.messageLoading=false;
                       this.$message({
                        message:'修改成功',
                        type:'success'
                      });
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
                        type:'danger'
                      });
               });
       },
       makeKey(){
           let conf=confirm("确定要重新生成秘钥？")
               this.keyLoading=true;
           if(conf){
               axios.post('/api/user/secret_key',)
                    .then((res)=>{
                     this.keyLoading=false;
                 let tem=res.data.msg;
                    if(res.data.code==10000){   
                        this.userData.secret_key=res.data.msg;
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
    },
}
</script>

<style scoped>
.container{
    width: 60%;
}
.username{
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    color: snow;
    text-align:center;
    border-radius: .2rem;;
    background: #409EFF;
    vertical-align: middle;
}
/* .item{
    background: rgb(230, 226, 226);
    padding: .4rem;
    border-radius: .2rem;
}
.item:hover{
    background: rgb(35, 182, 16);
    color: snow;

} */
.input-btn{
    position: absolute;
    padding: .555rem;
    border: none;
    background: none;
    color: #409EFF;
    cursor: pointer;
    top: 0;
    right: -6rem;
    outline: none;
    
}
.item-input{
    border: none;
    border-bottom: .5px solid black;
    padding: .5rem;
    margin-bottom: .5rem;
}
</style>
