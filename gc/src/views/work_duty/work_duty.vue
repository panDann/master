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
                             <a href="#target_position"><p>目标定位</p></a>  
                       </div> 
                       <div class="policy-header-item left-arrow">
                              <p>工作思路</p>
                      </div> 
                       <div class="policy-header-item">
                              <p>部门职责</p>
                      </div> 
                       <div class="policy-header-item right-arrow">
                              <p>内设机构</p>
                      </div> 
                       <div class="policy-header-item right-arrow">
                              <p>科室职责</p>
                      </div> 
            </div>
            <div class="router-view">
                <!-- <router-view>
               </router-view> -->
               <div class="router-view-item" :id="position[index]" :style="{'width':(50-Math.ceil(Math.random()*10))+'%','float':(Math.random()>0.5? 'left':'right')}" v-for="(item, index) in 5" :key="index">
                        <H2 class="rvi-title">46465</H2>
                        <p class="rvi-content">基建处工作目标：辅佐学校党政科学决策 ，尊重工程建设基本规律，推行全面精细化管理，实现     一、贯彻执行国家、省、市有关基本建设的法律、法规和方针政策，严格按基本建设程序和技术规范开展基建项目管理工作，基建项目包括总投资50万元以上（含50万元）的校园规划和新建、改建、扩建、水电安装及园林景观等工程以及总投资100万元以上（含100万元）的装修、修缮工程。
    二、根据学校发展目标要求，组织编制、调整、报批校园基本建设总体规划，组织编制学校中长期基本建设规划、年度基本建设计划和预算方案等，保障学校可持续发展的需要。
    三、组织编制基建项目建议书、可行性研究报告，设计任务书等文件，并办理各类报建审批手续。
    四、组织做好基建项目投资估算、设计概算、工程量清单及预算编制、合同签订等工作，审核并办理各类工程款项支付申请手续；配合相关部门做好基建项目竣工结算、决算和后评价等工作，严格进行工程造价的全过程控制。
    五、按照“公开、公平、公正”原则，向相关部门申请基建项目招标工作。
    六、组织做好基建项目施工前场地准备及施工现场管理工作，确保工程质量、进度与安全。
    七、组织做好基建项目竣工验收和固定资产移交、办理各类专业验收和备案等工作，并做好保修期内工程质量跟踪与协调处理工作。
    八、负责各类基建报表的统计、核算和报送，负责各类工程项目技术档案的收集、整理、建档和归档工作。
    九、对于代建或共建方式管理的项目，根据上级政策及职责分工，做好相关工作。
    十、完成学校交办的其它工作。
校园基本建设又好快又高又稳发展。</p>
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

export default {
  // name: 'home',
  components: {
  },
  data () {
    return {
      activeIndex:0,
      modal:false,
      position:[1,25,7,12,"target_position"],
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
a 
  color black
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

