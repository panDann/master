<template>
    <div class="header">
        <input type="text" class="search" placeholder="test">
    </div>
</template>
<script>
    
</script>

<style scoped>
    *::placeholder{
        opacity: 0.5;
    }
    .header{
        --height:3rem;
        height: var(--height);
        width: 100%;
        line-height: var(--height);
        background: snow;
        filter:drop-shadow(0 2px 5px rgb(185, 151, 151))
    }
    .search{
        outline: none;
        border: none;
        display: inline-block;
        border-bottom: .5px black solid;
        padding: .4rem 0;
        transition: border .5s linear;
    }
    
    .search:focus{
        /* animation: border .5s linear; */
        border-bottom: .5px rgb(206, 38, 38) solid;
        /* border-block-end-width: 2px; */
        /* border-block-start-width: 2px; */
        border-block-end-style:ridge;
        /* border-block-end: 2px; */
        
    }
    @keyframes border{
        0%{ 
             border-block-end-width: .5px;
        }
        
        100%{ 
             border-block-end-width: 2px;
        }
    }
</style>