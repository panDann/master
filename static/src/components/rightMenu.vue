<template>
    <!-- <div class="rt-body">
        1313
    </div> -->
    <div>
        
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
    methods:{
        ...mapMutations([

        ]),
    }
}
</script>

<style scoped>
.rt-body{
    position: absolute;
    height: auto;
    width: 10rem;
    background: rgba(53, 189, 18, 0.7);
    right: 1.5rem;
    top: 15rem;
    transition:  all .5s linear; 
}
@media (max-width: 1440px) {
    .rt-body{
   
    width: 8rem;
    
}
}
</style>
