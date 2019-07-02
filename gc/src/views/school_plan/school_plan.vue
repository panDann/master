<template>
  <div class="policy">
                      <div :style="{'width':active? '5%':'50%','opacity':($route.name=='school_plan_three_water')? '.5':'1'}" class="policy-header-left" @click="leapRoute('school_plan_guangzhou')">
                            <div class="phl-item">
                                <v-icon>room</v-icon>
                                <p>广州</p>
                            </div>
                      </div>
                      <div :style="{'width':active? '5%':'50%','opacity':($route.name=='school_plan_guangzhou')? '.5':'1'}" class="policy-header-right" @click="leapRoute('school_plan_three_water')">
                             <div class="phr-item">
                                <v-icon>donut_small</v-icon>
                                <p>三水</p>
                             </div>
                      </div>
                      
                     
            <div class="router-view">
                <router-view>
               </router-view>
            </div>
                    <!-- <Modal v-model="modal" width="50%">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="ios-information-circle"></Icon>
                            <span>{{dutyData[activeIndex].title}}</span>
                        </p>
                        <div style="text-align:center">
                            <p>{{dutyData[activeIndex].content}}</p>
                        </div>
                        
                    </Modal> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  // name: 'home',
  components: {
  },
  data () {
    return {
      activeIndex:0,
      modal:false,
      active:false,
      dutyData:[
        {
           title:"项目1",
           content:"项目介绍说明",
           img:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
      ]
    }
  },
  mounted() {
    setTimeout(() => {
        this.active = true 
        this.$router.push({name:"school_plan_guangzhou"})
    }, 1000);
  },
  methods :{
    callbackCollapse(value){
    },
    activeModal(index){
      this.modal=true
      this.activeIndex=index
    },
    leapRoute(name){
      this.active = true
      this.$router.push({name:name})
    }
  }
}
</script>

<style lang="stylus" scoped>

.policy 
    position relative
    height calc(100vh - 4rem)
    // display flex
    // flex-flow row nowrap
    // justify-content space-between
    .policy-header-left
            z-index 1
            position absolute
            cursor pointer
            top 0
            left 0
            text-align center
            background #58f5e6
            transition all .2s linear
            height 100%
            width 50%
            .phl-item
                position relative
                top 40%
                i 
                  font-size  2rem
                p
                  font-size 1rem

                // right  20%
    .policy-header-right
            z-index 1
            right 0
            top 0
            cursor pointer
            position absolute
            text-align center
            background #58f5e6
            transition all .2s linear
            height 100%
            width 50%
            .phr-item
                position relative
                top 40%
                i 
                  font-size  2rem
                p
                  font-size 1rem

    .router-view
       z-index 0
       width 60%
       margin auto 
       height 70vh
       position absolute
       top 0
       bottom 0
       left 0
       overflow hidden
       right 0
       border-radius .5rem
       box-shadow 0 0px 20px 10px #cccccc
     
.leap-bottom
    // display none
    position relative
    top 1vh
    // background red
.width10
    width 10%
</style>

