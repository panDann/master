<template>
  <div class="home-bottom">
    <div :class="(item.style+'-item')" v-for="(item, index) in data" :key="index">
      <div class="bottom-item-top" >
        <h1 class="font-weight-bold ">{{item.title}}</h1>
        <p>{{item.summary}}</p>
        <v-btn @click="checkItem(item)" flat color="primary">详情 》</v-btn>
      </div>
      <div class="bottom-item-bottom">
        <img class="common-img" :src="item.image_url" alt />
      </div>
    </div>
    <v-dialog style="backgroud:red"  v-model="dialog"  width="80%">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
        </v-card-actions>
        <v-flex xs12 md8 offset-md2>
          <h2 v-html="dialogData.title"></h2>

          <v-expansion-panel style="margin-top:2rem" v-if="dialogData.type == 'building_project'">
            <v-expansion-panel-content  :style="`background:hsl(${index*20},30%,90%);`" v-for="(item,index) in projectStatusData" :key="item.id">
              <template v-slot:header>
                <div>
                  <v-btn :color="matchStatusType(item.create_time)" flat>{{item.title}}</v-btn>
                  <v-btn style="float:right" :color="matchStatusType(item.create_time)" flat>{{formatTime(item.create_time)}}</v-btn>
                </div>
              </template>
              <v-card>
                <v-card-text  v-html="item.content"  class="img-limit"></v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-btn
            :loading="loading"
            :disabled="loading"
            flat
            color="orange"
            style="float:right"
            v-if="projectStatusData.length > 9"
            @click="getProjectStatus(++currentStatusPage)"
          >更多动态》》</v-btn>
          <!-- <v-btn color="orange" style="float:right" flat ></v-btn> -->
          <v-card-text v-html="dialogData.content" class="img-limit"></v-card-text>
        </v-flex>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import Server from "@/components/server";

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentStatusPage: 1,
      dialog: false,
      dialogData: {},
      projectStatusData: []
    };
  },
  methods: {
    async getProjectStatus(current) {
      this.loading = true;
      let url = `/api/building_detail?limit=${10}&offset=${
        current ? (current - 1) * 10 : 0
      }&project_id=${this.projectId}`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        let data = res.data.msg;
        this.loading = false;
        for (let v in data) {
          this.projectStatusData.push(data[v]);
        }
      }
    },
    checkItem(content) {
      this.dialog = true;
      this.dialogData = content;
      if (content.type == "building_project") {
        this.projectId = content.id;
        this.getProjectStatus(1);
      }
    },
    matchStatusType(time) {
      let timeStamp = new Date(time).getTime(),
        subTime = new Date().getTime() - timeStamp;
      if (subTime < 86400000 * 3) return "red";
      if (86400000 * 3 < subTime < 86400000 * 7) return "green";
      if (86400000 * 7 < subTime < 86400000 * 30) return "orange";
    },
    formatTime(time) {
      let t = new Date(time),
          res  = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()
      
      return res
    }
  }
};
</script>

<style lang="stylus" scoped>
.home-bottom {
  margin: 1rem auto;
  width: 100%;
  text-align: center;

  img {
    border-radius: 0.5rem;
  }

  .bottom-item {
    display: flex;
    margin: 4rem 0;
    width: 80%;
    min-height: 60vh;
    margin: 1rem auto;
    align-content: center;
    flex-flow: column nowrap;
    justify-content: space-around;
    box-shadow: 0 0 10px 2px #cccccc;
    border-radius .4rem

    .bottom-item-top {
      flex: 2;
      padding 1rem
      letter-spacing 1px

    }

    .bottom-item-bottom {
      flex: 5;
      width: 100%;
      padding .5rem 1rem
    }
  }

  .right-item {
    display: flex;
    min-height: 60vh;
    margin: 4rem auto;
    width: 80%;
    flex-flow: row nowrap;
    box-shadow: 0 0 10px 2px #cccccc;
    border-radius .4rem
    padding: 1rem;
    align-content: center;
    align-items: center;
    justify-content: space-around;

    .bottom-item-top {
      margin: 0 0.5rem;
      letter-spacing 1px
      flex: 1;
    }

    .bottom-item-bottom {
      flex: 1;
      width: 100%;
      align-self: stretch;
    }
  }

  .left-item {
    display: flex;
    min-height: 60vh;
    margin: 4rem auto;
    width: 80%;
    flex-flow: row nowrap;
    box-shadow: 0 0 10px 2px #cccccc;
    border-radius .4rem
    padding: 1rem;
    align-items: center;
    align-content: center;
    justify-content: space-around;

    .bottom-item-top {
      flex: 1;
      letter-spacing 1px
      order: 1;
      margin: 0 0.5rem;
    }

    .bottom-item-bottom {
      flex: 1;
      order: 0;
      width: 100%;
      align-self: stretch;
    }
  }
}

.common-img {
  max-height: 30rem;
  height: 100%;
  width: 100%;
}
.img-limit >>> img {
    width: 100% !important
  }
@font-face {
    font-family: xingshu;
    src: url("../../assets/font.ttf");
}
</style>
