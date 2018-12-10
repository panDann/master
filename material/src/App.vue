<template>
  <div id="app" >
  
      <router-link to="/material"></router-link>
      <router-link to="/test1"></router-link>
      <router-link to="/test"></router-link>
      <router-link to="/mine"></router-link>
      <router-link to="/login"></router-link>


    <!-- <div style="max-width: ; width:100%;" class="footer-menu">
      <mu-bottom-nav :value.sync="shift" shift @change="leapRouter">
        <mu-bottom-nav-item value="/material" title="素材" icon="movies" ></mu-bottom-nav-item> 
        <mu-bottom-nav-item value="/test1" title="备选" icon="music_note"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="/test" title="备选" icon="books"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="/mine" title="我的" icon="photo"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </div>  -->
                                <router-view></router-view>    


  </div>
</template>

<script>

import Axios from 'axios'

export default {
  name: 'app',
   data () {
    return {
       


      list: [
      ],
      listMirror:[],
      pageSize:9,
      currentPage:1,      
      page:'',
      loading: false,
      shift: '/mine'

    }
  },
  computed:{
      dataRange:function(){
            if(this.list.length){
                let [...l]=this.listMirror
                return l[l.length-1].cTime.match(/\d\d-\d\d$/ig)[0]+"~"+l[0].cTime.match(/\d\d-\d\d$/ig)[0]

            }else{
              return "日期范围"
            }
      },
  },
  mounted(){
    this.getTable()
    if(this.getCookie('report_username')&&this.$route.path=='/'){
      this.$router.push('/mine')
    }
  },
  methods: {
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
      getTable(){
          this.loading=true;
          let sendStr=`/api/reports/daily_register?&page_size=${this.pageSize}`;
          Axios.get(sendStr,)
          .then((res)=>{
              this.loading=false;
              if(res.data.code==10000){
                this.list=res.data.msg
                 let [...t]=this.list
                     this.listMirror=t;
                this.page=res.data.total%this.pageSize? parseInt(res.data.total/this.pageSize)+1:parseInt(res.data.total/this.pageSize);
                // this.checkPageButton()
                console.log(this.list)
              }else{
                 alert(res.data.msg)
              }
          })
          .catch((err)=>{
              console.log(err)
          })
      },
      leapRouter(router){
        // alert(router)
        this.$router.push(router)
        if(this.$route.path=='/login'){
           this.shift='/mine'
        }else{
            this.shift=router
        }
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
