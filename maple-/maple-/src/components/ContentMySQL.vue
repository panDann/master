<template>
      <div class="content"  id="content-first">
            <!-- <div class="content-username">

            </div> -->
            <div class="content-left">
                <transition-group name="content-item-tran">
                    <div v-for="(v,i) in dataList" :key="v.id" class="first-content-item" >
                        <h3>{{v.title}}</h3>
                        <p :class="{'first-content-item-div':!v.isUnfold}" v-html="v.content">
                        </p>
                        <div class="content-float-bottom">
                         <button  class="button pupple info" @click="foldContent(v,i)">{{!v.isUnfold? "展开":"收起"}}文章</button>
                        </div>
                    </div>
                </transition-group>
            </div>
            <!-- <div class="content-right">

            </div> -->
      </div>
</template>
<script>
    import { mapState,mapActions } from 'vuex'
    export default {
        data () {
            return {
                isCurrentChanged:true,
            }
        },
        created(){
            
        },
        beforeRouteLeave(to,from,next){
            this.isCurrentChanged=false;
            next()
        },
        mounted(){
            //    this.$store.commit("commonContentBodyState")
               var winHeight=window.innerHeight,
                   self=this;
               window.addEventListener("scroll",()=>{
                    if(window.pageYOffset+winHeight+200>document.documentElement.scrollHeight&&self.isCurrentChanged){
                                 self.$store.dispatch("mysqlGetData")
                                 self.isCurrentChanged=false
                         }
               },false)
               if(this.isSearch) return
               if(!this.dataList.length){
                  this.$store.dispatch("mysqlGetData")
               }
                  
        },
     
        computed:{
            ...mapState({
               leftChange:"leftChange",
               dataList:state=>state.mysql_application.dataList,
               isSearch:state=>state.mysql_application.isSearch,
               currentPage:state=>state.mysql_application.currentPage,
               previewed:"previewed",
            }),
        },
        watch:{
           currentPage:function(n,o){
               this.isCurrentChanged=true
           },
           
        },
        methods:{
            
            foldContent(obj,i){
               this.$store.commit("commonContentBodyState")
                  
                    var floatDiv=document.getElementsByClassName("content-float-bottom"),
                        floatArr=[],
                        parentArr=[],
                        currentWidth=document.defaultView.getComputedStyle(floatDiv[0].parentElement,null).width||floatDiv[0].parentElement.currentStyle.width
                        obj.isUnfold=!obj.isUnfold
                        if(obj.isParsed==false){
                            this.$store.commit("commonParseCode",obj)
                            obj.content=this.previewed;
                            obj.isParsed=true
                        }// 折叠处理
                        floatDiv[i].classList.remove("content-float-bottom-is-fix")//收起时移除类
                    var self=this;
                    setTimeout(()=>{
                        for(var i=0,l=floatDiv.length;i<l;i++){
                           floatArr.push(self.getOffset(floatDiv[i]))
                           parentArr.push(self.getOffset(floatDiv[i].parentElement))
                        }
                    },0)
                    var winHeight=window.innerHeight
                    window.onscroll=function(){
                         for(var i=0,l=parentArr.length;i<l;i++){
                            if(winHeight<floatArr[i]-parentArr[i]){
                                 if(parentArr[i]+300<winHeight+window.pageYOffset&&winHeight+window.pageYOffset<floatArr[i]){
                                     if(!floatDiv[i])continue
                                     floatDiv[i].classList.add("content-float-bottom-is-fix")
                                     floatDiv[i].style.width=currentWidth
                                 }else if(floatDiv[i]){
                                     floatDiv[i].classList.remove("content-float-bottom-is-fix")
                                 }else{
                                     continue
                                 }
                             }
                         }
                        
                    };
                   
            },
          
            getOffset(el){
                var sumOffset=0
                while(el.offsetParent){
                        sumOffset+=el.offsetTop
                        el=el.offsetParent
                }
                return sumOffset
            }
      
        },
    }
</script>

<style scoped>

.content{
    background: snow;
    z-index: 0;
    position: absolute;
    margin: 3.5rem auto;
    overflow:hidden;
    border-radius: .2rem;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    height: auto;
    /* left: 0;
    right: 0; */
    /* transform: translate(-50%) */

}
.content-left{
    width: 40rem;
}
@media screen and (max-width: 988px){
    .content-left{
        width: 88%;
    }
}


</style>