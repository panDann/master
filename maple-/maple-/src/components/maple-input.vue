<template>
    <div class="maple-input">
                <input type="text" spellcheck="false" class="search" 
                        :value="value"
                        @focus="inputBottom=true" 
                        @blur="inputBottom=false" 
                        @input="$emit('input', $event.target.value)"
                        />
                <span :class="{'input-title':true,'input-title-focus':value? true:inputBottom}">{{title}}</span>
                <span :class="{'search-bottom':inputBottom}"></span>
    </div>
</template>
<script>
export default {
  
    data() {
        return {
            inputBottom:false,      
            inputValue:"",

        }
    },
     props:{
        type:String||"text",
        placeholder:String||"请输入内容",
        value:String,
        title:String,
    },
    watch:{
            inputValue(n,o){
                this.$emit("input",n)
            }
    },
}
</script>

<style scoped>
.maple-input{
    position: relative;
    /* background:  */
}
.search{
        outline: none;
        border: none;
        color: rgb(45, 194, 137);
        -webkit-appearance: none;
        display: inline-block;
        background: none;
        border-radius: 0;
        font-size: 16px;
        border-bottom: .5px rgb(160, 152, 152) solid;
        padding: .2rem 0;
        width: 80%;
        margin: .2rem;
        margin-top: .6rem;
        transition: border .5s linear;
    }
      .search-bottom{
        /* content: "1231"; */
        display: inline-block;
        height: .1rem;
        width:80%;
        bottom: .2rem;
        left: .2rem;
        position: absolute;
        background: rgb(23, 26, 25);
        animation: search-bottom .3s linear;
    }
    @keyframes search-bottom {
        0%{transform: scale(.1)}
        100%{transform: scale(1)}

    }
    .input-title{
        display: inline-block;
        transition: all  .2s linear;
        top: .4rem;
        left: .2rem;
        position: absolute;
    }
    .input-title-focus{
        font-size: .5rem;
        top: -.1rem;
    }
   
</style>
