<template>
   
    <div >
       <mu-appbar style="width: 100%;" color="primary">
                <mu-button icon slot="left">
                <mu-icon value="TX"></mu-icon>
                </mu-button>
                用户提现
                <mu-button flat slot="right">
                </mu-button>
            </mu-appbar>
            <mu-container>
                    <mu-card style="width: 90%; max-width: 375px;min-height:20rem;max-height:22rem;overflow:auto; margin: 10px auto;">
                    <mu-card-header :title="getCookie('pay_username')" sub-title="vip 用户">
                        <mu-avatar slot="avatar">
                        <img src="../assets/user.png">
                        </mu-avatar>
                    </mu-card-header>
                    <!-- <mu-card-media title="Image Title" sub-title="Image Sub Title">
                        <img src="../assets/logo.png">
                    </mu-card-media> -->
                  余额：<span  style="color:#2196f3;font-size:2rem;">{{contentData.balance}}</span>
                    <!-- <mu-card-title :title="" sub-title=""></mu-card-title>  -->
                    <mu-card-text v-html="contentData.tips">
                      {{contentData.tips}}
                    </mu-card-text>
                    <mu-card-actions>
                        <mu-button color='primary'>修 改</mu-button>
                        <mu-button color='secondary' @click="quitSystem">退 出</mu-button>
                    </mu-card-actions>
                    </mu-card>
                    <mu-button color="success" full-width @click="leapToWithdraw" :disabled="!contentData.balance">提 现</mu-button>
           
            </mu-container>

    </div>
</template>

<script>
   import Axios from 'axios';
//    import md5 from 'md5';

export default {
    
    data(){
        return {
            username:'',
            isQuit:false,
            contentData:{
                balance:'加载中...',
                tips:'加载中...'
            },
            open:false,
            value1:''
        }
    },
    mounted(){
            this.username=this.getCookie('report_username')? this.getCookie('report_username'):'用户名';
            this.getData()
    },
    methods:{
     getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
     },
     leapToWithdraw(){
         this.$router.push({
          path: '/withdraw',
          params: {
            balance: this.contentData.balance
          }
        })
         this.$store.commit('confirmLogin',false)
     },
     getData(){
           Axios.get('/api/transfer/withdraw').then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                      this.contentData.balance=tem.msg.balance
                      this.contentData.tips=tem.msg.tips
                    }else{
                       this.$toast.error(tem.msg)
                    }
            })
            .catch(err=>{
                       this.$toast.error('系统故障')
            })
     },
      quitSystem(){
        this.$confirm(`确定要退出登录么？`,'提示')
                    .then(({result})=>{
                        if(result){
                             Axios.get('/api/logout').then((res)=>{
                                    if(res.data.code==10000){
                                        this.$toast.success('退出成功')
                                        this.$store.commit('confirmLogin',false)
                                        this.$router.push('/login')
                                    }
                            })
                        }
                    })
          
       
     },  // quit system
    },
}
</script>



<style >
body{
    -webkit-overflow-scrolling: touch;
}
.mine-username{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    overflow: auto;
    height: 10rem;
    border-radius: 100%;
    width: 50%;
}
</style>
