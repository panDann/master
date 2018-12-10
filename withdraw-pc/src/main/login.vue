<template>
    <div class="main-login"  @keyup.enter='show' >
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem><br>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
              <FormItem >
                           <Col span="8">
                                    <Input v-model="imgCodeData.captcha_string" placeholder="验证码" ></Input>
                           </Col>
                            <Col span="8">
                             <img :src="'data:image/png;base64,'+imgCodeData.captcha_img" style="height:2rem;margin-left:1rem;cursor:pointer" alt="验证码" @click="getImgCode">
                           </Col>
                    </FormItem>
                     <br>
             <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登 录</Button>
            </FormItem>
        </Form>
    </div>
<!-- </transition> -->
</template>

<script>
import Axios from 'axios';
export default {
    data(){
        return {
        labelPosition: 'left',
        imgCodeData:{
                  captcha_string:'',
                  captcha_id:''
            },
           formInline: {
                    user: '',
                    password: ''
                },
            ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        // { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
            }
      };
    },// data end
    mounted(){
        this.getImgCode()
        !this.getCookie('pay_username')? this.$store.commit('updateUsername',false):''
    },
    methods:{
        handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.checkImgCode()
                    } else {
                        this.$Message.error('信息未填写完整!');
                    }
                })
        },
        clickLogin(){
            let sendData=new FormData()
            sendData.append('username',this.formInline.user)
            sendData.append('password',this.formInline.password)
            sendData.append('s','28c8edde3d61a0411511d3b1866f0636')
            Axios.post(`/api/login`,sendData).then((res)=>{
                    if(res.data.code==10000){
                        this.$router.push('/mine')
                        this.$store.commit('updateUsername',this.getCookie('pay_username'))
                        // this.$store.commit('cookieState','pay_username')
                    }else{
                        alert(res.data.msg)
                        this.getImgCode()
                    }
            })
            .catch((err)=>{
                alert(err.data.msg)
            })
        },
        getCookie(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
            else
            return null;
        },
        show(){
            this.clickLogin();
        },
     getImgCode(){
           let url=`/api/transfer/captcha`
             Axios.get(url,).then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                        this.imgCodeData=tem.msg
                    }else{
                       this.$Message.error(tem.msg)
                    }
            })
      },
      checkImgCode(){
          let url=`/api/transfer/captcha`,
              sendData=new FormData();
              sendData.append('captcha_string',this.imgCodeData.captcha_string)
              sendData.append('captcha_id',this.imgCodeData.captcha_id)
             Axios.post(url,sendData).then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                        this.clickLogin()
                    }else{
                       this.$Message.error(tem.msg)
                    }
            })
      },
    },// methods end
    
    
}
</script>

<style scoped>
    /* body{
        background: aqua;
    } */
    .main-login{
        background: snow;
        padding: 70px;
        padding-bottom: 20px;
        margin: 0 auto;
        margin-top: 10%;
        position: fixed;
        left: 0;
        right: 0;        /* border: .5px solid rgb(84, 92, 100); */
        width: 20%;
        min-width: 20rem;
        box-shadow: 0px 2px 5px 0px rgb(84, 92, 100);
        border-radius: 10px;
        transition: all .3s;
    }
    .main-login:hover{
        box-shadow: 0px 5px 20px 1px rgb(84, 92, 100);

    }
   
</style>

// WEBPACK FOOTER //
// src/Login.vue