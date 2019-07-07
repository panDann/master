<template>
  <div class="home">
    <div class="home-top">
      <v-carousel hide-delimiters height="100vh">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.image_url"
          class="home-carousel"
        ></v-carousel-item>
      </v-carousel>
      <v-btn color="orange" class="home-top-btn" @click="$router.push({name:'project_build'})">
        <v-icon>book</v-icon>&nbsp;
        工程建设
      </v-btn>
    </div>
    <div class="home-bottom">
      <div
        :class="(item.style+'-item')"
        @click="checkItem(item)"
        v-for="(item, index) in buildingData"
        :key="index"
      >
        <div class="bottom-item-top">
          <h1>{{item.title}}</h1>
          <p>{{item.summary}}</p>
        </div>
        <img class="common-img bottom-item-bottom" :src="item.image_url" alt />
      </div>
      <div
        :class="(item.style+'-item')"
        @click="checkItem(item)"
        v-for="(item, index) in planBuild"
        :key="index"
      >
        <div class="bottom-item-top">
          <h1>{{item.title}}</h1>
          <p>{{item.summary}}</p>
        </div>
        <img class="common-img bottom-item-bottom" :src="item.image_url" alt />
      </div>
    </div>
    <!-- <div  class="building-project">
      <div class="building-project-item" @click="checkItem(planBuild)">
        <img class="bpi-img" :src="planBuild.image_url" alt>
        <div>
          <h1>{{planBuild.title}}</h1>
          <p>{{planBuild.summary}}</p>
        </div>
      </div>
      <v-btn
        flat
        color="warning"
        style="float:right"
        @click="$router.push({name:'project_build'})"
      >查看更多项目>></v-btn>
    </div>-->
    <v-dialog style="backgroud:red" fullscreen v-model="dialog" width="600px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
        </v-card-actions>
        <v-flex xs12 md6 offset-md3>
          <h2 v-html="dialogData.title"></h2>

          <v-expansion-panel style="margin-top:2rem" v-if="dialogData.type == 'building_project'">
              <v-expansion-panel-content v-for="(item,i) in projectStatusData" :key="i">
                <template v-slot:header>
                  <div>
                    <v-btn :color="matchStatusType(item.create_time)" flat>{{item.title}}</v-btn>
                    <v-btn :color="matchStatusType(item.create_time)" flat>{{item.create_time}}</v-btn>
                  </div>
                </template>
                <v-card>
                  <v-card-text style="margin:0 4rem" v-html="item.content"></v-card-text>
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
          <v-card-text v-html="dialogData.content"></v-card-text>
        </v-flex>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Server from "../components/server";

export default {
  data() {
    return {
      items: [],
      dialog: false,
      dialogData: {},
      buildingData: {
        title: "在建项目",
        sammary: "在建项目简介",
        img:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555425877467&di=f68e00dc709a5e524a88114c024b4bee&imgtype=jpg&src=http%3A%2F%2Fzc.tpri.org.cn%2Fzccre%2Fimages%2Flogin_slider_1.jpg"
      },
      currentStatusPage: 1,
      projectStatusData: [],
      loading: false,
      loader: null,
      planBuild: {
        title: "在建项目",
        sammary: "在建项目简介",
        img:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555425877467&di=f68e00dc709a5e524a88114c024b4bee&imgtype=jpg&src=http%3A%2F%2Fzc.tpri.org.cn%2Fzccre%2Fimages%2Flogin_slider_1.jpg"
      },
      modal: false
    };
  },
  mounted() {
    this.getMessage();
    this.getProject("building_project");
    this.getProject("plan_build");
  },
  methods: {
    async getMessage() {
      let url = `/api/home?limit=${7}&offset=${0}`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        this.items = res.data.msg;
      }
    },
    async getProject(type) {
      let url = `/api/project_build?limit=${3}&offset=${0}&type=${type}&is_topping=1`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        if (type == "building_project") {
          this.buildingData = res.data.msg;
        } else {
          this.planBuild = res.data.msg;
        }
      } else {
        this.buildingData = [];
      }
    },
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
      console.log(subTime);
      if (subTime < 86400000 * 3) return "red";
      if (86400000 * 3 < subTime < 86400000 * 7) return "green";
      if (86400000 * 7 < subTime < 86400000 * 30) return "orange";
    }
  }
};
</script>
<style lang="stylus" scoped>
.home {
  .home-top {
    width: 100%;
    margin-top: -60px;
    position: relative;
    text-align: center;

    .home-top-btn {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
    }
  }

  .home-carousel {
    min-height: calc(100vh - 0px);
    // height 100%
  }

  .home-bottom {
    margin: 1rem auto;
    width: 95%;
    text-align: center;

    img {
      border-radius: 0.5rem;
    }

    .bottom-item {
      display: flex;
      margin: 4rem 0;
      width: 50%;
      min-height: 60vh;
      margin: 1rem auto;
      align-content: center;
      cursor: pointer;
      flex-flow: column nowrap;
      justify-content: space-around;

      .bottom-item-top {
        flex: 1;
      }

      .bottom-item-bottom {
        flex: 2;
        width: 100%;
      }
    }

    .right-item {
      display: flex;
      min-height: 60vh;
      margin: 4rem 0;
      flex-flow: row nowrap;
      // box-shadow 0 0  6px 0 #cccccc
      cursor: pointer;
      align-content: center;
      align-items: center;
      justify-content: space-around;

      .bottom-item-top {
        flex: 1;
      }

      .bottom-item-bottom {
        flex: 1;
      }
    }

    .left-item {
      display: flex;
      min-height: 60vh;
      margin: 4rem 0;
      flex-flow: row nowrap;
      // box-shadow 0 0  6px 0 #cccccc
      cursor: pointer;
      align-items: center;
      align-content: center;
      justify-content: space-around;

      .bottom-item-top {
        flex: 1;
        order: 1;
      }

      .bottom-item-bottom {
        flex: 1;
        order: 0;
      }
    }
  }
}

.common-img {
  max-height: 30rem;
}

.width80 {
  width: 80%;
}
</style>
