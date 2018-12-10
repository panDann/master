
<template>
    <div class="acc-out">
    <el-col :span='24' class="config-main">
            <div class="acc-btn">
                <span :class="{'out-span-common':true,'out-span':secondRouter==1}" @click="secondRouter=1" > 用户列表</span>
                <span :class="{'out-span-common':true,'out-span':secondRouter==2}" @click="secondRouter=2" > 角色列表</span>
                <span :class="{'out-span-common':true,'out-span':secondRouter==3}" @click="secondRouter=3" > 权限列表</span>
                <!-- <el-tag type="danger">历史收款总金额：￥{{money}}</el-tag> -->
            </div>
       <Commercial v-if="secondRouter==1"></Commercial>
       <Role v-if="secondRouter==2"></Role>
       <Limit v-if="secondRouter==3"></Limit>
    </el-col>
   </div> 
</template>

<script>
import Commercial from './limits/commercial'
import Limit from './limits/limit'
import Role from './limits/role'

export default {
    data(){
        return {
            secondRouter:Number,
        }
    },
    beforeRouteLeave(to,from,next){
        sessionStorage.commercialManagerRouter=this.secondRouter;
        next()
    },
    watch:{
        'secondRouter':function(n,o){
          sessionStorage.commercialManagerRouter=n;
        }
    },
    mounted(){
        let sess=sessionStorage.commercialManagerRouter
        sess? this.secondRouter=sess:this.secondRouter=1
    },
    components:{
        Commercial,
        Limit,
        Role,
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


.out-span-common{
     display: inline-block;
      padding: 12px;
      border-radius: 4px;
      color:snow;
      border-right: 1px silver solid;
      cursor: pointer;
}
 .out-span{
      background-color: #409EFF;
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
</style>



// WEBPACK FOOTER //
// src/AccountIn.vue