<template>
  <div class="home">
    <div class="home-top">
      <v-carousel hide-delimiters height="calc(100vh - 140px)">
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
        
        v-for="(item, index) in buildingData"
        :key="index"
      >
        <div class="bottom-item-top">
          <h1>{{item.title}}</h1>
          <p>{{item.summary}}</p>
          <v-btn @click="checkItem(item)" flat color="primary">详情 》</v-btn>
        </div>
        <div class="bottom-item-bottom">
           <img class="common-img " :src="item.image_url" alt />
        </div>
      </div>
      <div
        :class="(item.style+'-item')"
        v-for="(item) in planBuild"
        :key="item.id"
      >
        <div class="bottom-item-top">
          <h1>{{item.title}}</h1>
          <p>{{item.summary}}</p>
          <v-btn @click="checkItem(item)" flat color="primary">详情 》</v-btn>
        </div>
        <div class="bottom-item-bottom">
        <img class="common-img " :src="item.image_url" alt />
        </div>
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
              <v-expansion-panel-content v-for="(item) in projectStatusData" :key="item.id">
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
      buildingData: [],
      currentStatusPage: 1,
      projectStatusData: [],
      loading: false,
      loader: null,
      planBuild: [],
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
    width: 80%;
    margin: 20px auto;
    position: relative;
    text-align: center;
    .home-top-btn {
      margin-top 1rem
    }
  }

  .home-carousel {
    min-height: calc(100vh - 140px);
    // height 100%
  }

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
      margin: 4rem auto;
      width: 80%;
      flex-flow: row nowrap;
      box-shadow 0 0  10px 2px #cccccc
      padding 2rem
      align-content: center;
      align-items: center;
      justify-content: space-around;

      .bottom-item-top {
        margin 0 .5rem
        flex: 1;
      }

      .bottom-item-bottom {
        flex: 1;
        width: 100%;
      }
    }

    .left-item {
      display: flex;
      min-height: 60vh;
      margin: 4rem auto;
      width: 80%;
      flex-flow: row nowrap;
      box-shadow 0 0  10px 2px #cccccc
      padding 2rem
      align-items: center;
      align-content: center;
      justify-content: space-around;

      .bottom-item-top {
        flex: 1;
        order: 1;
        margin 0 .5rem
      }

      .bottom-item-bottom {
        flex: 1;
        order: 0;
        width: 100%;
      }
    }
  }
}

.common-img {
  max-height: 30rem;
  height 100%
  width 100%
}

.width80 {
  width: 80%;
}
</style>
