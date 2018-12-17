<template>
    <div >
       <!-- <transition name="header-left-menu-tran"> -->
                <div class="header-left-menu" v-show="left" @click="cancelBubble($event)">
                   <span >1313</span> 
                </div>
      <!-- </transition> -->
      <div class="content">
              <h1>h1</h1>
              <p>
                  学习嘛，无非是深度和广度。首先，我们来探讨一下深度。题主是做前端开发的，前端不就是html css js三剑客。其中，html css就不提了，剩下的不就是js的学习深度。js的深度靠什么提高？不是任何框架，也不是任何库，就是js它本身。万变不离其宗嘛，所有的库和框架，都是基于js写的。学会了和泥巴，烧砖，砌墙，就算砌不出vue react anguler那样漂亮又稳定的高楼大厦，但是自己砌个小平房什么的，还是戳卓有余的。而且，这是深入学习框架的必经之路，没有任何可以在js基础不好的情况下，写出流行的框架出来。但是，这里其实我们忽略了一个问题---那就是我们自身的因素。
                  学习嘛，无非是深度和广度。首先，我们来探讨一下深度。题主是做前端开发的，前端不就是html css js三剑客。其中，html css就不提了，剩下的不就是js的学习深度。js的深度靠什么提高？不是任何框架，也不是任何库，就是js它本身。万变不离其宗嘛，所有的库和框架，都是基于js写的。学会了和泥巴，烧砖，砌墙，就算砌不出vue react anguler那样漂亮又稳定的高楼大厦，但是自己砌个小平房什么的，还是戳卓有余的。而且，这是深入学习框架的必经之路，没有任何可以在js基础不好的情况下，写出流行的框架出来。但是，这里其实我们忽略了一个问题---那就是我们自身的因素。学习嘛，无非是深度和广度。首先，我们来探讨一下深度。题主是做前端开发的，前端不就是html css js三剑客。其中，html css就不提了，剩下的不就是js的学习深度。js的深度靠什么提高？不是任何框架，也不是任何库，就是js它本身。万变不离其宗嘛，所有的库和框架，都是基于js写的。学会了和泥巴，烧砖，砌墙，就算砌不出vue react anguler那样漂亮又稳定的高楼大厦，但是自己砌个小平房什么的，还是戳卓有余的。而且，这是深入学习框架的必经之路，没有任何可以在js基础不好的情况下，写出流行的框架出来。但是，这里其实我们忽略了一个问题---那就是我们自身的因素。学习嘛，无非是深度和广度。首先，我们来探讨一下深度。题主是做前端开发的，前端不就是html css js三剑客。其中，html css就不提了，剩下的不就是js的学习深度。js的深度靠什么提高？不是任何框架，也不是任何库，就是js它本身。万变不离其宗嘛，所有的库和框架，都是基于js写的。学会了和泥巴，烧砖，砌墙，就算砌不出vue react anguler那样漂亮又稳定的高楼大厦，但是自己砌个小平房什么的，还是戳卓有余的。而且，这是深入学习框架的必经之路，没有任何可以在js基础不好的情况下，写出流行的框架出来。但是，这里其实我们忽略了一个问题---那就是我们自身的因素。

                    作者：陈随易
                    链接：https://www.zhihu.com/question/67596091/answer/511095954
                    来源：知乎
                    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
              </p>
      </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
             
            }
        },
        props:["left"],// 控制左侧菜单
        created(){
            
        },
        mounted(){
               this.controlLeftMenu()
               window.addEventListener("resize",this.controlLeftMenu)  
              
        },
        watch:{
            left:function(newV,oldV){
                //  if(newV){
                //     document.body.style.overflow="hidden"
                //  }else{
                //     document.body.style.overflow="auto"
                //  }
            }
        },
        methods:{
        
            leftChange(val){
                this.isShowLeft=val
                if(val){
                    alert(1)
                    document.body.style.overflow="hidden"
                }
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
            cancelBubble(e){
                // var e=e||window.event
                // e.preventDefault()
                // e.stopPropagation()
                // e.cancelBubble=true;
                // return false
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
    width: 80%;
    height: auto;
    left: 50%;
    transform: translate(-50%)

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
</style>