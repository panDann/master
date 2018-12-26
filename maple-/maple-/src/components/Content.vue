<template>
      <div class="content" >
            <!-- <div class="content-username">

            </div> -->
            <div class="content-left">
                <transition-group name="content-item-tran">
                    <div v-for="v in dataList" :key="v.id" class="first-content-item" >
                        <h3>{{v.title}}</h3>
                        <p :class="{'first-content-item-div':!v.isUnfold}" v-html="v.content">
                        </p>
                        <div class="content-float-bottom">
                         <button  class="button pupple info" @click="foldContent(v,$event)">{{!v.isUnfold? "展开":"收起"}}文章</button>
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
            }
        },
        created(){
            
        },
        mounted(){
               this.controlLeftMenu()
               window.addEventListener("resize",this.controlLeftMenu)  
               if(!this.dataList.length){
                  this.$store.dispatch("getData")
               }
                  
        },
        watch:{
           
        },
        computed:{
            ...mapState({
               leftChange:"leftChange",
               dataList:state=>state.first_page.dataList,
               previewed:"previewed"
            }),
        },
        methods:{
         
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
            
            foldContent(obj){
                    obj.isUnfold=!obj.isUnfold
                    if(obj.isParsed==false){
                        this.$store.commit("commonParseCode",obj)
                        obj.content=this.previewed;
                        // obj.content=this.parseCode(obj)
                        obj.isParsed=true
                    }
                    var floatDiv=document.getElementsByClassName("content-float-bottom"),
                        floatArr=[],
                        parentArr=[]
                    var self=this;
                    for(var i=0,l=floatDiv.length;i<l;i++){
                           floatArr.push(self.getOffset(floatDiv[i]))
                           parentArr.push(self.getOffset(floatDiv[i].parentElement))
                        }
                    window.onscroll=function(){
                       
                         for(var i=0,l=parentArr.length;i<l;i++){
                             if(parentArr[i]<window.pageYOffset&&window.pageYOffset<parentArr[i]+floatArr[i]){
                                 console.log(i)
                             }
                            // console.log(parentArr[i]+200-window.pageYOffset)
                         }
                         console.log(window.pageYOffset,window.innerHeight)
                    }
                   
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


.content-float-bottom{
    padding: .2rem 2rem;
   
}
.content-float-bottom-is-fix{
    position: fixed;
    bottom: 0;
}
p{
    text-indent: 2rem;
}
.first-content-item{
    margin: .4rem 0;
    border-bottom: .5px solid rgb(150, 155, 155);
    padding: .4rem;
    border: .5px solid rgb(220, 224, 224);
    border-radius: .4rem;
}
.first-content-item:hover{
    box-shadow: 0px 1px 5px black;
}
.first-content-item-div{
     overflow: hidden;
     height: 1.5rem;
     text-overflow: ellipsis;
     white-space: nowrap;
}
</style>