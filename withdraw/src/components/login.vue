<template>
    <div style="position:relative;">
         <mu-appbar style="width: 100%;" color="primary">
                <mu-button icon slot="left">
                <mu-icon value="TX"></mu-icon>
                </mu-button>
                用户登录

                <mu-button flat slot="right">

                </mu-button>
            </mu-appbar>
        <mu-container style="margin-top:5rem;" class="login-container">
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                <mu-form-item label="用户名" help-text="帮助文字" prop="username" :rules="usernameRules">
                <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>
                <!-- <mu-form-item prop="isAgree" :rules="argeeRules">
                <mu-checkbox label="记住密码" v-model="validateForm.isAgree"></mu-checkbox>
                </mu-form-item> -->
                <mu-form-item>
                <mu-button color="primary" @click="submit">提交</mu-button>
                <mu-button @click="clear">重置</mu-button>
                </mu-form-item>
            </mu-form>
            </mu-container>
    </div>
</template>
<script>

import Axios from 'axios'

export default {
  data () {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 20, message: '密码长度大于3小于10'}
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        username: '',
        password: '',
        isAgree: false,
        loading:false,
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        if(result){
            let url=`/api/login`,
                formdata=new FormData();
                formdata.append('username',this.validateForm.username)
                formdata.append('password',this.validateForm.password)
                formdata.append('s','28c8edde3d61a0411511d3b1866f0636')
            Axios.post(url,formdata,)
                 .then(res=>{
                     if(res.data.code==10000){
                            this.$toast.success('登录成功')
                                this.$router.push('/mine')
                            this.$store.commit('confirmLogin',true);
                            
                     }else{
                            this.$toast.warning(res.data.msg)
                     }
                 })
                 .catch(err=>{
                            this.$toast.error(err)
                 })
        }
        console.log('form valid: ', result)
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      };
    },
   
  }
};
</script>
<style>
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
.login-container{
    position: absolute;
    
}
</style>
