<template>
  <div class="home">
               <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem  style="visibility:hidden">子条目1</BreadcrumbItem>
                </Breadcrumb>
                
                    <div style="min-height: 600px;" >
                                
                                <Card :bordered="false" style="min-height:500px">
                                     政策法规
                                </Card>
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
</style>

