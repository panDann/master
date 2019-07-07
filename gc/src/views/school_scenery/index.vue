<template>
  <div class="item-manager">
    <div class="item-manager-container">
      <h2 style="margin-bottom:2rem">广州财经大学校园风光</h2>
      <div>
        <v-btn :flat="($route.name !='school_scenery_guangzhou')" color="primary" @click="leapRoute('school_scenery_guangzhou')">广州校区 ></v-btn>
        <v-btn :flat="($route.name !='school_scenery_three_water')" color="primary" @click="leapRoute('school_scenery_three_water')">三水校区 ></v-btn>
      </div>
      <router-view>
      </router-view>
      <!-- <v-btn color="warning" @click="turnPage" v-if="imageData.length >=10">加载更多>></v-btn> -->
    </div>
  </div>
</template>

<script>

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
    leapRoute(name) {
      this.$router.push({
        name:name
      })
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

