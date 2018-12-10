<template>
    
<div class="container-interface-docu">
               
                        <div slot="header" class="clearfix">
                                                        <span class="username"><a href="/api/static/pay.html" target="blank" style="font-size:1.5rem;color:snow">接口文档 >></a> </span>
                        </div>
                             <iframe src="/api/static/pay.html" frameborder="0" class="container-ifram"></iframe>
</div>


</template>
<script>


</script>

<style scoped>
.container{
    width: 80%;
}
.container-ifram{
    width: 100%;
    min-height: 40rem;
}
.username{
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    color: snow;
    text-align:center;
    font-size: 1rem;
    border-radius: .2rem;;
    background: #409EFF;
    vertical-align: middle;
}
.container-interface-docu{
    margin: 0 1rem;
}

.input-btn{
    position: absolute;
    padding: .555rem;
    border: none;
    background: none;
    color: #409EFF;
    cursor: pointer;
    top: 0;
    right: -6rem;
    outline: none;
    
}
.item-input{
    border: none;
    border-bottom: .5px solid black;
    padding: .5rem;
    margin-bottom: .5rem;
}
</style>
