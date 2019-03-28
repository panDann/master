<template>
  <div class="home">
               <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem style="visibility:hidden">Home</BreadcrumbItem>
                    <!-- <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem> -->
                </Breadcrumb>
                
                    <div style="min-height: 600px;" >
                      <div class="content-top">
                        <Row >
                        <Col span="16">
                              <Card :bordered="false">
                                  <Carousel autoplay v-model="activeValue" loop >
                                  <CarouselItem v-for="(item,index) in imgData" :key="index">  
                                      <div class="item-carousel">
                                        <img :src="item.url" alt="">
                                      </div>
                                  </CarouselItem>
                                   </Carousel>
                              </Card>
                        </Col>
                        <Col span="8">
                          <Card>
                              <Collapse v-model="value1">
                                  <Panel name="1">
                                      史蒂夫·乔布斯
                                      <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                                  </Panel>
                                  <Panel name="2">
                                      斯蒂夫·盖瑞·沃兹尼亚克
                                      <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
                                  </Panel>
                                  <Panel name="3">
                                      乔纳森·伊夫
                                      <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
                                  </Panel>
                              </Collapse>
                          </Card>
                        </Col>
                      </Row>
                      </div>
                     <div class="content-bottom">
                          <Card>
                             <div class="ctb-item-carousel" >
                                        <img :src="item.url" alt="" v-for="(item,index) in imgData" :key="index">
                              </div>
                          </Card>
                     </div>
                    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      activeValue:0,
      imgData:[
        {
           url:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
         {
           url:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        }, {
           url:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
         {
           url:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
      ]
    }
  }
}
</script>

<style lang="stylus">

.item-carousel
    width: 100%;
    height: 100%;
    // box-shadow 0px 0px 30px 10px #ccc
    img 
        width: 100%;
        height: 100%;
.content-top
    height 30%
.content-bottom
    margin-top .5rem

.ctb-item-carousel
        width auto 
        height auto 
        display flex
        flex-flow row nowrap
        justify-content space-between
        img 
             width 20%
             height 10rem
</style>

