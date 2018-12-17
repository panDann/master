<template>
    <div class="header">
        <div class="header-left">
            <i class="fa fa-align-justify" @click="test"></i>
        </div>
        <div class="header-right">
            <form action="">
                <input type="search" class="search"  placeholder="搜索关键字"><i class="search-bar"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 30 26"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></i>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isShowLeft:false,
            }
        },
        created(){
            
        },
        mounted(){
              
        },
        methods:{
            test(){
                this.isShowLeft=!this.isShowLeft
                this.$emit("left-change",this.isShowLeft)
            },
            
        },
    }
</script>

<style scoped>
    
    .header{
        --height:3rem;
        height: 3rem;
        width: 100%;
        position: fixed;
        z-index: 999;
        line-height: 3rem;
        background: #409EFF;
        display: flex;
        color:snow;
        padding: 0 .8rem;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        filter:drop-shadow(0 2px 5px rgb(185, 151, 151))
    }
    .header-right form {
        display: flex;
        flex-flow: row nowrap;
    }
    *::placeholder{
        opacity: 0.9;
        color: snow;
    }
    .search{
        outline: none;
        border: none;
        color: snow;
        -webkit-appearance: none;
        display: inline-block;
        background: none;
        border-radius: 0;
        border-bottom: .5px black solid;
        padding: .4rem 0;
        transition: border .5s linear;
    }
    .search-bar{
        height: 2rem;
        color:snow;
        display: inline-block;
        width: 2rem;
    }

    .search:focus{
        border-bottom: .5px rgb(240, 237, 237) solid;
    }
   
  
</style>