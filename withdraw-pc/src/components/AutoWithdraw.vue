<template>
  <div id="auto-withdraw" style="text-align:center;margin:0 auto;width:120%;overflow:auto;max-height:50rem;">
      <Form ref="form"  :label-width="80">
                    <FormItem  label='即提额度：'>
                                        <Input v-model="amount" placeholder="当账号 余额 达到输入的 限定额度 时，开始自动提现到勾选账户" @on-blur="limitAmount"></Input>
                    </FormItem>

                 <FormItem  label='提现密码：'>
                           <Col span="12">
                                    <Input v-model="pay_password" placeholder="" type="password"></Input>
                           </Col>
                           <Col span="2">
                           |
                           </Col>
                           <Col span="4">
                                    <Input v-model="imgCodeData.captcha_string" placeholder="验证码" ></Input>
                           </Col>
                            <Col span="2">
                             <img :src="'data:image/png;base64,'+imgCodeData.captcha_img" style="height:2rem;margin-left:2rem;cursor:pointer" alt="验证码" @click="getImgCode">
                           </Col>
                 </FormItem>
       </Form>
      <Table ref="selection" border :columns="columns5" :data="tableData"   @on-selection-change="handleSelect" ></Table>
      <br>
       <Button @click="checkImgCode" type="primary">提 交 配 置</Button>
       <Button type="error" title="自动提现"  @click="transferSwitch" v-show="mode==2">关 闭</Button>
       <!-- <Button @click="handleSelectAll(false)">Cancel all selected</Button> -->
  </div>
</template>

<script>

import Axios from 'axios'
import moment from 'moment';

export default {
  name: 'app',
   data () {
    return {
     amount:10000|'',
     pay_password:"",
     selectData:[],
     imgCodeData:{
         captcha_string:'',
         captcha_id:''
     },

     columns5: [
                    {
                        type: 'selection',
                        width:50,
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        width:150
                    },
                    {
                        title: '卡号',
                        key: 'bank_account',
                    },
                    {
                        title: '银行名称',
                        key: 'bank_name',
                        width:150
                    },
                    {
                        title: '地区',
                        key: 'area',
                       
                    },
                  
                ],
     tableData: [{
            name:'ken',
            key:'state'
        }],
         
      listMirror:[],
      pageSize:8,
      currentPage:1,      
      page:'',
      loading: false,
      refresh:false,
    }
  },
  computed:{
     
  },
  props:['msg','mode'],
  mounted(){
    this.amount=this.msg;
    parseInt(this.amount)<10000? this.amount=10000:''
    this.getTable()
    this.getImgCode()
  },
 
  methods: {
    handleSelect(sel,o){
        this.selectData=[];
        for(let i=0,l=sel.length;i<l;i++){
            this.selectData.push(sel[i].id)
        }
    },
    limitAmount(){
        if(parseInt(this.amount)>100000 || parseInt(this.amount)<100){
            this.$Message.error('额度需在 1w-10w 之间')
            return 0
        }else{
            return 1
        }
   },
    getTable(){
        this.loading=true;
        let sendStr=`/api/transfer/bank_card`;
        Axios.get(sendStr,)
        .then((res)=>{
            this.loading=false;
            if(res.data.code==10000){
            this.tableData=res.data.msg
            this.addCheck(this.tableData);
            this.page=Math.ceil(res.data.msg.total/this.pageSize);
            }else{
                this.$Message.error(res.data.msg)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    addCheck(obj){
            for(let i=0,l=obj.length;i<l;i++){
                if(obj[i].state){
                    this.selectData.push(obj[i].id)
                    this.$set(obj[i],'_checked',true)
                }else{
                    continue;
                }
            }
            console.log(obj,'ojb')
    },
    handleStatus(sta){
            switch(sta){
                case 'SUCCESS':return '成功';
                case 'FAIL':return '失败';
                case 'INIT':return '待处理';
                case 'DEALING':return '处理中';
                case 'REFUND':return '退票';
                        default:return '未知' 
            }
       },
    formdataTime(time){
       let tem=''
       time? tem=moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss'):tem='待确定'
      return tem
    },
     sendMsg(){
        if(!this.limitAmount())return;
        let sendStr=`/api/transfer/withdraw/config`;
        let sendData=new FormData()
            sendData.append('id',this.selectData)
            sendData.append('amount',this.amount)
            sendData.append('pay_password',this.pay_password)
        Axios.post(sendStr, sendData)
            .then((res)=>{
                if(res.data.code==10000){
                this.tableData=res.data.msg
                this.addCheck(this.tableData);
                this.mode=2;
                this.$Message.success('自动提现开启')
                }else{
                    this.$Message.error(res.data.msg)
                    this.getImgCode()
                }
            })
            .catch((err)=>{
                    this.$Message.error('系统故障')
            })
     },
      transferSwitch(){
          
              let conf=confirm(`确定要关闭自动提现功能？`)
              if(!conf){
                    return
              };
             let sendStr=`/api/transfer/withdraw/config`;
             Axios.get(sendStr)
                .then((res)=>{
                    if(res.data.code==10000){
                     this.mode=1;
                    this.$Message.success('自动提现已关闭')
                    }else{
                        this.$Message.error(res.data.msg)
                    }
                })
                .catch((err)=>{
                        this.$Message.error('系统故障')
                })
      },
      turnPage(index){
               this.loading=true;
              if(!this.checkPageButton(index))return;
               let sendStr=`/api/transfer/withdraw/record?page=${this.currentPage}&page_size=${this.pageSize}`;
               Axios.get(sendStr,)
                    .then((res)=>{
                        if(res.data.code==10000){
                          this.loading=false;
                          this.list=res.data.msg
                          let [...t]=this.list
                             this.listMirror=t;
                        }else{
                         this.$Message.error(res.data.msg)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
      },
       getImgCode(){
           let url=`/api/transfer/captcha`
             Axios.get(url,).then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                        this.imgCodeData=tem.msg
                    }else{
                       this.$Message.error(tem.msg)
                    }
            })
      },
      checkImgCode(){
           let url=`/api/transfer/captcha`,
              sendData=new FormData();
              sendData.append('captcha_string',this.imgCodeData.captcha_string)
              sendData.append('captcha_id',this.imgCodeData.captcha_id)
             Axios.post(url,sendData).then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                        this.sendMsg()
                    }else{
                       this.$Message.error(tem.msg)
                    }
            })
      },
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.footer{
  display: flex;
  margin-top: 1rem;
  justify-content: space-around;
}
.rotate{
  animation: refresh 1s infinite linear;
}
@keyframes refresh {
  0%{
    transform: rotate(0deg)
  }
   100%{
    transform: rotate(-360deg)
  }
}
</style>
