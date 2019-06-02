<template>
  <div class="item-manager">
    <div class="item-manager-container">
      <img
        :src="item.image_url"
        alt
        :style="{'transform':index %2 ==0 ?`rotate(${Math.random()*10+5}deg)`:''}"
        class="imc-img"
        v-for="(item, index) in imageData"
        :key="index"
      >
      <v-btn color="warning" @click="turnPage" v-if="imageData.length >=10">加载更多>></v-btn>

    </div>
    <div>
      <v-btn color="warning" >项目管理</v-btn>
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
    }
  }
};
</script>

<style lang="stylus">
.item-manager {
  // height calc(100vh - 4rem)
  background: #cccccc;
  overflow: hidden;
  min-height: calc(100vh - 4rem);

  .item-manager-container {
    width: 80%;
    margin: 1rem auto;
    position: relative;

    .imc-img {
      margin: 0.5rem;
      width: 30%;
      height: 23rem;
      float: left;
      background: red;
      animation: imc-img 1s ease;
    }
  }
}

@keyframes imc-img {
  0% {
    transform: scale(0.5);
  }
}
</style>

