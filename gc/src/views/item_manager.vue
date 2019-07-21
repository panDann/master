<template>
  <div class="item-manager">
    <div class="item-manager-container">
      <h2>广东财经大学项目管理</h2>
      <div style="overflow:hidden">
        <v-btn style="float:right" flat color="primary">项目管理 ></v-btn>
        <v-btn style="float:right" flat @click="$router.push({name:'school_scenery'})" color="primary">校园风光 ></v-btn>
      </div>
      <ImageCard :image-data='imageData' />
     
    </div>
  </div>
</template>

<script>
import Server from "../components/server";
import ImageCard from "./components/img-card.vue";

export default {
  components: {
    ImageCard
  },
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
    width: 70%;
    margin: 1rem auto;
    padding: 2rem 0;
    text-align: center;
    position: relative;

    .imc-img {
      margin: 0.5rem;
      // border-radius .4rem
      float: left;
      transition transform .2s ease
      background: #ffffff;
      animation: imc-img 1s ease;
    }
    .imc-img:hover {
      transform scale(1.1)
      box-shadow 0 0 20px 1px black
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

