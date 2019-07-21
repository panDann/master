<template>
  <div class="school">
    <!-- <div :style="{'width':active? '5%':'50%','opacity':($route.name=='school_plan_three_water')? '.5':'1'}" class="policy-header-left" >
                            <div class="phl-item">
                                <v-icon>room</v-icon>
                                <p>广州</p>
                            </div>
                      </div>
                      <div :style="{'width':active? '5%':'50%','opacity':($route.name=='school_plan_guangzhou')? '.5':'1'}" class="policy-header-right" >
                             <div class="phr-item">
                                <v-icon>donut_small</v-icon>
                                <p>三水</p>
                             </div>
                      </div>
    -->
    <div class="shcool-container" v-show="$route.name=='school_plan'">
      <div class="cs-item sc-left">
        <h1>广州校区</h1>
        <v-btn flat color="primary" @click="leapRoute('school_plan_guangzhou')">点击查看 》</v-btn>
        <v-img :src="require('@/assets/primary.jpg')"></v-img>
      </div>
      <div class="cs-item sc-right">
        <h1>三水校区</h1>
        <v-btn flat color="primary" @click="leapRoute('school_plan_three_water')">点击查看 》</v-btn>
        <v-img :src="require('@/assets/primary.jpg')"></v-img>
      </div>
    </div>

    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  // name: 'home',
  components: {},
  data() {
    return {
      activeIndex: 0,
      modal: false,
      active: false,
      dutyData: [
        {
          title: "项目1",
          content: "项目介绍说明",
          img:
            "http://jjc.gdufe.edu.cn/_upload/article/images/07/55/1612f0a44baabbcbb1ee3406f6f4/3e48c9d0-1f93-46ec-b29b-f930ffd28960.jpg"
        }
      ]
    };
  },
  mounted() {
    console.log
    // setTimeout(() => {
    //     this.active = true
    //     this.$router.push({name:"school_plan_guangzhou"})
    // }, 1000);
  },
  methods: {
    callbackCollapse(value) {},
    activeModal(index) {
      this.modal = true;
      this.activeIndex = index;
    },
    leapRoute(name) {
      this.active = true;
      this.$router.push({ name: name });
    }
  }
};
</script>

<style lang="stylus" scoped>
.school {
  .shcool-container {
    width: 80%;
    margin: 2rem auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }

  .cs-item {
    flex: 1;
    text-align: center;
    margin: 1rem 0.5rem;
  }
}

.width10 {
  width: 10%;
}
</style>

