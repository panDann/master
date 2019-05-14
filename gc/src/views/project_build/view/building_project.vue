<template>
  <div class="plan-build">
      <div class="plan-build-item" :style="{'width':index%3==0? '100%':'48%'}" v-for="(item, index) in 4" :key="index">
           <v-flex  >
            <v-card>
                <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                aspect-ratio="2.75"
                ></v-img>

                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div> {{ card_text }} </div>
                </div>
                </v-card-title>
                <v-card-actions>
                <v-btn flat color="orange">详情</v-btn>
                </v-card-actions>
            </v-card>
            </v-flex>
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
      activeName: "plan-build",
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