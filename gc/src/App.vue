<template>
  <v-app>
    <div class="gc">
      <div class="gc-nav-container">
        <div class="gc-nav">
            <div
              :class="{'gc-nav-item':true,'active-route':activeName=='work_duty'}"
              name="work_duty"
              @click="transfer('work_duty')"
            >部门职责</div>
            <!-- <router-link to="/policy"> -->
            <div
              :class="{'gc-nav-item':true,'active-route':activeName=='policy'}"
              name="policy"
              @click="transfer('policy')"
            >法规制度</div>
            <!-- </router-link> -->

            <div
              :class="{'gc-nav-item':true,'active-route':activeName=='work_status'}"
              name="work_status"
              @click="transfer('work_status')"
            >工作动态</div>

          <div
            :class="{'gc-nav-item':true,'active-route':$route.name=='home'}"
            name="home"
            @click="transfer('home')"
          >
            <!-- <Icon type="ios-paper"></Icon> -->
            <span class="home-font">广财基建处</span>
          </div>
            <div
              :class="{'gc-nav-item':true,'active-route':activeName=='school_plan'}"
              name="school_plan"
              @click="transfer('school_plan')"
            >
              <!-- <Icon type="ios-paper"></Icon> -->
              校园规划
            </div>
            <div
              :class="{'gc-nav-item':true,'active-route':activeName=='project_build'}"
              name="project_build"
              @click="transfer('project_build')"
            >
              <!-- <Icon type="ios-paper"></Icon> -->
              工程建设
            </div>
            <div
              :class="{'gc-nav-item':true,'active-route':activeName=='item_manager'}"
              name="item_manager"
              @click="transfer('item_manager')"
            >
              <!-- <Icon type="ios-paper"></Icon> -->
              项目管理
            </div>
        </div>
      </div>

      <div class="gc-app-view">
        <transition name="ease-in">
          <router-view></router-view>
        </transition>
      </div>
      <!-- <v-content>
      <HelloWorld/>
      </v-content>-->
    </div>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      activeName: "home"
    };
  },
  watch: {
    $route: function(n, o) {
      this.activeName = (n.path + "/").split("/")[1];
    }
  },
  mounted() {
    // console.log(container.style)
    // if(this.$route.path == "/"){
    //   this.$router.push({name:"home"})
    // }
  },
  methods: {
    transfer(name) {
      this.activeName = name;
      this.$router.push({ name: name });
    },
   
  }
};
</script>

<style  lang="stylus">
.home-font {
  font-size: 1.1rem;
  letter-spacing: 0.05rem;
  font-weight: 600;
}

.gc-nav-container {
  height: 4rem;
  z-index: 1;
  box-sizing border-box;
  position: sticky;
  width: 100%;
  background: #fff;
  background: linear-gradient(rgba(204,204,204,.2),rgba(255,255,255,.2)); 
  top: 0;
  overflow hidden
  box-shadow: 0 0px 6px 0px #CCC;
  line-height: 4rem;

  .gc-nav {
    display: flex;
    margin: 0 auto;
    width: 80%;
    flex-flow: row nowrap;
    cursor: pointer;
    justify-content: space-around;
    box-sizing: border-box;

    .gc-nav-left {
      width: 40%;
      display: flex;
      flex-flow: row nowrap;
      justify-content space-between
    } 
    .gc-nav-right {
      font-size 1rem
    }

    .gc-nav-item {
      display: inline-block;
      padding: 0 1rem;
      margin: -0.1rem 0;
    }

    .active-route {
      color: #409eff;
      box-sizing: border-box;
      border-bottom: 2px solid #409eff;
    }
  }
}

.gc-app-view {
  width: 100%;
  max-width: 1980px;
  margin: 0 auto;
}

.ease-in-enter-active, .ease-in-leave-active {
  transition: opacity 0.5s;
}

.ease-in-enter { /* .ease-in-leave-active below version 2.1.8 */
  opacity: 0;
  position: absolute;
}

.ease-in-leave-to {
  opacity: 0;
  position: absolute;
  transform: scale(0);
}

.trans-in-enter-active {
  transition: all 0.5s ease;
}

.trans-in-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.trans-in-enter { /* .trans-in-leave-active below version 2.1.8 */
  transform: translateX(10px);
  opacity: 0;
}

.trans-in-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.trans-out-enter-active, .trans-out-leave-active {
  transition: all 0.5s ease;
}

.trans-out-enter { /* .trans-out-leave-active below version 2.1.8 */
  transform: translateX(-20px);
  opacity: 0;
}

.trans-out-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>