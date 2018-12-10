<template>
    <div class="second-nav" id='second-nav'>
        <slot></slot>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.second-nav{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 80%;
    height: auto;
    overflow: auto;
    margin: auto;
    padding-top: 2rem;
    /* background: pink; */
}
</style>
