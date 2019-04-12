<template>
  <div class="home">
    <!-- <input type="file"  @change="recordFile($event)">
    <input type="submit" name="" id="" @click="submitFile">
    <img :src="imgUrl" alt="test" v-for="t in 10" :key="t">
     -->
    <input type="text" v-model="user">
    <input type="text" v-model="pass">
    <input type="submit" value="submit" @click="authLogin">

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'


export default {
  name: 'home',
  data() {
    return {
      file:Object,
      imgUrl:require("./test.png"),
      user: "",
      pass: "",

    }
  },
  components: {
    HelloWorld
  },
  methods: {
    recordFile(event) {
      // console.log(event.target.files[0])
      this.file = event.target.files[0]
    },
    submitFile() {
        let  sendData= new FormData()
        sendData.append('file',this.file)
        axios.post("/api/file",sendData,)
             .then(res=>{
                  console.log(res)
                  if (res) {
                    this.imgUrl =  res.data
                  }
             })
    },
    authLogin(){
        let  sendData= new FormData()
        sendData.append('user',this.user)
        sendData.append('password',this.pass)
        axios.post("/api/user/login",sendData,)
             .then(res=>{
                  console.log(res)
                  if (res) {
                  }
             })
    }
  }
}
</script>
