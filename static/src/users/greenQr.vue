<template>
    <div id="green-qr">
        <div class="gq-left-record">
            <div style="padding:1rem;">
                <p class="gq-left-item">{{recordData.length? '记 录':'无 记 录'}}</p>
                <p class="gq-left-item" v-for="v in recordData" :key="v.id"> 
                    <span style='border:.5px solid snow;padding:.2rem;'>id：{{v.id}}</span>  
                    <span style='border:.5px solid snow;padding:.2rem;'>状态：{{v.state}}</span>  
                    <span style='border:.5px solid snow;padding:.2rem;'>创建时间：{{v.create_time}}</span>  
                       </p>
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total='total'
                    :page-size="pageSize"
                    v-show="recordData.length"
                    :current-page.sync="currentPage" @current-change="turnPage">
                   </el-pagination>
            </div>
        </div>
        <div class="gq-right-qr">
                <div class="gq-right-qr-first" v-loading="loadingCode"
                    element-loading-text="正在获取二维码"
                    element-loading-spinner="el-icon-loading"
                >
                   <img :src="'data:image/png;base64, '+msg.qrcode" alt="二维码" v-if="msg.qrcode" :class="{'gq-qrcode':true,'gq-qrcode-large':Enlarge}" @click="Enlarge=!Enlarge" title="点击可放大缩小">
                   <div style="margin-top:5rem;" >
                     <p style="margin:.1rem .5rem 0 .5rem;" class="gq-left-item">id：{{msg.id}}</p>
                     <p style="margin:.1rem .5rem 0 .5rem;" class="gq-left-item">账号：{{msg.account}}</p>
                     <p style="margin:.1rem .5rem 0 .5rem;" class="gq-left-item">支付密码：{{msg.p}}</p>
                   </div>
                </div>
                <div class="gq-right-qr-second">
                        <div>
                            <el-radio v-model="form.state" label="1">成功</el-radio>
                           <el-radio v-model="form.state" label="0">失败</el-radio>
                        </div>
                        
                        <el-input v-model="form.reason" v-show="form.state==0&&!isNaN(parseInt(form.state))" placeholder='请填写失败原因'></el-input>
                        <div style="margin-top:2rem;">
                                   <el-button type='primary' @click="sendMsg">提 交</el-button>
                        <!-- <el-button type='primary' >下一个</el-button> -->
                        </div>
                 
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
// import io from 'socket.io-client'
export default {
    data(){
        return{
            total:10,
            pageSize:10,
            currentPage:1,

            recordData:[],
            msg:'',
            form:{
                id:'',
                state:'',
                reason:'',
            },
            timer:'',
            loadingCode:false,
            Enlarge:false,
        }
    },
    mounted(){
        this.getTable()
        this.getQrcode()
    },
    beforeRouteLeave(to,from,next){
        clearInterval(this.timer)
        next()
    },
    methods:{
     getTable(){
               let url=`/api/qrcode/record`
               axios.get(url,).then((res)=>{
                    let tem=res.data;
                    if(res.data.code==10000){   
                        this.recordData=tem.msg.records
                        this.total=tem.msg.total
                        if(this.recordData.length){
                            this.recordData.forEach(item=>{
                                item.state=this.parseState(item.state)
                                item.create_time=this.formdata(item.create_time)
                            })
                        }
                    }else{
                      this.$message({
                        message:tem.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                   this.$message({
                        message:'系统故障',
                        type:'warning'
                      });
               });
       },//get table data
   
      getQrcode(){
               this.loadingCode=true;
               let url=`/api/qrcode/lvsan`
               axios.get(url,).then((res)=>{
                    let tem=res.data;
                    if(res.data.code==10000){   
                        this.msg=tem.msg
                        if(typeof tem.msg.id!='undefined'){
                            this.loadingCode=false;
                            this.form.id=tem.msg.id;
                            clearInterval(this.timer)
                        }
                    }else{
                      this.$message({
                        message:tem.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                   this.$message({
                        message:'系统故障',
                        type:'warning'
                      });
               });
      },//get table data
      sendMsg(){
         if(isNaN(parseInt(this.form.state))){
             this.$message({
                 message:'勾选扫码结果 状态',
                 type:'warning'
             })
             return
         }
         let [keys,values]=[Object.keys(this.form),Object.values(this.form)];
         let sendData=new FormData()
             keys.forEach((item,i)=>{
                 sendData.append(`${item}`,`${values[i]}`)
             })
         let url=`/api/qrcode/lvsan`
               axios.post(url,sendData).then((res)=>{
                    if(res.data.code==10000){ 
                        this.$message({
                        message:'提交成功',
                        type:'success'
                        });  
                        this.getTable()
                        this.getQrcode()
                        this.createTimer()
                    }else{
                      this.$message({
                        message:tem.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                   this.$message({
                        message:'系统故障',
                        type:'warning'
                      });
               });
      },
      createTimer(){
         let self=this
         this.timer=setInterval(()=>{
            self.getQrcode()
         },5000)
      },
       turnPage(){
            let url=`/api/qrcode/record?page=${this.currentPage}&page_size=${this.pageSize}`
            axios.get(url).then((res)=>{
               let tem=res.data;
                    if(res.data.code==10000){   
                        this.recordData=tem.msg.records
                        if(this.recordData.length){
                            this.recordData.forEach(item=>{
                                item.state=this.parseState(item.state)
                                item.create_time=this.formdata(item.create_time)
                            })
                        }
                    }else{
                      this.$message({
                        message:tem.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                    console.log(err)
               });
      },
      parseState(val){
            switch (val){
                case 0: return '失败'
                case 1: return '成功'
                case -1: return '未获取'
                default:break;
            }
      },
      formdata(val){
          return moment(val).utc().zone(-0).format('YYYY-MM-DD HH:mm:ss')
      }
    },
}
</script>

<style scoped >
#green-qr{
    display: flex;
    flex-flow: row nowrap;
}
.gq-left-record{
    width: 49%;
    text-align: center;
    height: 40rem;
    margin-top: 2rem;
    margin-right: .2rem;
     display: flex;
    flex-flow: column nowrap;
    justify-content:center;
    border-radius: .4rem 0  0 .4rem;
    background: snow;
    box-shadow: 0px 8px 20px rgb(36, 37, 37);
}
.gq-right-qr{
    width: 49%;
    text-align: center;
    height: 40rem;
    margin-top: 2rem;
    display: inline-block;
    border-radius:0 .4rem    .4rem 0;
    background: snow;
    box-shadow: 0px 8px 20px rgb(36, 37, 37);
}
.gq-right-qr-first{
    width: 100%;
    display: flex;
    padding: 1rem;
    flex-flow: row nowrap;
}
.gq-left-item{
    padding: .2rem;
    margin: 0 5.5rem .5rem 4.5rem;
    border-radius: .2rem;
    background: rgb(240, 241, 237);
}
.gq-left-item:hover{
    background: #409EFF;
    color:snow;
}
.gq-qrcode{
    width:20rem;
    height:20rem;
    border-radius: .4rem;
    cursor: pointer;
    /* transition: all .1s; */
}
.gq-qrcode-large{
    position: absolute;
    left: 30rem;
    width: 80rem;
    height: 50rem;
    z-index: 100;
}
.gq-right-qr-second{
    width:90%;
    margin: .5rem auto;
    height:15rem;
    border-radius: .4rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content:center;
    border: solid .5px salmon;
}
</style>
