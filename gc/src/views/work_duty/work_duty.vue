<template>
  <div class="policy">
            <div class="policy-header">
                <!-- <router-link to="/policy/country">
                       <div class="policy-header-item">
                              <Icon type="ios-photos-outline" />
                              <p>部门</p>
                      </div>
                </router-link>
                      
                      <div class="policy-header-item">
                             <Icon type="ios-people-outline" />
                              <p>科室</p>
                      </div>
                      <div class="policy-header-item">
                              <Icon type="ios-person-outline" />
                              <p>内部</p>
                      </div> -->
                       <div class="policy-header-item left-arrow">
                             <a href="#destination"><p>目标定位</p></a>  
                       </div> 
                       <div class="policy-header-item left-arrow">
                             <a href="#department"> <p>工作思路</p></a> 
                      </div> 
                       <div class="policy-header-item">
                             <a href="#work"> <p>部门职责</p></a> 
                      </div> 
                       <div class="policy-header-item right-arrow">
                             <a href="#section"> <p>内设机构</p></a> 
                      </div> 
                       <div class="policy-header-item right-arrow">
                             <a href="#inner"> <p>科室职责</p></a> 
                      </div> 
            </div>
            <div class="router-view">
                <!-- <router-view>
               </router-view> -->
               <div class="router-view-item" :id="workType[index]" :style="{'width':(50-Math.ceil(Math.random()*10))+'%','float':(Math.random()>0.5? 'left':'right')}" v-for="(item, index) in dutyData" :key="index">
                        <H2 class="rvi-title">{{item.title}}</H2>
                        <p class="rvi-content" v-html="item.content"></p>
               </div>
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

import Server from '../../components/server'

export default {
  // name: 'home',
  components: {
  },
  data () {
    return {
      activeIndex:0,
      modal:false,
      workType:[
        'destination','department','work','section','inner'
      ],
      position:[1,25,7,12,"target_position"],
      dutyData:[
       
      ]
    }
  },
  mounted() {
    for(let v in this.workType){
      this.getMessage(this.workType[v])
    }
  },
  methods :{
    callbackCollapse(value){
    },
    async getMessage(type){
       let url = `/api/work_duty?limit=${10}&offset=${0}&type=${type}`;
      let res = await Server.getMessage(url);
      if(res.data.msg != null){
        this.dutyData.push(res.data.msg[0]);
      }
    },
    activeModal(index){
      this.modal=true
      this.activeIndex=index
    }
  }
}
</script>

<style lang="stylus" scoped>
a 
  color black
  text-decoration none
a:hover
  color #409eff
.status-img
    width 90%
    height 90%
.policy 
    text-align center
    .policy-header
        margin 1rem auto
        width  70%
        display flex 
        flex-flow row nowrap 
        justify-content space-between
        .policy-header-item
            background #58f5e6
            box-shadow 0 6px 5px 0px #cccccc
            // color  #CCC  
            padding .2rem  1rem
            font-size 1rem
            height 1.9rem
            transition all .1s linear
            position relative
        .policy-header-item:hover
            transform scale(1.05)
    .router-view
        width 80%
        margin 0 auto
        text-align center
        .router-view-item
            float left
            margin  .5rem
            padding .5rem
            box-shadow 0 5px 10px 1px #cccccc
            .rvi-content
                background #cccccc
                text-indent 1.5rem
                padding .5rem
                img 
                  width 80%!important
                  margin .5rem auto
            .rvi-title
                border-radius .2rem
                background #f2f55a

.left-arrow::before 
      content ""
      position absolute
      left -1rem
      top 0
      //  background white
      width: 0
      height: 0
      border-top: 1rem solid transparent
      border-right: 1rem solid #58f5e6
      border-bottom: .8rem solid transparent
.left-arrow::after 
      content ""
      position absolute
      right  0
      top 0
      //  background white
      width: 0
      height: 0
      border-top: 1rem solid transparent
      border-right: .5rem solid #ffffff
      border-bottom: .8rem solid transparent
.right-arrow::after 
      content ""
      position absolute
      right  -1rem
      top 0
      //  background white
      width: 0
      height: 0
      border-top: 1rem solid transparent
      border-left: 1rem solid #58f5e6
      border-bottom: .8rem solid transparent
.right-arrow::before 
      content ""
      position absolute
      left  0
      top 0
      //  background white
      width: 0
      height: 0
      border-top: 1rem solid transparent
      border-left: .5rem solid #ffffff
      border-bottom: .8rem solid transparent
</style>

