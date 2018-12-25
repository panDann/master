<template>
      <div class="content" >
            <!-- <div class="content-username">

            </div> -->
            <div class="content-left">
              <div v-for="v in dataList" :key="v.id" class="first-content-item" @click="transferShwoP(v)">
                <h3>{{v.title}}</h3>
                <p :class="{'first-content-item-div':!v.isUnfold}" v-html="v.content">
                </p>
               <button  class="button pupple info" @click="foldContent(v,$event)">{{!v.isUnfold? "展开":"收起"}}文章</button>
              </div>
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
            
            transferShwoP(obj){
                    
            },
            foldContent(obj){
                    obj.isUnfold=!obj.isUnfold
                    if(obj.isParsed==false){
                        this.$store.commit("commonParseCode",obj)
                        obj.content=this.previewed;
                        // obj.content=this.parseCode(obj)
                        obj.isParsed=true
                    }
            },
            parseCode(obj){
                var temString=obj.content.toString()
                // var reCodeEnd=/<\/(J|C|G|M|H)code>/ig
                temString=temString.replace(/<(C|J|H|M|G)code>/ig,"<div class='code-div'><pre><code>")
                                .replace(/<\/(C|J|H|M|G)code>/ig,"</code></pre></div>")
                                .replace(/(var\s|func\s|function\s|let\s|const\s)/ig,"<span class='code-var-span'>$1</span>")
                                .replace(/(return\s|if\b|else\b|for\b|while\b)/ig,"<span class='code-if-span'>$1</span>")
                                
                                //    .replace(/\n/ig,"<br/>")
                                //    .replace(/\s/ig,"&nbsp;")
                temString=temString.replace(/\-/ig,"MAPLE")
                                .replace(/(?=\b\w+?:\W+)/ig,"<span class='code-css-span'>")
                                .replace(/\:/g,":</span>")
                                .replace(/MAPLE/g,"-")
                                .replace(/(\/\/.+?\n)/g,"<span class='code-comment-span'>$1</span>")
                                //    .replace(/;/g,";<br/>")
                                //    .replace(/(\{|\})/g,"$1<br/>")
            
                // if(obj.summary){
                //     temString= "<h3 class='code-summary'>简介："+obj.summary+"</h3>"+temString
                // }
                // if(obj.title){
                //     temString= "<h2 class='code-title'>"+obj.title+"</h2>"+temString
                // }
                return temString
            }
      
        },
    }
</script>

<style scoped>

.content{
    background: snow;
    z-index: 0;
    position: absolute;
    z-index: 0;
    margin: 3.5rem 0;
    overflow:hidden;
    border-radius: .2rem;
    width: 40rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    height: auto;
    left: 50%;
    transform: translate(-50%)

}
@media screen and (max-width: 988px){
    .content{
        width: 88%;
    }
}
.content-username{
    width: 200px;
    /* background: rgb(228, 225, 225); */
    margin-right: 2rem;
}
.content-left{
    width: 100%;
}
.content-right{
    width: 200px;
    /* background: rgb(236, 233, 233); */
    margin-left: 2rem;
}



h1{
    font-size: 2rem;
    font-weight: 100;
}
h2{
    font-size: 1.8rem;
    font-weight: 100;
}
h3{
    font-size: 1.6rem;
    font-weight: 100;
}
h4{
    font-size: 1.4rem;
    font-weight: 100;
}
h5{
    font-size: 1.2rem;
    font-weight: 100;
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