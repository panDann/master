<template>
  <div class="duty">
      <div class="duty-center">
        <button class="duty-center-header">
          目标定位
        </button>
        <p class="dch-summary">基建处工作目标：辅佐学校党政科学决策 ，尊重工程建设基本规律，推行全面精细化管理，实现校园基本建设又好快又高又稳发展</p>
        <div class="duty-center-content" :style="activeBorderColor" @click="checkItem($event)">
            <button class="dcc-item" data-id='0'  style="border-color:#f29902;" >工作思路</button>
            <button class="dcc-item"  data-id='1' style="border-color:pink;" >科室职责</button>
            <!-- <button class="dcc-item" data-id='2' style="border-color:#3eb652;" >内设机构</button> -->
            <button class="dcc-item" data-id='2' style="border-color:#4388ca;" >部门职责</button>
        </div>
      </div>
            <!-- <div class="policy-header">
             
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
               <div class="router-view-item" :id="workType[index]" :style="{'width':(50-Math.ceil(Math.random()*10))+'%','float':(Math.random()>0.5? 'left':'right')}" v-for="(item, index) in dutyData" :key="index">
                        <H2 class="rvi-title">{{item.title}}</H2>
                        <p class="rvi-content" v-html="item.content"></p>
               </div>
            </div> -->
    <v-dialog style="backgroud:red" v-model="dialog"  width="600px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
          
        </v-card-actions>
        <h2 v-html="activeContent.title" style="text-align:center"></h2>

        <v-card-text v-html="activeContent.content"></v-card-text>

      </v-card>
    </v-dialog>
              
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
      activeContent:{
        title:'',
        content:'加载中...'
      },
      dialog:false,
      activeBorderColor:{
        borderColor:''
      },
      colorList:[
        "#f49805",
        "pink",
        // "#3eb652",
        "#4388ca",
      ],
      workType:[
        'work','department','section','destination'
      ],
      position:[1,25,7,12,"target_position"],
      dutyData:[
       
      ]
    }
  },
  watch:{
    dialog(n,o){
        if(n == false) {
          this.activeBorderColor.borderColor = ''
        }
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
    },
    checkItem(e){
      let itemId =  e.target.dataset.id
          this.activeBorderColor.borderColor = this.colorList[itemId]
          setTimeout(() => {
           this.dialog = true
           this.activeContent = this.matchActiveContent(this.workType[itemId])
          }, 500);
    },
    matchActiveContent(index) {
        for(let v in this.dutyData) {
          if(this.dutyData[v].type == index){
              return this.dutyData[v]
          }
        }
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
.duty 
    text-align center
    height calc(100vh - 60px)
    position relative
    .duty-center
      position absolute
      left 0
      right 0
      bottom  0 
      top 0
      height 80%
      margin auto
      text-align center
     
      .duty-center-header
        border-bottom 2px solid black 
        font-size 1.6rem
        font-weight 700
        background snow
      .dch-summary
        width 30%
        min-height 5rem
        margin 1rem auto
        border #cccccc solid .5px
        padding .5rem 
        text-align left 
        overflow hidden
        background #cccccc
        z-index 1
        border-radius .4rem
      .duty-center-content
        height 70%
        width 30%
        display flex 
        flex-flow column nowrap
        justify-content space-around
        align-items center
        padding 1rem 0
        border-top #4388ca solid .5rem 
        border-bottom #f49805 solid .5rem 
        border-left #3eb652 solid .5rem 
        border-right pink solid .5rem 
        border-radius 100%
        margin 2rem auto
        position relative
        transition border-color .5s linear
        box-sizing border-box
        .dcc-item
          color black 
          font-size 1.4rem
          outline none
          font-weight 700
          padding .5rem 1.5rem
          border 2px solid #cccccc
          border-radius .4rem
      .duty-center-content:before 
        content ''
        width 1rem
        height 1rem
        border #cccccc solid 1px
        border-radius 100%
        position absolute
        background snow
        left 0
        right 0
        top -.75rem
        margin 0 auto
    .duty-center::after 
        content ''
        height 25% 
        position absolute
        width 1px
        left 50%
        top 8%
        background #cccccc
        z-index 0

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

