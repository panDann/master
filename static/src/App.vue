<template>
  <div id="app" style="min-width:1366px;position:relative">
              <el-header :class="{'Header-show':username,'Header-hidden':!username}">
                    <div class="maple-container">
                              <el-col :span='6' style="display:inline-block;float:left">
                                <div class="logo-div">
                                  <img src="./assets/logo.jpg" alt="logo">
                                </div>
                                <ForwardRetreat v-show="username"></ForwardRetreat>
                            </el-col>
                            <el-col :span='18'  style="display:inline-block;float:right;">
                                <Head style="display:inline-block;float:right" v-show="username"></Head>
                            </el-col>
                    </div>
              </el-header>
              <div class="close-bg">
                <el-button @click="closeBg" type='success' v-if="isBg">关闭背景</el-button>                       
              </div>
                  <div class="maple-router-container">
                            <transition name='rotate-transition'>
                              <router-view></router-view>
                            </transition>
                      <!-- </transition> -->
                 </div>

           <rightMenu></rightMenu>
           <a href="http://xctest.free.idcfengye.com/pay" target="blank" style="position:fixed;bottom:0;right:0;width:10rem;height:2rem;">生成二維碼</a>
  </div>
</template>

<script>
// import Table from './components/Table.vue'
import rightMenu from './components/rightMenu.vue'
import Head from './components/Head.vue'
import Roll from './components/RollText.vue'
import  {mapState} from 'vuex'
import ForwardRetreat from './components/ForwardRetreat.vue'


import Date from './components/Date'
export default {
  name: 'app',
  data () {
    return {
      isBg:true,
      routerViewIndex:1,
      msg: 'Welcome to Your Vue.js App'
    }
  },
 
  mounted(){
    // this.$route.path='/'? this.$router.push('/first'):''
    // this.$store.commit('modifyHeadStatus','1')
  },
  computed:mapState({
    username:'username',
  
  }),
  methods:{
    closeBg(){
      this.isBg=false;
      console.log(document.body.style.background)
      document.body.style.backgroundImage="url('')";
     }
  },
  components:{
    Date,
    // Table,
    rightMenu,
    Head,
    Roll,
    ForwardRetreat,
  }
}
</script>

<style>
/* *{
  opacity: .99;
} */
body{
  padding: 0;
  background: #CCC url('./assets/bg.jpg');
  margin: 0;
}
.rotate-transition-leave-active{
    transform: scale(.5) translateY(-100px);
    transition: transform .7s ease-in-out;
    position: absolute;
}
.rotate-transition-enter-active{
    transform: scale(1);
    opacity: 1;
    transition: all .7s ease-in-out;
}
.rotate-transition-enter{
    transform: scale(.5) ;
    opacity: .0;
}
.rotate-transition-leave-to{
    transform: scale(0) translateY(0px);
}
.el-header{
  background: rgb(84, 92, 100);
  margin-bottom: 10px;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.Header-show{
  height: 60px;
  animation: header-show 1s linear;
}
@keyframes header-show {
  0%{height: 0;}
  100%{height: 60px;}
}
.Header-hidden{
  display: none;
}


.el-col{
  border-radius: 4px;
  display: inline-block;
}
.maple-container{
  width: 90%;
  margin: 0 auto;
}
.maple-router-container{
   width: 80%;
    margin: 0 auto;
    position: relative;
}
@media (max-width: 1488px) {
  .maple-container{
  width: 95%;
  margin: 0 auto;
}
}
a{
  text-decoration: none;
  color: snow;
}
.close-bg{
  float: right;
  opacity: .1;
  /* display: none; */
}
.close-bg:hover{
  opacity:.8;
}
.logo-div img{
      max-width: 50px;
      max-height: 50px;
      border-radius: 100%;
      position: absolute;
      padding: 5px;
      animation: logo 10s infinite;
}
@keyframes logo {
  0%{left: -4rem;
    transform: rotateY(0deg)
  }
  50%{left: 5rem;
    transform: rotateY(360deg)
        
  }
  
  100%{left: -100px;
    transform: rotateY(0deg)
        
  }

  
}
</style>



// WEBPACK FOOTER //
// src/App.vue