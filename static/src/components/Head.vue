<template>
  <div class="main-head">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1"> <router-link to='/first'><li>首页</li> </router-link></el-menu-item>
                <!-- first page -->
                <el-submenu index="2">
                <template slot="title">配置账号</template>
                    <router-link to='/city_config'><el-menu-item index="2-3">城市服务商配置</el-menu-item> </router-link> 
                    <router-link to='/account_in'><el-menu-item index="2-1"><li><span style="color:yellow"> 收款 </span><span style="color:snow">账号配置</span> </li></el-menu-item></router-link>
                    <el-menu-item index="2-2"><router-link to='/account_out'><li><span style="color:yellow" >转出 </span><span style="color:snow">账号配置</span> </li></router-link></el-menu-item>  

                </el-submenu>
           
                <el-submenu index="4">
                <template slot="title">转账记录</template>
                    <el-menu-item index="4-1"><router-link to='/transfer_in'><li><span style="color:yellow"> 转入 </span><span style="color:snow">记录</span> </li></router-link></el-menu-item>
                    <el-menu-item index="4-2"><router-link to='/transfer_out'><li><span style="color:yellow" >转出 </span><span style="color:snow">记录</span> </li></router-link></el-menu-item>  
                   <router-link to='/error_handle'> <el-menu-item index="4-3">异常处理</el-menu-item>  </router-link>

                </el-submenu>
            <el-menu-item index="5"> <router-link to="/client_message"> 客户配置</router-link></el-menu-item>

                <el-submenu index="6" v-if="username">
                    <template slot="title">{{username}} </template>
                    <router-link to="/commercial_manager"> <el-menu-item index="6-4" v-if="(username=='admin')" router="true">用户管理</el-menu-item></router-link>

                    <router-link to="/personal_info"> <el-menu-item index="6-1">个人信息</el-menu-item></router-link>
                    <router-link to="/green_qr"> <el-menu-item index="6-5">绿伞二维码</el-menu-item></router-link>
                    <router-link to="/interface_docu"> <el-menu-item index="6-3">接口文档</el-menu-item></router-link>

                    <!-- <router-link to="/id_registe"> <el-menu-item index="6-3">身份信息</el-menu-item></router-link> -->
                    <el-menu-item index="6-2" @click="clickQuit" :plain='true'>退出登录</el-menu-item>      
                </el-submenu>

                <el-menu-item index="6" v-else><router-link to='/login'><li >登录</li> </router-link></el-menu-item>
            </el-menu>

  </div>
</template>

<script>
import Axios from 'axios';
import ElementUI from 'element-ui'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        // activeIndex2:"",
      };
    },
   
    computed:mapState({
        count:'count',
        activeIndex2:"headStatus",
        username:'username'
    }),
    mounted(){
        // console.log(this.$router.options.routes)
        // let sesIndex=sessionStorage.localRouterIndex
        // sessionStorage.localRouterIndex? this.activeIndex2=sessionStorage.localRouterIndex:'';
    },
    methods: {
      ...mapMutations([
        'increment',
        'modifyHeadStatus',
        'cookieState'
      ]),
      handleSelect(key, keyPath) {
        this.modifyHeadStatus(key)

      },//handleSelect end
      getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
      },
      clickQuit(){
        let comf=confirm('确定要退出么？')
            if(!comf)return;
                 Axios.get('/api/logout').then((res)=>{
                  if(res.data.code==10000){
                    this.$message({
                      message:'退出成功',
                      type:'success'
                    })
                    this.$router.push('/login')
                    this.cookieState('pay_username')
                    this.modifyHeadStatus('6')
                  }else{
                    alert(res.data.msg)
                  }
              })
      },//quit end
      open(){
        ElementUI.$messege('quit')
        
      },
   
    },
    components:{}
  };

</script>

<style scoped>
.full-link a{
  display: block;
  height: 100%;
  width: 100%
}
</style>

// WEBPACK FOOTER //
// src/components/Head.vue