<template>
  <div class="home">
    <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.image_url"
        class="home-carousel"
      ></v-carousel-item>
    </v-carousel>
    <div class="home-bottom">
      <a href="#building_project">
        <v-btn large>
          <v-icon>book</v-icon>&nbsp;
          在建工程
        </v-btn>
      </a>
      <a href="#plan_build">
        <v-btn large>
          <v-icon>donut_large</v-icon>&nbsp;
          拟建工程
        </v-btn>
      </a>
    </div>

    <div id="building_project" class="building-project">
      <div class="building-project-item" @click="checkItem(buildingData)">
        <div>
          <h1>{{buildingData.title}}</h1>
          <p>{{buildingData.summary}}</p>
        </div>
        <img class="bpi-img" :src="buildingData.image_url" alt>
      </div>
    </div>
    <div id="plan_build" class="building-project">
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
    </div>

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
      let url = `/api/project_build?limit=${1}&offset=${0}&type=${type}`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        if (type == "building_project") {
          this.buildingData = res.data.msg[0];
        } else {
          this.planBuild = res.data.msg[0];
        }
      }
    },

    checkItem(content) {
      this.dialog = true;
      this.dialogData = content;
    }
  }
};
</script>
<style lang="stylus" scoped>
.home-carousel {
  height: calc(100vh - 8rem);
}

.home-bottom {
  width: 60%;
  margin: 0 auto;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

a {
  color: #515a6e;
  text-decoration: none;
}

a:hover {
  color: #2d8cf0;
}

.project-bottom {
  width: 60%;
  margin: 1rem auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

.building-project {
  margin: 5rem auto;
  text-align: center;
  cursor: pointer;

  .building-project-item {
    display: flex;
    flex-flow: row nowrap;
    width: 70%;
    margin: 0 auto;
    justify-content: space-around;

    p {
      font-size: 1.1rem;
    }
  }
}

.bpi-img {
  width: 30rem;
  height: 30rem;
}

.width80 {
  width: 80%;
}
</style>
