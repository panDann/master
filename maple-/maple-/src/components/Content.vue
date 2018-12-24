<template>
      <div class="content" >
            <!-- <div class="content-username">

            </div> -->
            <div class="content-left">
              <div v-for="v in dataList" :key="v.title" class="first-content-item" @click="transferShwoP(v)">
              <h3>{{v.title}}</h3>
              <p :class="{'first-content-item-p':v.id}">
                 3211313
学习嘛，无非是深度和广度。首先，我们来探讨一下深度。<span style="color:#409EFF">var</span> 题主是做前端开发的，前端不就是html css js三剑客。其中，html css就不提了，剩下的不就是js的学习深度。js的深度靠什么提高？不是任何框架，也不是任何库，就是js它本身。万变不离其宗嘛，所有的库和框架，都是基于js写的。学会了和泥巴，烧砖，砌墙，就算砌不出vue react anguler那样漂亮又稳定的高楼大厦，但是自己砌个小平房什么的，还是戳卓有余的。而且，这是深入学习框架的必经之路，没有任何可以在js基础不好的情况下，写出流行的框架出来。但是，这里其实我们忽略了一个问题---那就是我们自身的因素。
              </p>
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
            //    this.dataList=this.$store.state.first_page.dataList;
            //    this.$store.state.first_page.dispatch("getData")
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
                    obj.id=!obj.id
            },
      
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
    cursor: pointer;
    box-shadow: 0px 1px 5px black;
}
.first-content-item-p{
    overflow: hidden;
    text-overflow: ellipsis;
    /* word-wrap: none;
     */
     white-space: nowrap;
}
</style>