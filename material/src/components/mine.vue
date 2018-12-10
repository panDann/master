<template>
   
    <div >
       
                <mu-appbar style="width: 100%;" color="primary">
                <mu-button icon slot="left">
                <mu-icon value="XC"></mu-icon>
                </mu-button>
                我的主页

                <mu-button flat slot="right">

                </mu-button>
               </mu-appbar>
                     
                     
               <mu-appbar  class="mine-username" :title="username">
                    <mu-button color="primary" @click="isQuit=!isQuit">{{username}}</mu-button><br/>
                    <mu-button color="error" small="true" v-show="isQuit" @click="quitSystem">退出</mu-button>
               </mu-appbar>


    </div>
</template>

<script>
   import Axios from 'axios';

export default {
    
    data(){
        return {
            username:'',
            isQuit:false,
        }
    },
    mounted(){
            this.username=this.getCookie('report_username')? this.getCookie('report_username'):'用户名';
    },
    methods:{
     getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
     },
      quitSystem(){
        let conf=confirm('确定退出？')
        if(conf){
            Axios.get('/api/auth/logout').then((res)=>{
                    //console.log(res)    
                    if(res.data.code==10000){
                        this.$toast.success('退出成功')
                        this.$router.push('/login')
                    }
            })
        }else{
            return;
        }
     },  // quit system
    },
}
</script>



<style scoped>
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
