<template>
  <div class="item-manager">
            <div class="item-manager-container">
                <img src="" alt="" :style="{'transform':index %2 ==0 ?'rotate(10deg)':''}" class="imc-img" v-for="(item, index) in 10" :key="index">
            </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      activeIndex: 0,
      dialog: false,
      dutyData: [
        {
          title: "项目1",
          content: "项目介绍说明",
          img:
            "http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        }
       
      ]
    };
  },
  methods: {
    
  }
};
</script>

<style lang="stylus">

.item-manager
    // height calc(100vh - 4rem)
    background #cccccc
    overflow hidden
    .item-manager-container
        width 80%
        margin 1rem auto
        position relative
        .imc-img 
           margin .5rem 
           width 30%
           height 23rem
           float left
           background red
           animation imc-img 1s ease 
@keyframes imc-img {
    0%{ transform: scale(.5)}
}
                
</style>

