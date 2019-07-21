<template>
  <div class="plan-build">
      <!-- <div class="plan-build-item" :style="{'width':index%3==0? '100%':'48%'}" v-for="(item, index) in buildingData" :key="index">
           <v-flex  >
            <v-card>
                <v-img
                :src="item.image_url"
                aspect-ratio="2.75"
                ></v-img>

                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{item.title}}</h3>
                    <div> {{ item.summary }} </div>
                </div>
                </v-card-title>
                <v-card-actions>
                <v-btn flat color="orange" @click="checkItem(item)">详情</v-btn>
                </v-card-actions>
            </v-card>
            </v-flex>
      </div>  -->
    <Card :data='buildingData' />
  </div>
</template>
<script>
import Card from "../../components/card.vue";

import Server from "../../../components/server";

export default {
  components: {
    Card
  },
  data() {
    return {
      activeName: "plan-build",
      dialog: false,
      dialogData:{},
      currentPage:1,
      type:"built_project",
      buildingData: [],

      modal: false
    };
  },
  watch: {
    $route: function(n, o) {
      this.activeName = n.name;
    }
  },
  mounted() {
    this.getProject()
  },
  beforeDestroy() {},
  methods: {
   

   checkItem(content) {
      this.dialog = true;
      this.dialogData = content
    },
    async getProject(current) {
      let url = `/api/project_build?limit=${10}&offset=${current? (current - 1)*10:0}&type=${this.type}`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
          let data = res.data.msg
          for (let v in data){
            this.buildingData.push(data[v]);
          }
      }
    },
    turnPage(){
      this.currentPage +=1
      this.getProject(this.currentPage)
    }
  }
};
</script>

<style  lang="stylus" scoped>
a {
  color: #515a6e;
}

a:hover {
  color: #2d8cf0;
}

  .home-bottom {
    margin: 1rem auto;
    width: 100%;
    text-align: center;

    img {
      border-radius: 0.5rem;
    }

    .bottom-item {
      display: flex;
      margin: 4rem 0;
      width: 80%;
      min-height: 60vh;
      margin: 1rem auto;
      align-content: center;
      flex-flow: column nowrap;
      justify-content: space-around;

      .bottom-item-top {
        flex: 1;
      }

      .bottom-item-bottom {
        flex: 2;
        width: 100%;
      }
    }

    .right-item {
      display: flex;
      min-height: 60vh;
      margin: 4rem auto;
      width: 80%;
      flex-flow: row nowrap;
      box-shadow 0 0  10px 2px #cccccc
      padding 2rem
      align-content: center;
      align-items: center;
      justify-content: space-around;

      .bottom-item-top {
        flex: 1;
      }

      .bottom-item-bottom {
        flex: 1;
      }
    }

    .left-item {
      display: flex;
      min-height: 60vh;
      margin: 4rem auto;
      width: 80%;
      flex-flow: row nowrap;
      box-shadow 0 0  10px 2px #cccccc
      padding 2rem
      align-items: center;
      align-content: center;
      justify-content: space-around;

      .bottom-item-top {
        flex: 1;
        order: 1;
      }

      .bottom-item-bottom {
        flex: 1;
        order: 0;
      }
    }
  }

.common-img {
  max-height: 30rem;
  width 100%
}


</style>