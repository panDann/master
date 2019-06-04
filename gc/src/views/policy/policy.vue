<template>
  <div class="policy">
            <div class="policy-header">
                       <div :class="{'policy-header-item':true,'active-second-route':($route.name == 'policy_country')}" @click="$router.push({name:'policy_country'})">
                              <v-icon>home</v-icon>
                              <p>国家</p>
                      </div>
                      
                      <div :class="{'policy-header-item':true,'active-second-route':($route.name == 'policy_province')}" @click="$router.push({name:'policy_province'})">
                              <v-icon>assessment</v-icon>
                              <p>省市</p>
                      </div>
                      <div :class="{'policy-header-item':true,'active-second-route':($route.name == 'policy_school')}" @click="$router.push({name:'policy_school'})">
                              <v-icon>assignment</v-icon>
                              <p>学校</p>
                      </div>
                      <div :class="{'policy-header-item':true,'active-second-route':($route.name == 'policy_inner')}" @click="$router.push({name:'policy_inner'})">
                              <v-icon>alarm_add</v-icon>
                              <p>内部</p>
                      </div>
            </div>
            <div class="policy-router-view">
                         <transition name='ease-in'>
                          <router-view/>
                        </transition>
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
      dutyData:[
        {
           title:"项目1",
           content:"项目介绍说明",
           img:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
      ]
    }
  },
  methods :{
    callbackCollapse(value){
    },
    activeModal(index){
      this.modal=true
      this.activeIndex=index
    }
  }
}
</script>

<style lang="stylus" scoped>

.status-img
    width 90%
    height 90%
.policy 
    text-align center
    .policy-header
        margin 1rem auto
        width  30%
        display flex 
        flex-flow row nowrap 
        justify-content space-between
        .policy-header-item
            transition all .2s ease-in
            cursor pointer
            i 
              font-size 2rem
            p 
              font-size 1rem
        .active-second-route
            transform  scale(1.2)
            color #409eff

    .policy-router-view
        width 60%
        margin 0 auto
    
</style>

