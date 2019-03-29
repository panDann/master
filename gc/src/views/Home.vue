<template>
  <div class="home">
               <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem style="visibility:hidden">Home</BreadcrumbItem>
                    <!-- <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem> -->
                </Breadcrumb>
                
                    <div style="min-height: 600px;" >
                      <div class="content-top">
                     
                              <Card :bordered="false" class="content-top-left">
                                  <Carousel autoplay 
                                  v-model="activeValue" 
                                  loop @on-change="callbackCollapse" 
                                  :autoplay-speed="3000"
                                  >
                                  <CarouselItem v-for="(item,index) in imgData" :key="index">  
                                      <div class="item-carousel">
                                        <img :src="item.url" alt="">
                                      </div>
                                  </CarouselItem>
                                   </Carousel>
                              </Card>
                       
                          <Card class="content-top-right">
                                <p slot="title">
                                    <Icon type="ios-film-outline"></Icon>
                                    核心项目
                                </p>
                                <a href="#" slot="extra" @click.prevent="changeLimit">
                                    <Icon type="ios-loop-strong"></Icon>
                                    去浏览
                                </a>
                                <ul>
                                    <li class="item-li" v-for="(item,index) in itemData" :key="index">
                                        <a href="#" target="_blank">{{ item.name }}</a>
                                      
                                        <span style="float:right">
                                            <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                                            {{ item.rate }}
                                        </span>
                                    </li>
                                </ul>
                          </Card>
                       
                      </div>
                     <div class="content-bottom">
                          <Card>
                             <div class="ctb-item-carousel" >
                                        <img :class="{'active-border':index==activeValue}" :src="item.url" alt="" v-for="(item,index) in imgData" :key="index" @click="activeValue=index">
                              </div>
                          </Card>
                     </div>
                    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      activeValue:0,
      collapseValue:"",
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
      ],
      itemData:[
         {
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },
          {
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },{
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },{
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },{
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },{
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },
          {
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },
          {
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },
          {
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },
          {
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },
          {
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },
          {
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },
          {
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },
          {
                        name: '项目名称',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
          },
          
      ]
    }
  },
  methods :{
    callbackCollapse(value){
      console.log(value)
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
        height: 30rem;
.content-top
    height 30rem
    overflow hidden
    .content-top-left
        height 100%
        width 70%
        float left 
    .content-top-right
        height 100%
        width 28%
        box-sizing border-box
        margin-left 1%
        overflow-y scroll
        float right 
.content-bottom
    margin-top 1rem

.ctb-item-carousel
        width auto 
        height auto 
        display flex
        flex-flow row nowrap
        justify-content space-between
        img 
             width 15%
             height 5rem
             transition all .3s
             box-sizing border-box
             
.active-border
    //  border solid 1px red
    box-shadow 0 0 10px 5px #cccccc
    transform scale(1.1)
.item-li
  list-style  none
  // padding .5rem 0
  margin  1rem 0
  background none
.height-limit
  height 100%
  overflow-y scroll
</style>

