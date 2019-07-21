<template>
  <v-layout>
    <v-flex md12 xs12 sm6 >
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex v-for="(item, index) in imageData" :key="index"  d-flex>
              <v-card flat tile class="d-flex">
                <v-img
                  :src="`${item.image_url}?image=${index * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
                  :aspect-ratio='index'
                  :style="`height:10rem;width:${index*2+10}rem`"
                  class="grey lighten-2 imc-img"
                  @click="checkImage(item.image_url)"
                >
                  <template v-slot:placeholder>
                    <v-layout fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </template>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <v-dialog style="backgroud:red" v-model="dialog" dark width="600px">
      <!-- <v-card-actions>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
      </v-card-actions>-->
      <v-img :src="dialogImage" style="background:#ffffff"></v-img>
    </v-dialog>
  </v-layout>
</template>

<script>

export default {
  name: "home",
  props: {
    imageData: {
      type: Array,
      default: []
    }
  },
  
  components: {},
  data() {
    return {
      dialog: false,
      dialogImage: ""
    };
  },
  mounted(){
      
  },
  methods: {
    checkImage(url) {
      this.dialog = true;
      this.dialogImage = url;
    },
    handleData(data) {
        let arr = []
        data.forEach((element,i) => {
            
        });
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
      transition: transform 0.2s ease;
      background: #ffffff;
      animation: imc-img 1s ease;
    }

    .imc-img:hover {
      transform: scale(1.1);
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

