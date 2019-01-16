
<template>
    <div class="header">
        <div class="header-left">
            <i class="fa fa-align-justify" @click="test" id="header-left"></i>
        </div>
        <div class="header-center">
            <ul id="header-center" @mouseout="checkRouter">
                   <li class="header-left-item-pc" @mouseover="slideBottomBar('/first')"><router-link to="/first">首页</router-link></li>
                   <li class="header-left-item-pc" @mouseover="slideBottomBar('/web_front')"><router-link to="/web_front">web前端</router-link></li>
                   <li class="header-left-item-pc" @mouseover="slideBottomBar('/golang_service')"><router-link to="/golang_service">golang服务</router-link></li>
                   <li class="header-left-item-pc" @mouseover="slideBottomBar('/mysql_application')"><router-link to="/mysql_application">MySQL应用</router-link></li>
                   <li class="header-left-item-pc" @mouseover="slideBottomBar('/about_maple')"><router-link to="/about_maple">关于始主</router-link></li>
                   <li class="header-item-bottom" :style="{'left':headerBottomLeft,'width':headerBottomWidth}"><router-link to=""></router-link></li>

            </ul>
        </div>
        <div class="header-right">
            <form action="">
                <input type="search" spellcheck="false" class="search" v-model="searchText"  @focus="searchBottom=true" @blur="searchBottom=false" placeholder="搜索关键字" @keypress="searchContent($event)" ><i class="search-bar" @click="searchContent('click')"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 30 26"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></i>
                <span :class="{'search-bottom':searchBottom}"></span>
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
                currentRoute:"",
                searchText:"",
                floatDiv:"",//App.vue div
                floatArr:[],
                parentArr:[],
                headerItem:[
                    {name:"/first",
                     id:0,
                     width:"",
                     offsetX:""                   
                    },
                    {name:"/web_front",
                     id:1,
                     width:"",
                     offsetX:""                   
                    },
                    {name:"/golang_service",
                     id:2,
                     width:"",
                     offsetX:""                   
                    },
                    {name:"/mysql_application",
                     id:3,
                     width:"",
                     offsetX:""                   
                    },
                    {name:"/about_maple",
                     id:4,
                     width:"",
                     offsetX:""                   
                    },
                ],
                searchBottom:false,
                headerBottomLeft:"",
                headerBottomWidth:"",
                scrollStart:document.documentElement.scrollTop,
            }
        },
       computed:{
           ...mapState({
            left:"leftChange",
            loading:"loading",
            contentBodyChanged:"contentBodyChanged"
        })},
        mounted(){
              this.initialFloatDiv()
              this.checkRouter()
              this.controlHeader()
            //   this.floatDiv=document.getElementsByClassName("content-float-bottom")
        },
        watch:{
            $route:{
                handler(newV,oldV){
                        this.currentRoute=newV.path;
                        this.initialFloatDiv()
                },
                immediate:true,
            },
            scrollStart:function(n,o){
                var sub=o-n,
                    headerDiv=document.getElementsByClassName('header')[0],
                    topButton=document.getElementsByClassName("top-button")[0]
                if(o==0){
                    return
                }
                if(sub<0){
                    //  headerDiv.style.backgroundColor="rgb(188, 204, 214)";
                     topButton.classList.remove("top-button-active")
                     headerDiv.classList.add("header-scroll")
                }else{
                    //  headerDiv.style.backgroundColor="white";
                     headerDiv.classList.remove("header-scroll")
                     topButton.classList.add("top-button-active")
                }
                if(n==0){
                     topButton.classList.remove("top-button-active")
                }
            },
            contentBodyChanged:function(n,o){
                        this.initialFloatDiv()
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
                this.slideBottomBar(this.$route.path)
                //  this.currentRoute=this.$route.path;
                //  var routePath=this.$route.path
                //  if(routePath=="/"){
                //         this.$router.push("/first")
                //  }
          
            },
            searchContent(e){
                var key=e.keyCode
                if(key=="13"||e=="click"){
                    typeof e=="object"? e.preventDefault():""
                    if(!this.searchText){
                        this.$store.commit("handleError","搜索内容不能为空")
                        return
                    }
                    this.$router.push("/first")
                    this.$store.commit("firstStartSearch",this.searchText.replace(/\s/,"|"))
                    this.$store.dispatch("firstGetData")
                }

            },
            controlHeader(){
                var self=this
                window.addEventListener("scroll",function(){
                    self.scrollStart=document.documentElement.scrollTop||document.body.scrollTop
                  
                },false)
            },
            initialFloatDiv(){
                        this.floatDiv=document.getElementsByClassName("content-float-bottom")
                        var headerItem=document.getElementsByClassName("header-left-item-pc"),
                            self=this;
                       setTimeout(()=>{
                            for(var i=0,l=self.floatDiv.length;i<l;i++){
                                self.floatArr.push(self.getOffset(self.floatDiv[i]))
                                self.parentArr.push(self.getOffset(self.floatDiv[i].parentElement))
                            }
                        },0)
                         for(var i=0,l=headerItem.length;i<l;i++){
                             this.headerItem[i].width=this.getCurrentStyle(headerItem[i],"width")
                             this.headerItem[i].offsetX=headerItem[i].offsetLeft// get current width and offsetX
                            }
            },
            slideBottomBar(name){
                 for(var i=0,l=this.headerItem.length;i<l;i++){
                            if(this.headerItem[i].name==name){
                                this.headerBottomLeft=this.headerItem[i].offsetX-10+"px"
                                this.headerBottomWidth=this.headerItem[i].width
                            }
                    }
            },
            getOffset(el){
                var sumOffset=0
                while(el.offsetParent){
                        sumOffset+=el.offsetTop
                        el=el.offsetParent
                }
                return sumOffset
            },
            getCurrentStyle(el,attri){
                var res = document.defaultView.getComputedStyle(el,null)[attri]||el.currentStyle[attri]
                if(res){
                    return res
                }else{
                    return null
                }
            }
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
        /* filter:drop-shadow(0 2px 5px rgb(185, 151, 151)); */
        box-shadow: 0 2px 10px rgb(185, 151, 151);
        border-bottom: .5px solid rgb(219, 216, 216);
    }
    .header-right form {
        display: flex;
        position: relative;
        flex-flow: row nowrap;
    }
    *::placeholder{
        opacity: 0.9;
        color: rgb(179, 189, 184);
    }
    .search{
        outline: none;
        border: none;
        color: rgb(45, 194, 137);
        -webkit-appearance: none;
        display: inline-block;
        background: none;
        border-radius: 0;
        font-size: 16px;
        border-bottom: .5px rgb(160, 152, 152) solid;
        padding: .2rem 0;
        width: 80%;
        transition: border .5s linear;
    }
    .search-bottom{
        /* content: "1231"; */
        display: inline-block;
        height: 5%;
        width:80%;
        bottom: 0;
        left: 0;
        position: absolute;
        background: rgb(23, 26, 25);
        animation: search-bottom .3s linear;
    }
    @keyframes search-bottom {
        0%{transform: scale(.1)}
        100%{transform: scale(1)}

    }
    .search-bar{
        height: 2rem;
        color:rgb(54, 190, 127);
        display: inline-block;
        width: 2rem;
    }
   
    .header-left{
        color: rgb(82, 189, 114);
    }
    .header-left-item-pc a{
        text-decoration: none;
        color:snow;
    }
    .header-center{
        position: relative;
    }
    .header-item-bottom{
        height: .2rem;
        position: absolute;
        bottom: 0;
        /* clip-path:polygon(50% -100%, 100% 50%, 50% 50%, 0 50%); */
        /* clip-path: polygon(50% -100%, 100% 100%, 100% 100%, -0% 100%); */
        transition: all .2s linear;
        border-radius: .2rem;
        background: #409EFF
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