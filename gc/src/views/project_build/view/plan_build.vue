<template>
  <div class="plan-build">
      <div class="plan-build-item" :style="{'width':index%3==0? '100%':'48%'}" v-for="(item, index) in buildingData" :key="index">
           <v-flex  >
            <v-card>
                <v-img
                :src="item.image_url"
                aspect-ratio="2.75"
                ></v-img>

                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{item.title}}</h3>
                    <div> {{ item.summary }} </div>
                </div>
                </v-card-title>
                <v-card-actions>
                <v-btn flat color="orange" @click="checkItem(item)">详情</v-btn>
                </v-card-actions>
            </v-card>
            </v-flex>
      </div> 
      <v-btn
        color="warning"
        style="float:right"
        @click="turnPage"
        v-if="buildingData.length >=10"
      >加载更多>></v-btn>
    <v-dialog style="backgroud:red" fullscreen v-model="dialog" dark width="600px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
        </v-card-actions>
        <v-flex xs12 md6 offset-md3>
          <v-card-title v-html="dialogData.title"></v-card-title>
          <v-card-text v-html="dialogData.content"></v-card-text>
        </v-flex>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import Server from "../../../components/server";

export default {
  data() {
    return {
      activeName: "plan-build",
      dialog: false,
      dialogData:{},
      currentPage:1,
      type:"plan_build",
      buildingData: [],

      modal: false
    };
  },
  watch: {
    $route: function(n, o) {
      this.activeName = n.name;
    }
  },
  mounted() {
    this.getProject()
  },
  beforeDestroy() {},
  methods: {
   

   checkItem(content) {
      this.dialog = true;
      this.dialogData = content
    },
    async getProject(current) {
      let url = `/api/project_build?limit=${10}&offset=${current? (current - 1)*10:0}&type=${this.type}`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
          let data = res.data.msg
          for (let v in data){
          this.buildingData.push(data[v]);
          }
      }
    },
    turnPage(){
      this.currentPage +=1
      this.getProject(this.currentPage)
    }
  }
};
</script>

<style  lang="stylus" scoped>
a {
  color: #515a6e;
}

a:hover {
  color: #2d8cf0;
}
.plan-build
  width 80%
  margin 0 auto
  display  flex 
  flex-flow row wrap
  justify-content flex-start
  .plan-build-item
    margin .5rem 
    padding 0
    box-sizing border-box





</style>