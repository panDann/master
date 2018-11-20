<template>
   
    <div >
           <mu-appbar style="width: 100%;" color="primary">
                <mu-button icon slot="left" @click="back">
                    <mu-icon value="《"></mu-icon>
                </mu-button>
                       提现信息
                <mu-button flat slot="right" @click="controlAccountList">
                    <img src="../assets/padding.png" alt="" style="width:20px">
                </mu-button>
            </mu-appbar>
            <div :class="{'withdraw-account-list':true,'account-list-scale':AccountListScale}" v-show="isShowAccountList" @touch="preventDefault(e)">
                    <div class="bank-record" v-for="v in bankRecordData" :key="v.bank_account" @click="paddingAccount(v)">
                        <p>{{v.name}}</p>
                        <p>{{v.bank_account|filterBankAccount}}</p>
                    </div>
            </div>
            <div style="width: 90%; max-width: 375px;overflow:auto; margin: 1rem auto 0 auto;-webkit-overflow-scrolling: touch">
                    <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="90">
                                <mu-form-item  label="金额：">
                                     <mu-col span="6" lg="4" sm="6">
                                        <mu-text-field v-model="form.amount" placeholder="提现金额" @keyup.native="handleBalance(form.amount)"></mu-text-field>
                                     </mu-col>
                                     <mu-col span="4" lg="4" sm="6">
                                        <mu-button color="primary" flat @click="handleAllBalance"> 全部提现</mu-button>
                                    </mu-col>
                                </mu-form-item>
                        <mu-form-item  label="名字：">
                        <mu-text-field v-model="form.name" placeholder="个人姓名或公司名"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item  label="账户：">
                        <mu-text-field v-model="form.bank_account" placeholder="银行账户"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item  label="类型：">
                            <mu-select  v-model="form.bank_type" placeholder="请选择账户类型" >
                                <mu-option key="option" label="个人账户" value="1"></mu-option>
                                <mu-option key="option" label="公司账户" value="2"></mu-option>
                            </mu-select>
                        </mu-form-item>
                        <mu-form-item  label="地区：">
                            <mu-col span="6" lg="4" sm="6">
                                    <mu-select  v-model="form.area1" placeholder="选择省份" @change="handleCity">
                                        <mu-option :key="i" :label="v[0].province" :value="i" v-for="(v,i) in provinceData"></mu-option>
                                    </mu-select>
                            </mu-col>
                            <mu-col span="6" lg="4" sm="6">
                                <mu-select  v-model="form.area2" placeholder="市区" >
                                        <mu-option :key="v['name']" :label="v['name']" :value="v['name']" v-for="(v) in cityData"></mu-option>
                                </mu-select>
                            </mu-col>
                        </mu-form-item>
                        <mu-form-item  label="银行名：">
                        <mu-text-field v-model="form.bank_name" placeholder="开户银行"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item  label="支行名：">
                        <mu-text-field v-model="form.branch_bank_name" placeholder="开户支行名"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item  label="密码：">
                        <mu-text-field v-model="form.pay_password" placeholder="支付密码"></mu-text-field>
                        </mu-form-item>
                        <mu-form-item prop="checkbox" label="记住账号：">
                           <mu-checkbox v-model="form.save" value="ok" ></mu-checkbox>
                        </mu-form-item>
                    </mu-form>
                    <!-- <mu-card-text>
                    </mu-card-text> -->
                    <mu-card-actions>
                        <mu-button color='primary' full-width @click="sendMsg">确 定</mu-button>
                        <mu-button color='secondary' @click="back" full-width style="margin:.6rem 0 2rem 0;">取 消</mu-button>
                    </mu-card-actions>
        </div>
                    <!-- <mu-button color="success" full-width @click="open=!open">提 现</mu-button> -->
    </div>
</template>
<script>
   import Axios from 'axios';
   import Area from './area';

//    import md5 from 'md5';

