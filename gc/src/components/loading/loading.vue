<template>
    <div class="loading" v-if="isShow">
        <button class="loading-btn"></button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow:true
        }
    },
    
}
</script>

<style lang="stylus" scoped>
.loading
    background #409eff
    height .2rem
    position fixed
    z-index 9
    top 4rem
    width 95vw
    animation loading 2s ease-out
    .loading-btn
        position absolute
        top -.1rem
        height .25rem
        width .25rem
        border-radius 100%
        right 0
        background #ffffff
        box-shadow 0 0px 10px 5px #CCC
        animation loading-btn 3s infinite

@keyframes loading {
    0% {width:.2rem;}
}

@keyframes loading-btn {
        
    30% {
        box-shadow 0 0px 10px 10px #409eff
    }
     60% {
        box-shadow 0 0px 10px 10px pink
    }
}
</style>
