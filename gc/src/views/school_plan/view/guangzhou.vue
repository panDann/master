<template>
  <div class="country">
    <img :src="imageUrl" alt>
  </div>
</template>
<script>
import Server from "../../../components/server";

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
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.country {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: red;

  img {
    height: 100%;
    width: 100%;

  }

}
</style>
