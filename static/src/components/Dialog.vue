<template>
    <div>
            <el-button type='primary' size='mini' @mouseover.native="test" @mouseout.native="test">点击</el-button>
            <div 
               :class="{animation:animate,fix:true}"
               v-if='show'
            >animation</div>
            <el-input v-model.number="number" @keyup.native="handleNumber"></el-input>
            <div style="color:snow"> 
            {{numberAfter}}
            </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            show:false,
            animate:true,
            number:'',
            numberAfter:0,
        }
    },
    methods:{
        test(){
            this.show=!this.show
            let self=this
            setTimeout(()=>{
                self.animate=!self.animate
            },100)
        },
        handleNumber(){
            let self=this;
            if(this.numberAfter<this.number){
                setTimeout(() => {
                    self.numberAfter++
                }, 100);
                // this.handleNumber()
            }else{
                return 
            }
        }
    }
}
</script>

<style>

.animation{
    
    transform: translateY(-5px)
}
.fix{
    width:200px;
    height: 150px;
    background: #CCC;
    transition: all .3s cubic-bezier(0.68, 0.55, 0.27, 1.9);
}
</style>
