<template>
    <div>
    <v-snackbar
      v-model="snackbar"
      :bottom="true"
      :left="true"
      :timeout="timeout"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        text
        @click="snackbar = false"
      >
        关 闭
      </v-btn>
    </v-snackbar>
    </div>
</template>
<script>
export default {
    data(){
      return{
        text:"",
        snackbar:false,
        timeout:3000
      }
    }
}
</script>
