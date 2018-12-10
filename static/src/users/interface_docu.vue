<template>
    
<div>
      <div class="container">
          <el-col  >
                <el-card class="box-card" 
                v-loading="messageLoading"
      
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                        <div slot="header" class="clearfix">
                            <span class="username"><a href="/api/static/pay.html" target="blank" style="font-size:1.5rem;">接口文档 >></a> </span>
                        </div>
                             <iframe src="/api/static/pay.html" frameborder="0" class="container-ifram"></iframe>
                </el-card>
          </el-col>
      </div>
          

</div>


</template>
<script>

import axios from 'axios'
import marked from "marked"

export default {
    data (){
        return{
            document:"",
            messageLoading:false
        }
    },
    mounted(){
    },
    methods:{
       getMessage(){
               this.messageLoading=true;
               let div=document.getElementById('interface-docu')
               axios.get('/api/document')
                    .then((res)=>{
                 let tem=res.data.msg;
                    if(res.data.code==10000){
                        this.document=tem  
                        div.innerHTML=tem;
                       this.messageLoading=false;
                    }else{
                       this.$message({
                        message:res.data.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                    this.$message({
                        message:err,
                        type:'danger'
                      });
               });
       },
      
    },
}
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
    border-radius: .2rem;;
    background: #409EFF;
    vertical-align: middle;
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
