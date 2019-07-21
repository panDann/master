<template>
  <div class="country">
    <h1>广东财经大学佛山校区校园规划</h1>
    <p class="county-tip" v-show="tip">
       &larr;鼠标移至地图可放大查看
    </p>
    <div class="country-container">
      <img :src="imageUrl" class="zoom" @mouseover="tip = false" @mouseout="tip = true" alt :data-magnify-src="imageUrl" />
      <div class="checker" id="checker">
      </div>
    </div>
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
      tip:true,
      type: "three_water"
    };
  },

  mounted() {
    this.getMessage();
  },
  methods: {
    async getMessage(current=1) {
      let url = `/api/school_plan?limit=${1}&offset=${
      (current - 1) * 10
      }&type=${this.type}`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        let data = res.data.msg;
        this.imageUrl = data[0].image_url;
        this.initMagnify();
      }
    },
    initMagnify() {
      $(Blowup($, $(".country")));
      $(document).ready(function() {
        $(".zoom").blowup('checker',{
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
  width: 60%;
  margin: 2rem auto;
  overflow: hidden;
  position: relative;
  text-align: center;
  .county-tip {
    position absolute
    top 50%
    right 20%
  }
  .country-container {
    margin: 1rem 0;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;

    .zoom {
      height: calc(100vh - 200px);
      flex: 1;
      float: left;
    }
    .checker {
      margin-left .5rem
      height: calc(100vh - 200px);
      flex: 1;
    }
  }
}
</style>
