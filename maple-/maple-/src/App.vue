<template>
  <div >
    <transition name="header-left-menu-tran">
                <div class="header-left-menu" v-show="leftChange" >
                   <li class="header-left-menu-item" > <router-link to="/first">首页</router-link></li>
                   <li class="header-left-menu-item" ><router-link to="/web_front">web前端</router-link></li>
                   <li class="header-left-menu-item"><router-link to="/golang_service">golang服务</router-link></li>
                   <li class="header-left-menu-item">MySQL应用</li>
                   <li class="header-left-menu-item">关于始主</li>
                </div>
      </transition>
    <Header></Header>
    <router-view></router-view>
    <div class="top-button" @click="scrollToTop">
      <i class="fa fa-angle-up"></i>
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
    }
  },
  components:{
    Header,
    Content,
  },
   computed:{
            ...mapState({
               leftChange:"leftChange",
               dataList:state=>state.first_page.dataList,
            }),
  },
  mounted(){
     
     this.controlLeftMenu()

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
    cancelBubble(e){
                     this.$store.commit("leftChangeState",false)
    },
     controlLeftMenu(){
                var leftDiv=document.getElementsByClassName("header-left-menu")[0],
                    doc=document.documentElement,
                    docWidth=doc.clientWidth||400,
                    docHeight=doc.clientHeight||600,
                    docFontSize=document.defaultView.getComputedStyle(doc,null).fontSize||doc.currentStyle.fontSize,
                    headerHeight=document.defaultView.getComputedStyle(document.getElementsByClassName("header")[0],null).height||document.getElementsByClassName("header")[0].currentStyle.height;
                    leftDiv.style.width=docWidth/2+"px";
                    leftDiv.style.height=docHeight-parseInt(headerHeight)+"px";
                    leftDiv.style.marginTop=parseInt(headerHeight)+"px";
      },
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

h1, h2 {
  font-weight: normal;
}

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
        z-index: 999;
        background: snow;
        filter: drop-shadow(2px 0 2px rgb(172, 161, 161));
    }
    .header-left-menu-tran-leave-to,.header-left-menu-tran-enter{
            transform: translateX(-10rem)
    }
    .header-left-menu-tran-leave-active{
        transition: transform .3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .header-left-menu-tran-enter-active{
        transition: transform .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
.header-left-menu-item{
    width: 100%;
    text-align: center;
    height: 2.5rem;
    position: relative;
    line-height: 2.5rem;
    margin: 0;
    box-shadow: 0px 1px 1px rgb(56, 139, 187);
    /* filter: drop-shadow(0px 2px 5px rgb(107, 156, 197)); */
    border-bottom: .5px solid #409EFF;   
}

</style>
