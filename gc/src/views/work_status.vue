<template>
  <div class="work_status">
    <div style="width:60%;margin:1rem auto;">
      <transition-group name="slide-x-reverse-transition">
  
          <v-toolbar  style="margin-top:.5rem;border-radius:.4rem;background:linear-gradient(40deg,#a2b194, #85e0cf)" v-for="(item, index) in workData" :key="index">
            <v-icon :color="createColor(item.create_time)">settings_input_antenna</v-icon>
            <v-toolbar-title>{{item.title}}</v-toolbar-title>&nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <span>{{item.create_time}}</span>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn flat color="primary" @click="checkItem(item)">详情</v-btn>
            </v-toolbar-items>
          </v-toolbar>
      </transition-group>
      <v-btn color="warning" @click="turnPage" v-if="workData.length >=10">更多动态>></v-btn>
    </div>

    <v-dialog style="backgroud:red" v-model="dialog" dark width="600px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
        </v-card-actions>
        <v-card-text v-html="dialogData.content"></v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Server from "../components/server";

export default {
  name: "home",
  components: {},
  data() {
    return {
      activeIndex: 0,
      dialog: false,
      workData: [],
      currentPage: 1,
      dialogData: {}
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    async getMessage(current) {
      let url = `/api/work_status?limit=${10}&offset=${
        current ? (current - 1) * 10 : 0
      }`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        let data = res.data.msg;
        for (let v in data) {
          this.workData.push(data[v]);
        }
      } else {
        this.$Notice("已无跟多动态");
      }
    },
    checkItem(content) {
      this.dialog = true;
      this.dialogData = content;
    },
    turnPage() {
      this.currentPage += 1;
      this.getMessage(this.currentPage);
    },
    createColor(time) {
      let timeStamp = new Date(time).getTime(),
        subTime = new Date().getTime() - timeStamp;
      console.log(subTime);
      if (subTime < 86400000 * 3) return "red";
      if (86400000 * 3 < subTime < 86400000 * 7) return "green";
      if (86400000 * 7 < subTime < 86400000 * 30) return "orange";
    }
  }
};
</script>

<style lang="stylus">
.status-img {
  width: 90%;
  height: 90%;
}
.work-item {
  margin-top .5rem
}
.search-area {
  float: right;
  position: relative;
  right: 3rem;
}
</style>

