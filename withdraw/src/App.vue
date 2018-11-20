<template>
  <div id="app" >
  
      <router-link to="/material"></router-link>
      <router-link to="/mine"></router-link>
      <router-link to="/login"></router-link>
      <div style="margin-bottom:56px">
        <router-view></router-view>    
      </div>
    <div style="max-width:400pxy; width:100%;position:fixed;" class="footer-menu" v-if="isLogin"> 
      <mu-bottom-nav :value.sync="shift" shift @change="leapRouter">
        <mu-bottom-nav-item value="/material" title="记录" icon="books" ></mu-bottom-nav-item> 
        <mu-bottom-nav-item value="/mine" title="我的" icon="account_circle"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </div> 

  </div>
</template>

<script>

import Axios from 'axios'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'app',
   data () {
    return {
      list: [],
      listMirror:[],
      pageSize:9,
      currentPage:1,      
      page:'',
      loading: false,
      shift:sessionStorage.routerIndex
    }
  },
  computed:mapState({
      dataRange:function(){
            if(this.list.length){
                let [...l]=this.listMirror
                return l[l.length-1].cTime.match(/\d\d-\d\d$/ig)[0]+"~"+l[0].cTime.match(/\d\d-\d\d$/ig)[0]

            }else{
              return "日期范围"
            }
      },
      isLogin:'isLogin',
  }),
  mounted(){
      if(this.$route.path=='/'){
        this.$router.push('/mine')
      }
     this.shift=this.shiftTem
  },
  methods: {
     ...mapMutations([

     ]),

     getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
     },
    handleSortChange({name, order}){
             this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },
      
      leapRouter(router){
        this.$router.push(router)
        this.shift=router
        // sessionStorage.routerIndex=router;
      }
     
    

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  max-width: 400px;
  margin: 0 auto;
  /* max-width: 500px; */
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

a {
  color: #42b983;
}
.footer-menu{
    position: fixed;
    bottom: 0;
}
</style>
