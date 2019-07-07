<template>
  <div class="plan-build">
    <!-- <div class="plan-build-item" :style="{'width':index%3==0? '100%':'48%'}" v-for="(item, index) in buildingData" :key="index">
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
    </div>-->
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
    </div>
    <v-btn
      :loading="loading"
      :disabled="loading"
      flat
      color="orange"
      style="float:right"
      v-if="projectStatusData.length > 9"
      @click="getProjectStatus(++currentStatusPage)"
    >
      更多动态》》
      <template v-slot:loader>
        <span>加载中...</span>
      </template>
    </v-btn>
    <v-dialog style="backgroud:red" fullscreen v-model="dialog" width="600px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
        </v-card-actions>
        <v-flex xs12 md6 offset-md3>
          <h2 v-html="dialogData.title"></h2>
          <v-expansion-panel style="margin-top:2rem">
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
            color="orange"
            v-if="projectStatusData.length > 9"
            style="float:right"
            flat
            @click="getProjectStatus(++currentStatusPage)"
          >更多动态》》</v-btn>
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
      dialogData: {},
      currentPage: 1,
      currentStatusPage: 1,
      loading: false,
      loader: null,
      type: "building_project",
      buildingData: [],
      projectStatusData: [],
      modal: false,
      projectId: ""
    };
  },
  watch: {
    $route: function(n, o) {
      this.activeName = n.name;
    }
  },
  mounted() {
    this.getProject();
  },
  beforeDestroy() {},
  methods: {
    checkItem(content) {
      this.dialog = true;
      this.dialogData = content;
      this.projectId = content.id;
      this.getProjectStatus(1);
    },
    async getProject(current) {
      let url = `/api/project_build?limit=${10}&offset=${
        current ? (current - 1) * 10 : 0
      }&type=${this.type}`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        let data = res.data.msg;
        for (let v in data) {
          this.buildingData.push(data[v]);
        }
      }
    },
    async getProjectStatus(current) {
      this.loading = true;
      let url = `/api/building_detail?limit=${10}&offset=${
        current ? (current - 1) * 10 : 0
      }&project_id=${this.projectId}`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        this.loading = false;
        let data = res.data.msg;
        for (let v in data) {
          this.projectStatusData.push(data[v]);
        }
      }
    },
    turnPage() {
      this.currentPage += 1;
      this.getProject(this.currentPage);
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

<style  lang="stylus" scoped>
a {
  color: #515a6e;
}

a:hover {
  color: #2d8cf0;
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
    width: 80%;
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

.common-img {
  max-height: 30rem;
}
</style>