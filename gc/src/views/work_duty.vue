<template>
  <div class="home">
               <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem >子条目1</BreadcrumbItem>
                    <BreadcrumbItem>子条目2</BreadcrumbItem>
                    <BreadcrumbItem>子条目3</BreadcrumbItem>
                </Breadcrumb>
                
                    <div style="min-height: 600px;" >
                             <Card :bordered="false"
                              v-for="(item,index) in dutyData"
                             :key="index"
                             @click.native="activeModal(index)"
                              style="margin-bottom:.5rem">
                                  <p slot="title">{{item.title}}</p>
                                  <p>{{item.content}} (点击查看详情)</p>
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
           title:"职责1",
           content:"职责介绍说明"
        },
         {
           title:"职责2",
           content:"职责介绍说明"
        }, {
           title:"职责3",
           content:"职责介绍说明"
        },
         {
           title:"职责4",
           content:"职责介绍说明"
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


</style>

