<template>
  <div class="project">
    <div class="project-bottom">
            <div>在建项目</div>
           
            <div>拟建项目</div>
    </div>

    <div id="plan_build" class="building-project">
      <div class="building-project-item" @click="checkItem">
        <div>
          <h1>{{buildingData.title}}</h1>
          <p>{{buildingData.sammary}}</p>
        </div>
        <img class="bpi-img" :src="buildingData.img" alt>
      </div>
    </div>

    <v-dialog style="backgroud:red" fullscreen v-model="dialog" dark width="600px">
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
import { setTimeout } from "timers";
export default {
  data() {
    return {
      activeName: "project",
      dialog: false,
      buildingData: {
        title: "在建项目",
        sammary: "在建项目简介",
        img:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555425877467&di=f68e00dc709a5e524a88114c024b4bee&imgtype=jpg&src=http%3A%2F%2Fzc.tpri.org.cn%2Fzccre%2Fimages%2Flogin_slider_1.jpg"
      },

      modal: false
    };
  },
  watch: {
    $route: function(n, o) {
      this.activeName = n.name;
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    transfer(name) {
      // alert(name)
      this.$router.push({ name: name });
    },

    checkItem() {
      this.dialog = true;
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

.project-bottom {
  width: 60%;
  margin: 1rem auto;
  
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

.building-project {
  margin: 0 auto;
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