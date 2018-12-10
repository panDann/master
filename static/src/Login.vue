<template>
    <div class="main-login"  @keyup.enter='show' >
            <el-radio-group v-model="labelPosition" size="small">
            <!-- <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button> -->
            </el-radio-group>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" @keyup.enter="clickLogin">
                <el-input v-model="formLabelAlign.password" type='password'></el-input>
            </el-form-item>
            <el-form-item >
                <el-button  @click="clickLogin" >登录</el-button>
            </el-form-item>
            </el-form>
            <!-- <Swicth></Swicth> -->
    </div>
<!-- </transition> -->
</template>

<script>
import Axios from 'axios';
import Swicth from './Swicth'
export default {
    data(){
        return {
        labelPosition: 'left',
        formLabelAlign: {
          username: '',
          password: '',
        }
      };
    },// data end
    methods:{
        clickLogin(){
            let sendData=new FormData()
            sendData.append('username',this.formLabelAlign.username)
            sendData.append('password',this.formLabelAlign.password)
            sendData.append('s','46d1741e8075da4ac72c71d8130fcb71')
            Axios.post(`/api/login`,sendData).then((res)=>{
                    if(res.data.code==10000){
                        res.data.role==3? this.$router.push('/green_qr'):this.$router.push('/first')
                        this.$store.commit('modifyHeadStatus','1')
                        this.$store.commit('cookieState','pay_username')
                    }else{
                        alert(res.data.msg)
                    }
            })
            .catch((err)=>{
                alert(err.data.msg)
            })
        },
        show(){
            this.clickLogin();
        }
    },// methods end
    components:{
        Swicth,
    }
    
}
</script>

<style scoped>
    /* body{
        background: aqua;
    } */

    .main-login{
        background: snow;
        padding: 45px;
        margin: 0 auto;
        margin-top: 10%;
        width: 30%;
        border-radius: 10px;
    }
   
</style>



// WEBPACK FOOTER //
// src/Login.vue