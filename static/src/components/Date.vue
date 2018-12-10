<template>
    <div class="date-main">
              <div class="block">
    <span class="demonstration"  style="color:snow;">{{choice}}</span>
    <el-date-picker
      v-model="value1"
      type="date"
      :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      placeholder="选择日期" @change="sendMsg">
    </el-date-picker>
  </div>
    </div>

</template>

<script>
  export default {
    data() {
      return {
        value1: '',
      };
    },
    props:['choice'],
    created(){
        
    },
    methods:{

        sendMsg(val){
            this.value1=val
            this.$emit('message',{msg:getTime(this.value1)})
        },
        
    }
  };

  function getTime(time){
    let date=new Date(time);
    let str;
    str=date.getFullYear()+'-'+(date.getMonth()+1)
        +'-'+(date.getDate());
    return str;
  }
</script>


// WEBPACK FOOTER //
// src/components/Date.vue