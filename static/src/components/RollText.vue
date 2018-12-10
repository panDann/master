<template>
     <div>
            
            <p style="white-space:nowrap;overflow:hidden:overflow-text:ellipsis"  @mouseover="focusShow" @mouseout="hideRoll">
                <slot></slot>
            </p>
             <div style="color:snow" class="bottom-roll-text" v-show="isShowRoll" @mouseout="hideRoll" @mouseover="focusShow">
                <slot></slot>
            </div>
    </div>
</template>


<script>
export default {
    props:{
        c:String,
    },
    data(){
        return{
            cls:'',
            isShowRoll:false,
            tiemr:''
        }
    },
    mounted(){
        //   this.class? this.cls=this.class:'';
    },
    methods:{
        send(){
            // this.$emit('roll',{state:true})
        },
        hideRoll(){
            let vm=this;
          this.tiemr? clearTimeout(this.tiemr):''
           this.tiemr=setTimeout(() => {
                vm.isShowRoll=false;
            }, 2000);
        },
        focusShow(){
            this.isShowRoll=true
            clearTimeout(this.tiemr)
        }
    },
    filters:{

    },

}
</script>


<style scoped>
.bottom-roll-text{
    position: fixed;
    height: 3rem;
    bottom: 0;
    width: auto;
    /* max-width: 30rem;; */
    left: 0;
    right: 0;
    padding-left: 1rem;
    padding-right: 1rem;

    background: rgba(0, 0, 0, .7);
    text-align: center;
    line-height: 3rem;
    border-radius: .4rem .4rem 0 0;
    transition: all .3s cubic-bezier(.5,-1,.6,8);
    animation: roll .3s cubic-bezier(.5,-1,.6,8);
}
@keyframes roll {
    0%{
        transform: translateY(.1rem)
    }
    100%{
        transform: translateY(0)

    }
}

</style>
