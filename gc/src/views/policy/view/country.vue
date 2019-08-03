<template>
  <div class="country">
    <v-expansion-panel
    >
      <v-expansion-panel-content v-for="(item,i) in itemData" :key="i" >
        <template v-slot:header>
          <div>{{item.title}}</div>
        </template>
          <v-card>
          <v-card-text v-html="item.content" class="img-limit">
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-btn flat color="warning" v-if="itemData.length >=10" @click="togglePage" >更多法规》》</v-btn>
  </div>
</template>
<script>

import Server from "../../../components/server.js";

export default {
  data() {
    return {
      type: "country",
      itemData:[],
      currentPage:1
    };
  },
  mounted(){
      this.turnPage(1)
  },
  methods: {
    async turnPage(page) {
      let url = `/api/policy?limit=${10}&offset=${(page - 1) * 10}&type=${
        this.type
      }`;
      let res = await Server.getMessage(url);
      if (res.data.msg != null) {
        this.itemData = res.data.msg;
      }
    },
    togglePage(){
        this.currentPage +=1
        this.turnPage(this.currentPage)
    }
  }
};
</script>
<style lang="stylus" scoped>
.country {
  text-align: left;
}
.img-limit >>> img {
    width: 100% !important
  }
</style>
