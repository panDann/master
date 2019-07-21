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
      <v-btn  large class="home-top-btn" @click="$router.push({name:'project_build'})">
        <v-icon>book</v-icon>&nbsp;
        工程建设
      </v-btn>
    </div>
        <Card :data='buildingData' />
        <Card :data='planBuild' />
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
    
  </div>
</template>

<script>
import Server from "../components/server";
import Card from "./components/card.vue";

export default {
  components: {
    Card
  },
  data() {
    return {
      items: [],
      buildingData: [],
      projectStatusData: [],
      loading: false,
      loader: null,
      planBuild: [],
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
 
  }
};
</script>
<style lang="stylus" scoped>
.home {
  .home-top {
    width: 80%;
    margin: 10px auto;
    position: relative;
    text-align: center;
    .home-top-btn {
      margin-top 1rem
      letter-spacing 2px
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
