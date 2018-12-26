<template>
  <div >
    <transition name="header-left-menu-tran">
                <div class="header-left-menu" v-show="leftChange" >
                   <li :class="{'header-left-menu-item':true,'mb-router-active':currentRoute== '/first'}" @click="transferRouter('/first')"> <router-link to="/first">首页</router-link></li>
                   <li :class="{'header-left-menu-item':true,'mb-router-active':currentRoute== '/web_front'}" @click="transferRouter('/web_front')"><router-link to="/web_front">web</router-link></li>
                   <li :class="{'header-left-menu-item':true,'mb-router-active':currentRoute== '/golang_service'}" @click="transferRouter('/golang_service')"><router-link to="/golang_service">golang</router-link></li>
                   <li :class="{'header-left-menu-item':true,'mb-router-active':currentRoute== '/mysql_application'}" @click="transferRouter('/mysql_application')"><router-link to="/mysql_application">MySQL</router-link></li>
                   <li :class="{'header-left-menu-item':true,'mb-router-active':currentRoute== '/about_maple'}" @click="transferRouter('/about_maple')"><router-link to="/about_maple">始主</router-link></li>
                </div>
      </transition>
      <transition name="header-left-sha-tran">
                <div class="header-left-menu-shadow" v-show="leftChange" @click="cancelBubble()">
                </div>
      </transition>
    <Header></Header>
    <router-view></router-view>
    <!-- 视口 -->
    <div class="top-button" @click="scrollToTop">
      <i class="fa fa-angle-up"></i>
    </div>
     <div class="app-message-box" v-show="messagebox.show">
       {{messagebox.msg}}<span>&#10006;</span>
     </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Content from "./components/Content";
import { mapState,mapActions } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentRoute:""
    }
  },
  components:{
    Header,
    Content,
  },
   computed:{
            ...mapState({
               leftChange:"leftChange",
               messagebox:"messagebox",
               dataList:state=>state.first_page.dataList,
            }),
  },
  watch:{
    $route:{
      handler(newV,oldV){
                        this.currentRoute=newV.path;
      },
      immediate:true,
    }
  },
  mounted(){
     
     this.controlLeftMenu()
     window.addEventListener("resize",this.controlLeftMenu,false)

  },
  methods:{
    scrollToTop(){
       var  s=document.documentElement.scrollTop||document.body.scrollTop,
            leap=parseInt(s/10),
            temS
       var timer=setInterval(function(){
               temS=document.documentElement.scrollTop||document.body.scrollTop
                if(temS<=leap){
                  document.documentElement.scrollTop=0
                  document.body.scrollTop=0
                  clearInterval(timer)
                }else{
                   document.documentElement.scrollTop=document.documentElement.scrollTop-leap
                   document.body.scrollTop=document.body.scrollTop-leap
                }
              
       },10)
       
    },
    transferRouter(path){
        this.$router.push(path)
        this.$store.commit("leftChangeState",false)
    },
    cancelBubble(){
        this.$store.commit("leftChangeState",false)
    },
     controlLeftMenu(){
                var leftDiv=document.getElementsByClassName("header-left-menu")[0],
                    leftDivShadow=document.getElementsByClassName("header-left-menu-shadow")[0],
                    doc=document.documentElement,
                    docWidth=doc.clientWidth,
                    docHeight=doc.clientHeight,
                    docFontSize=document.defaultView.getComputedStyle(doc,null).fontSize||doc.currentStyle.fontSize,
                    headerHeight=document.defaultView.getComputedStyle(document.getElementsByClassName("header")[0],null).height||document.getElementsByClassName("header")[0].currentStyle.height;
                    leftDiv.style.width=docWidth/2+"px";
                    leftDivShadow.style.width=leftDiv.style.width;
                    leftDivShadow.style.height=docHeight-parseInt(headerHeight)+"px";
                    leftDiv.style.height=leftDivShadow.style.height
                    leftDivShadow.style.marginTop=parseInt(headerHeight)+"px";
                    leftDiv.style.marginTop=parseInt(headerHeight)+"px";

      },
      checkRouter(){
                        this.currentRoute=this.$route.path;
      }
     }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // position: relative;
  color: #2c3e50;
  margin-top: 60px;
}

// h1, h2 {
//   font-weight: normal;
// }

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


@media screen and (min-width: 998px) {
    #header-left{
        display: none;
    }
}
@media screen and (max-width: 998px) {
    #header-center{
        display: none;
    }
    .content-right{
        display: none;
    }
}

@media screen and (max-width: 1300px) {
    .content-username{
        display: none;
    }
   
}

 .header-left-menu{
        position: fixed;
        left: 0;
        transition: transform .3s cubic-bezier(0.075, 0.82, 0.165, 1);
        z-index: 9;
        background: snow;
        filter: drop-shadow(2px 0 2px rgb(172, 161, 161));
    }
    
.header-left-menu-item{
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    display: block;
    text-align: center;
    position: relative;
    line-height: 5rem;
    margin: .5rem auto;
    box-shadow: 0px 1px 1px rgb(56, 139, 187);
    /* filter: drop-shadow(0px 2px 5px rgb(107, 156, 197)); */
    border-bottom: .5px solid #409EFF;   
}
.header-left-menu-item a{
  text-decoration: none;
}
.mb-router-active{
    box-shadow: none;
    background: #409EFF;
}
.mb-router-active a{
    color: white;
}
// z-index 9
.header-left-menu-shadow{
  background: black;
  opacity: 0.5;
  position: fixed;
  right: 0;
  transition: transform .3s cubic-bezier(0.075, 0.82, 0.165, 1);
  z-index: 9;
}
.app-message-box{
  position: fixed;
  bottom: 2rem;
  text-align: center;
  line-height: 3rem;
  left: 1rem;
  background: black;
  opacity: .7;
  color: snow;
  border-radius: .1rem;
  height: 3rem;
  width: auto;
  min-width: 20rem;
  // display: block;
  visibility: visible;
  animation: appbox .5s linear;
}
@keyframes appbox {
  0%{ opacity: .3;}
  100%{ opacity: .7;}
}
.app-message-box span{
  -webkit-appearance: none;
  float: right;
  margin-right: 1rem;
  color: snow;
}
// .app-message-box span:hover{
//     opacity: .9;
//     cursor: pointer;
// }
</style>
