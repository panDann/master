<template>
  <div class="work_status">
    <div style="width:60%;margin:1rem auto;">
      <transition-group name="slide-x-reverse-transition">
          <v-toolbar  
          :style="`margin-top:.5rem;border-radius:.4rem;background:hsl(${index*30},30%,90%);`" 
          @click="checkItem(item)"
          v-for="(item,index) in workData" :key="item.id">
            <v-icon :color="createColor(item.create_time)">bookmark_border</v-icon>
            <div class="work-status-title">
            <v-toolbar-title>{{item.title}}</v-toolbar-title>
            <!-- {{createSeparate(item)}} -->
            <p class="separate"></p>
            <span>{{formatTime(item.create_time)}}</span>
            </div>
           
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <!-- <v-btn flat color="primary" @click="checkItem(item)">详情</v-btn> -->
            </v-toolbar-items>
          </v-toolbar>
      </transition-group>
      <v-btn color="warning" @click="turnPage" flat v-if="workData.length >=10">更多动态>></v-btn>
    </div>
    <v-dialog style="backgroud:red"  v-model="dialog" width="60%" >
          <v-card >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
            </v-card-actions>
            <v-card-text v-html="dialogData.content" class="img-limit"></v-card-text>
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
      if (subTime < 86400000 * 3) return "red";
      if (86400000 * 3 < subTime < 86400000 * 7) return "green";
      if (86400000 * 7 < subTime < 86400000 * 30) return "orange";
    },
    formatTime(time) {
      let t = new Date(time.replace(/-/g,'\/')),
          res  = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()
      return res
    }
  }
};
</script>

<style lang="stylus">
.status-img {
  width: 90%;
  height: 90%;
}
.img-limit >>> img {
    width: 100% !important
    display none
  }
.work-item {
  margin-top .5rem
}
.search-area {
  float: right;
  position: relative;
  right: 3rem;
}
.work-status-title {
  display flex
  flex-flow row nowrap
  justify-content space-between
  align-items center
  margin 0 1rem
  width 90%
  .separate {
    height 1px
    flex 3
    margin auto 1rem
    border-top 1px dashed black
  }
}
</style>

