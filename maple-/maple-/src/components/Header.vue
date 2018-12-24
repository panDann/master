
<template>
    <div class="header">
        <div class="header-left">
            <i class="fa fa-align-justify" @click="test" id="header-left"></i>
        </div>
        <div class="header-center">
            <ul id="header-center">
                   <li class="header-left-menu-item-pc first"><router-link to="/first">首页</router-link></li>
                   <li class="header-left-menu-item-pc web_front" ><router-link to="/web_front">web前端</router-link></li>
                   <li class="header-left-menu-item-pc golang_service"><router-link to="/golang_service">golang服务</router-link></li>
                   <li class="header-left-menu-item-pc mysql_application"><router-link to="/mysql_application">MySQL应用</router-link></li>
                   <li class="header-left-menu-item-pc about_maple"><router-link to="/about_maple">关于始主</router-link></li>
            </ul>
        </div>
        <div class="header-right">
            <form action="">
                <input type="search" class="search"  placeholder="搜索关键字"><i class="search-bar"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 30 26"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></i>
            </form>
        </div>
     <div class="loading" v-show="loading"></div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                isShowLeft:false,
                scrollStart:document.documentElement.scrollTop,
            }
        },
       computed:mapState({
            left:"leftChange",
            loading:"loading"
        }),
        mounted(){
              this.checkRouter()
              this.controlHeader()
        },
        watch:{
            $route:function(newV,oldV){
                var pcHeader=document.getElementsByClassName("header-left-menu-item-pc"),
                    path=newV.path.replace(/\//g,"");
                    for(let i=0,l=pcHeader.length;i<l;i++){
                             if(pcHeader[i].classList.contains(path)){
                                pcHeader[i].classList.add("pc-router-active")
                            }else{
                                pcHeader[i].classList.remove("pc-router-active")
                            }
                    }
                sessionStorage.routerState=newV.path;
            },
            scrollStart:function(n,o){
                // alert(1)
                // console.log(n,o)
              
                var sub=o-n,
                    headerDiv=document.getElementsByClassName('header')[0],
                    topButton=document.getElementsByClassName("top-button")[0]
                    // initailTop=document.documentElement.scrollTop||document.body.scrollTop,

                if(o==0){
                    //  headerDiv.classList.remove("header-scroll")
                    return
                }
                if(sub<0){
                     headerDiv.style.backgroundColor="rgb(188, 204, 214)";
                     topButton.classList.remove("top-button-active")
                     headerDiv.classList.add("header-scroll")
                }else{
                     headerDiv.style.backgroundColor="white";
                     headerDiv.classList.remove("header-scroll")
                     topButton.classList.add("top-button-active")
                }
                if(n==0){
                     topButton.classList.remove("top-button-active")
                }
            }
        },
       
        methods:{
            test(){
                if(this.left){
                  this.$store.commit("leftChangeState",false)
                }else{
                  this.$store.commit("leftChangeState",true)
                }
            },
            checkRouter(){
                 var routePath=this.$route.path
                 if(routePath=="/"){
                        this.$router.push("/first")
                 }
                 var pcHeader=document.getElementsByClassName("header-left-menu-item-pc"),
                    path=routePath.replace(/\//g,"");
                    for(let i=0,l=pcHeader.length;i<l;i++){
                            if(pcHeader[i].classList.contains(path)){
                                pcHeader[i].classList.add("pc-router-active")
                            }else{
                                pcHeader[i].classList.remove("pc-router-active")
                            }
                    }
            },
            controlHeader(){
                var self=this
                window.addEventListener("scroll",function(){
                    self.scrollStart=document.documentElement.scrollTop||document.body.scrollTop
                },false)
            },
            
        },
    }
</script>

<style scoped>

    .header{
         --height:3rem;
        height: 3rem;
        width: 100%;
        position: fixed;
        z-index: 999;
        line-height: 3rem;
        background: white;
        display: flex;
        color:snow;
        padding: 0 .8rem;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        transition: background-color .3s linear;
        filter:drop-shadow(0 2px 5px rgb(185, 151, 151));
        border-bottom: .5px solid rgb(219, 216, 216);
    }
    .header-right form {
        display: flex;
        flex-flow: row nowrap;
    }
    *::placeholder{
        opacity: 0.9;
        color: rgb(22, 175, 111);
    }
    .search{
        outline: none;
        border: none;
        color: rgb(45, 194, 137);
        -webkit-appearance: none;
        display: inline-block;
        background: none;
        border-radius: 0;
        border-bottom: .5px black solid;
        padding: .4rem 0;
        transition: border .5s linear;
    }
    .search-bar{
        height: 2rem;
        color:rgb(54, 190, 127);
        display: inline-block;
        width: 2rem;
    }

    .search:focus{
        border-bottom: .5px #409EFF solid;
    }
    .header-left{
        color: rgb(82, 189, 114);
    }
    .header-left-menu-item-pc a{
        text-decoration: none;
        color:snow;
    }
    .header-left-menu-item-pc:hover{
        border-bottom:.1rem solid rgb(33, 71, 196); 
    }
    .pc-router-active{
        border-bottom:.1rem solid rgb(33, 71, 196); 
    }
    .header-scroll div ul li a{
        color: rgb(12, 13, 14);
    }  
    .header div ul li a{
        color: rgb(12, 13, 14);
    } 
    
.loading{
   height: 2px;
   width: 95%;
   background: #409EFF;
   /* margin-top: 2rem; */
   position: absolute;
   left: 0;
   bottom: 0;
   transition: all 1s linear;
   animation: loading 1s linear;
}
@keyframes loading {
    0%{width: 10%;
          }
    100%{
        width: 95%;
        }
}
  
</style>