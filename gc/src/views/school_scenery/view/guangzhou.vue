<template>
  
      <ImageCard :image-data='imageData' />
</template>

<script>
import Server from "../../../components/server";
import ImageCard from "../../components/img-card.vue";

export default {
  components: {
    ImageCard
  },
  data() {
    return {
      currentPage: 1,
      dialog: false,
      dialogImage:'',
      imageType:'guangzhou',
      imageData: []
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    async getMessage(current) {
      let url = `/api/item_manager?limit=${30}&offset=${
        current ? (current - 1) * 10 : 0
      }&type=${this.imageType}`;
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

