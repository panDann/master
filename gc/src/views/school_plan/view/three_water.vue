<template>
  <div class="country">
    <img :src="imageUrl" alt class="zoom" />
  </div>
</template>
<script>
import Server from "../../../components/server";
import Blowup from "./blowup.js";

export default {
  data() {
    return {
      value1: "1",
      imageUrl: "",
      type: "three_water"
    };
  },
  mounted() {
    this.getMessage();
  },
  methods: {
    async getMessage(current) {
      let url = `/api/school_plan?limit=${1}&offset=${
        current ? (current - 1) * 10 : 0
      }&type=${this.type}`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        let data = res.data.msg;
        this.imageUrl = data[0].image_url;
        this.initMagnify();
      }
    },
    initMagnify() {
      $(Blowup);
      $(document).ready(function() {
        $(".zoom").blowup({
          width: 250,
          height: 250
        });
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.country {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #cccccc;

  img {
    height: 100%;
    display:block;
    width: 100%;
  }
}
</style>
