<template>
  <div class="home">
               <Breadcrumb :style="{margin: '20px 0 30px 0'}">
                    <BreadcrumbItem >子条目1</BreadcrumbItem>
                    <BreadcrumbItem>子条目2</BreadcrumbItem>
                    <BreadcrumbItem 
                      >子条目3</BreadcrumbItem>
                      <div class="search-area"> 
                               <Input placeholder="输入项目名" style="width: auto">
                                    <Icon type="ios-search" slot="prefix" />
                                </Input>&nbsp;&nbsp;
                                <Button type="primary">搜索</Button>
                      </div>
                </Breadcrumb>
                
                    <div style="min-height: 600px;" >
                        <Row>
                            <Col span="5" :offset="(index%4==0? 0:1)"
                                 v-for="(item,index) in dutyData"
                                 :key="index">
                                <Card :bordered="false"
                                      @click.native="activeModal(index)"
                                      style="margin-bottom:1.5rem">
                                    
                                      <div style="text-align:center">
                                          <img :src="item.img" class="status-img">
                                          <h3>{{item.title}}(点击查看详情)</h3>
                                          <p title="进度"> <Progress :percent="100" /></p>
                                      </div>
                                </Card>
                           </Col>
                        </Row>
                    </div>
                    <Modal v-model="modal" width="50%">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="ios-information-circle"></Icon>
                            <span>{{dutyData[activeIndex].title}}</span>
                        </p>
                        <div style="text-align:center">
                            <p>{{dutyData[activeIndex].content}}</p>
                        </div>
                        
                    </Modal>
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
      activeIndex:0,
      modal:false,
      dutyData:[
        {
           title:"项目1",
           content:"项目介绍说明",
           img:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
         {
           title:"项目2",
           content:"项目介绍说明",
           img:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        }, {
           title:"项目3",
           content:"项目介绍说明",
           img:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
         {
           title:"项目4",
           content:"项目介绍说明",
           img:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
          {
           title:"项目1",
           content:"项目介绍说明",
           img:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
         {
           title:"项目2",
           content:"项目介绍说明",
           img:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        }, {
           title:"项目3",
           content:"项目介绍说明",
           img:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
         {
           title:"项目4",
           content:"项目介绍说明",
           img:"http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        },
      ]
    }
  },
  methods :{
    callbackCollapse(value){
      console.log(value)
    },
    activeModal(index){
      this.modal=true
      this.activeIndex=index
    }
  }
}
</script>

<style lang="stylus">

.status-img
    width 90%
    height 90%
.search-area
    float right 
    position relative
    right 3rem
</style>

