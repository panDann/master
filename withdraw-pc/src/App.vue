<template>
  <div id="app">
    <!-- <Switch>
        <span slot="open">开</span>
        <span slot="close">关</span>
    </Switch> -->
      <transition name='top-bottom'>
        <Head v-show="userIndex" :show.sync="leftRouterData"></Head>
      </transition>
      <Row>
        <transition name='left-right'>
          <Col span="3" v-show="userIndex">
            <div class="left-menu" id="app-left-menu">
               <Second >
                  <div  class="second-nav-item" v-if="leftRouterData" :style="{'margin-top':Math.random()*30+'px','left':Math.random()*7+'rem',}" v-for="v in leftRouterData" :key="v.router">
                     <div class="rotate-animation" ></div>
                     <router-link :to='v.router' class="">{{v.label}}</router-link>
                  </div>
               </Second>
            </div>
          </Col>
        </transition>
            <Col span="21">
              <div class="right-menu" v-show="userIndex" >
              </div>
              <div :class="{'router-view':userIndex}">
                <router-view></router-view>
              </div>
            </Col>
     </Row>
  </div>
</template>
<script>
import Head from './components/Head';
import Second from './components/Second';
import {mapState} from 'vuex';

export default {
  name: 'app',
  components:{
    Head,
    Second,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      leftRouterData:[]
    }
  },
  computed:mapState({
    userIndex:'username',
    activeAnimationClass(){
      return sessionStorage.routerIndex
    },
    
  }),
  watch:{
     leftRouterData(newV,oldV){
      //  sessionStorage.cache_leftRouterData=JSON.stringify(newV)
     },
   
  },
  mounted(){
      let leftMenu=document.getElementById('app-left-menu')
          // temCache=sessionStorage.cache_leftRouterData
          leftMenu.style.height=parseInt(window.innerHeight)-60+parseInt(window.pageYOffset)+'px';
          window.addEventListener('resize',()=>{
            leftMenu.style.height=parseInt(window.innerHeight)-60+parseInt(window.pageYOffset)+'px';
          })
          this.getCookie('pay_username')? "":this.$router.push('/login')
          // temCache? this.leftRouterData=JSON.parse(temCache):this.leftRouterData=0
  },
  methods:{
    getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
 }
    
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  
  // margin-top: 60px;
  min-width: 1360px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
a{
  color: #42b983;
}
li {
  display: inline-block;
  margin: 0 10px;
}


.left-menu{
  width: 100%;
  margin: 0;
  min-width: 10rem;
  // float: left;
  position: relative;
  background: #2c3e50;
  min-height: 30rem;
}

.right-menu{
  display: inline-block;
  height: 3rem;
  width: 100%;
  // margin: 0;
  // border-bottom: .5px solid #2c3e50;
  box-shadow: 0px 2px 19px #2c3e50;
  // background: #2c3e50;y
}
.router-view{
  // width: 85%;
  display: block;
  margin: 2rem;
  text-align: center;
  height: auto;
  padding: .5rem;
  min-height: 10rem;
  border: .5px solid pink;
  border-radius: .2rem;
  box-shadow: 3px 3px 10px 0 pink;
  transition: height .5s;
}

.top-bottom-enter-active {// 特效
  transition: all .8s ease;
}
.top-bottom-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.top-bottom-enter, .top-bottom-leave-to
 {
  transform: translateY(-20px);
  opacity: 0;
}

.left-right-enter-active {
  transition: all .8s ease;
}
.left-right-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.left-right-enter, .left-right-leave-to
 {
  transform: translateX(-20px);
  opacity: 0;
}

.bottom-top-enter-active {
  transition: all .8s ease;
}
.bottom-top-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.bottom-top-enter, .bottom-top-leave-to
 {
  transform: translateY(20px);
  opacity: 0;
}
*::selection  {
    color: orange;
    background: #333;
}
.second-nav-item{
  color: snow;
  position: relative;
  width: 5rem;
  height: 5rem;

  background: linear-gradient(to bottom, rgb(52, 196, 23), rgb(178, 194, 190), rgb(27, 212, 212));;
  line-height: 5rem;
  border-radius: 100%;
  transition: all 1s;
}
.second-nav-item a{
  position: relative;
  z-index: 10;
  color:snow;
  line-height: 5rem;
  display: inline-block;
  margin: 0 .5rem;
}
.second-nav-item a:hover{
  color:rgb(230, 233, 67);

}
.rotate-animation::after{
   width: .5rem;
   height: .5rem;
   content: "";
   display: block;
   position: absolute;
   border-radius:100%;
   border:rgba(27, 212, 212, $alpha: .5) 1px solid;
   background-clip:padding-box;
}
.rotate-animation{
   position: absolute;
   width: 5rem;
   height: 5rem;
   border: #42b983 1px solid;
   z-index: 0;
   animation: second-circle 5s  linear infinite;
}
@keyframes second-circle {

  0%{  transform: rotate(0deg) }
  100%{  transform: rotate(360deg) }

}
</style>