export default {
    
    data(){
        return {
            username:'',
            isQuit:false,
            labelPosition:'left',
            balance:0.00,
            bankRecordData:[],
            isShowAccountList:false,// control account list
            AccountListScale:false,
            form:{
                amount:'',
                bank_account:'',
                name:'',
                area1:'',
                bank_type:'',
                area2:'',
                area:'',
                bank_name:'',
                branch_bank_name:'',
                pay_password:'',
                save:['ok'],
            },
            cityData:[{
                name:'请先选择省份'
            }],
            provinceData:Area
        }
    },
    mounted(){
            this.username=this.getCookie('report_username')? this.getCookie('report_username'):'用户名';
            this.$store.commit('confirmLogin',false)
            this.getData()
    },
    methods:{
     back(){
        this.$router.back()
        // this.$router.push('/')

        this.$store.commit('confirmLogin',true)
     },
     getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
     },
     handleCity(){
        this.form.area2=''
        this.cityData=this.provinceData[this.form.area1]
     },
     handleBalance(value){
         if(parseFloat(this.form.amount)*100%1){
          this.form.amount=parseFloat(this.form.amount).toFixed(2)
         }
         if(parseFloat(value)>parseFloat(this.balance)){
             this.form.amount=this.balance
         }
     },
     handleAllBalance(){
         let [f,b]=this.balance.toString().split('.'),
            fTem=parseInt(Math.ceil(f/10)),fSum=0,
            bTem=parseInt(Math.ceil(b/10)),bSum=0,
            timer='',
            self=this;
            f=parseInt(f)
            b=parseInt(b)
            timer=setInterval(()=>{
                if(fSum<=f){
                    fSum+=fTem
                    fSum>=f? fSum=f:''
                }
                if(bSum<=b){
                    bSum+=bTem
                    bSum>=b? bSum=b:''
                }
                self.form.amount=fSum+bSum/100
                if(fSum==f&&bSum==b){
                    clearInterval(timer)
                }
            },10)

     },
     getData(){
        Axios.get('/api/transfer/withdraw').then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                      this.balance=tem.msg.balance

                      this.bankRecordData=tem.msg.bank_records
                    }else{
                       this.$toast.error(tem.msg)
                    }
            })
            .catch(err=>{
                       this.$toast.error('系统故障')
            })
     },
     sendMsg(){
         let url=`/api/transfer/withdraw`,
             sendData=this.formdataPost(this.form)
             if(!sendData)return;
             Axios.post('/api/transfer/withdraw',sendData).then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                        this.$toast.success('提现成功')
                        this.$store.commit('confirmLogin',true)
                        this.$router.push('/mine')
                    }else if(tem.code==10435){
                        this.handleWithdrawEdge(tem)
                    }else{
                       this.$toast.error(tem.msg)
                    }
            })
            .catch(err=>{
                       this.$toast.error('系统故障')
            })
     },
     handleWithdrawEdge(msg){
        this.$confirm(`扣除手续费实际到账金额：${msg.withdraw_amount}`,'提示')
                    .then(({result})=>{
                        if(result){
                            this.form.amount=msg.withdraw_amount
                            this.sendMsg()
                        }
                    })
     },
     formdataPost(obj){
        let sendData=new FormData()
        for(let v in obj){
            if(v=='area'||v=='area2'||v=='save')continue;
            if(!obj[v]){
                this.$toast.error('信息未填写完整')
                return 0
            }
              v=='area1'? sendData.append('area',typeof this.provinceData[obj['area1']]=='undefined'? obj['area1']+','+obj['area2']:this.provinceData[obj['area1']] [0].province+','+obj['area2']):
                          sendData.append(`${v}`,obj[v])
        }
        !obj['save'].length? "":sendData.append(`save`,obj['save'][0])
        return sendData
     },
     controlAccountList(){
         this.isShowAccountList=!this.isShowAccountList
         let self=this;
         setTimeout(() => {
           self.AccountListScale=!self.AccountListScale
         }, 10);
     },
     paddingAccount(obj){
        // this.isShowAccountList=false;
        this.controlAccountList()
        for(let v in obj){
            if(v=='area'){
                [this.form.area1,this.form.area2]=obj[v].split(',')
            }
            if(typeof this.form[v] !='undefined')this.form[v]=obj[v]
        }
     },
     preventDefault(e=window.event){
            if ( e && e.stopPropagation )
            //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
            else
            //否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
     },
      quitSystem(){
        let conf=confirm('确定退出？')
        if(conf){
            Axios.get('/api/logout').then((res)=>{
                    //console.log(res)    
                    if(res.data.code==10000){
                        this.$toast.success('退出成功')
                        this.$store.commit('confirmLogin',false)
                        this.$router.push('/login')
                    }
            })
        }else{
            return;
        }
     },  // quit system
    },
    filters:{
        filterBankAccount(value){
                return value.replace(/(\w{4}).*(\w{4})/ig,'$1******$2')
        }
    }
}
</script>

<style>
body{
    -webkit-overflow-scrolling: touch;
}
.mine-username{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    overflow: auto;
    height: 10rem;
    border-radius: 100%;
    width: 50%;
}
.withdraw-account-list{
        width: 40%;
        min-height: 18rem;
        max-height: 20rem;
        overflow: auto;
        position: absolute;
        z-index: 9999;
        /* transform: scaleY(.7); */
        transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1.2);
        border-radius: .1rem;
        display: inline-block;
        right: 0;
        background: rgba(0, 0, 0, .5);
}
.account-list-scale{
        /* transform: scaleY(1); */
        width: 50%;
        min-height: 20rem;
}
.bank-record{
    color: snow;
    margin-bottom: .2rem;
    background: black;
}.bank-record p{
    margin: 0;
}
.bank-record:active{
    background: rgb(87, 82, 82);

}
</style>
