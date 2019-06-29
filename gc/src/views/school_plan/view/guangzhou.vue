<template>
  <div class="country">
    <img :src="imageUrl" class="zoom" alt :data-magnify-src="imageUrl" />
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
      type: "guangzhou"
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
      $(Blowup($,$('.country')));
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
  position: relative;

 

  img {
    height: 100%;
    width: 100%;
  }
}
</style>
