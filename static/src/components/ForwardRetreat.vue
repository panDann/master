<template>
<div class="forward-retreat-container">
 <button  class="forward-btn" @click="back">
        <i class="el-icon-arrow-left "></i>
    </button>
    <!-- <button  class="retreat-btn" @click="forward">
        <i class="el-icon-arrow-right"></i>
    </button> -->

</div>
   
</template>


<script>
export default {
    data(){
        return {
            routers:{
                '1':'/first',
                "2-1":"/account_in",
                "2-2":"/account_out",
                "2-3":"/city_config",
                "4-1":"/transfer_in",
                "4-2":"/transfer_out",
                "4-3":"/error_handle",
                "5":"/client_message",
                "6-1":"/personal_info",
                "6-3":"/interface_docu",
                "6-4":"/commercial_manager",
                },
                test:'1'
        }
    },
    mounted(){
    },
    watch:{
    $route(before,after){
            let 
                keys=Object.keys(this.routers),
                values=Object.values(this.routers)
            this.$store.commit('modifyHeadStatus',keys[values.findIndex(x=>x==before.path)])
      }
    },
    methods:{
        back(){
              this.$router.back()
        },
        forward(){
              this.$router.go()
        }
    }

}
</script>

<style>
.forward-btn{
    border-radius: 100%;
    background: #2c3e50;
    border: none;
    color: snow;
    cursor: pointer;
    transition: all .5s;
    margin-left: 4rem;
    margin-right: .4rem;
}
.forward-btn:active{
    transform: translateX(-.9rem);
    outline:none;

}
.forward-btn:hover{
    background: #409EFF;

}
.retreat-btn{
    border-radius: 100%;
    background: #2c3e50;
    border: none;
    color: snow;
    cursor: pointer;
    transition: all .5s;
    outline: none;
}
.retreat-btn:active{
    transform: translateX(.9rem);
    outline:none;
}
.forward-retreat-container{
    position: absolute;
    top: 1rem;
}

</style>
