<template>
  <div class="work_status">

    <div style="width:60%;margin:2rem auto;">
      <v-toolbar>
    <v-icon>settings_input_antenna</v-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat
      @click="dialog = true"
      >详情</v-btn>
 
    </v-toolbar-items>
  </v-toolbar>

    
    </div>
      <v-dialog style="backgroud:red"  v-model="dialog" dark width="600px">
      <v-card>
     
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      activeIndex: 0,
      dialog: false,
      dutyData: [
        {
          title: "项目1",
          content: "项目介绍说明",
          img:
            "http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        }
       
      ]
    };
  },
  methods: {
    
  }
};
</script>

<style lang="stylus">

.status-img {
  width: 90%;
  height: 90%;
}

.search-area {
  float: right;
  position: relative;
  right: 3rem;
}

</style>

