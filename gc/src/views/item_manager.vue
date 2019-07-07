<template>
  <div class="item-manager">
    <div class="item-manager-container">
      <h2>广东财经大学项目管理</h2>
      <div>
        <v-btn flat @click="$router.push({name:'school_scenery'})" color="primary">校园风光 ></v-btn>
        <v-btn flat color="primary">项目管理 ></v-btn>
      </div>
      <v-layout>
        <v-flex md10 xs12 sm6 offset-md1>
          <v-card>
            <v-container grid-list-sm fluid>
              <v-layout row wrap>
                <v-flex v-for="(item, index) in imageData" :key="index" xs3 d-flex>
                  <v-card flat tile class="d-flex">
                    <v-img
                      :src="`${item.image_url}?image=${index * 5 + 10}`"
                      :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
                      aspect-ratio="1"
                      class="grey lighten-2 imc-img"
                      @click="checkImage(item.image_url)"
                    >
                      <template v-slot:placeholder>
                        <v-layout fill-height align-center justify-center ma-0>
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                      </template>
                    </v-img>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
         <v-dialog style="backgroud:red" v-model="dialog" dark width="600px">
        <!-- <v-card-actions>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
          
        </v-card-actions> -->
        <v-img :src="dialogImage"></v-img>

    </v-dialog>
      <!-- <v-btn color="warning" @click="turnPage" v-if="imageData.length >=10">加载更多>></v-btn> -->
    </div>
  </div>
</template>

<script>
import Server from "../components/server";

export default {
  name: "home",
  components: {},
  data() {
    return {
      currentPage: 1,
      dialog: false,
      dialogImage:'',
      imageData: []
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    async getMessage(current) {
      let url = `/api/item_manager?limit=${10}&offset=${
        current ? (current - 1) * 10 : 0
      }`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        let data = res.data.msg;
        for (let v in data) {
          this.imageData.push(data[v]);
        }
      } else {
        this.$Notice("已无更多图片");
      }
    },
    turnPage() {
      this.currentPage += 1;
      this.getMessage(this.currentPage);
    },
    checkImage(url) {
      this.dialog = true
      this.dialogImage = url;
    }
  }
};
</script>

<style lang="stylus">
.item-manager {
  // height calc(100vh - 4rem)
  // background: #cccccc;
  overflow: hidden;
  min-height: calc(100vh - 4rem);

  .item-manager-container {
    width: 80%;
    margin: 1rem auto;
    padding: 2rem 0;
    text-align: center;
    position: relative;

    .imc-img {
      margin: 0.5rem;
      // border-radius .4rem
      float: left;
      background: #cccccc;
      animation: imc-img 1s ease;
    }

    .img1 {
      width: 10rem;
      height: 20rem;
    }
  }
}

@keyframes imc-img {
  0% {
    transform: scale(0.5);
  }
}
</style>

