<template>
    <div style="position:relative">
            <div style="text-align:left">
               <span :class="{'withdraw-type':true,'withdraw-type-active':withdrawMode==1}"  @click="withdrawMode=1">手动提现</span>
               <span class="withdraw-type" >/</span>
              <span :class="{'withdraw-type':true,'withdraw-type-active':withdrawMode==2}" @click="withdrawMode=2">自动提现</span>  
            </div>
            <transition name="top-bottom">
                    <div  class="right-top-list">
                            <img src="../assets/padding.png" alt="快捷记录" @click="valueDrawer = true" class="quik-choice"  title="以往账号记录" v-if="(withdrawMode==1)">
                    </div>
            </transition>
            <div id="withdraw" style="width:50%;text-align:center;margin:0 auto;position: relative;" v-show="(withdrawMode==2)">
                <AutoWithdraw v-if="(withdrawMode==2)" :msg='autoAmount' :mode="modeProp"></AutoWithdraw>
            </div>
            <div id="withdraw" style="width:50%;text-align:center;margin:0 auto;position: relative;" v-show="(withdrawMode==1)">
                <!-- <Cell title="个 人 提 现" /> -->
            <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
                    <FormItem  label="金 额" >
                        <Col span="12">
                        <FormItem prop="amount">
                            <Input v-model="form.amount" placeholder="输入 提现 金额"   @on-change="handleBalance(form.amount)"></Input>
                        </FormItem>
                        </Col>
                        <Col span="6">
                              可 提：<span style="font-size:1.2rem;color:#409EFF">{{ balance }}</span>
                        </Col>
                        <Col span="6">

                        <Button type="primary" @click="handleAllBalance">全 部 提 现</Button>
                        </Col>
                    </FormItem>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="form.name" placeholder="银行卡姓名"></Input>
                    </FormItem>
                    <FormItem label="银行卡号" prop="bank_account">
                        <Input v-model="form.bank_account" placeholder="银行卡号" @keyup.native="formdataBankAccount"></Input>
                    </FormItem>
                    <FormItem label="账户类型" prop="bank_type">
                        <Select v-model="form.bank_type" placeholder="选择账户类型" >
                                    <Option value="1" >个人账户</Option>
                                    <Option value="2" >企业账户</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="地区">
                            <Col span="11">
                                <Select v-model="form.area1" placeholder="选择省份" @on-change="handleCity">
                                    <Option :value="i" v-for="(item,i) in provinceData" :key="i">{{item[0].province}}</Option>
                                </Select>
                            </Col>
                          <Col span="2">
                           |
                           </Col>
                            <Col span="11">
                                <Select v-model="form.area2" placeholder="选择市" >
                                    <Option :value="v['name']" v-for="(v) in cityData" :key="v['name']">{{v['name']}}</Option>
                                </Select>
                            </Col>
                    </FormItem>
                    <FormItem label="银行名称" prop="bank_name">
                        <Input v-model="form.bank_name" placeholder="银行名称"></Input>
                    </FormItem>
                    <FormItem label="支行名称" prop="branch_bank_name">
                        <Input v-model="form.branch_bank_name" placeholder="支行名称"></Input>
                    </FormItem>
                    <FormItem label="提现密码" >
                           <Col span="12">
                                      <Input v-model="form.pay_password" placeholder="" type="password"></Input>
                           </Col>
                           <Col span="2">
                           |
                           </Col>
                           <Col span="4">
                                    <Input v-model="imgCodeData.captcha_string" placeholder="验证码" ></Input>
                           </Col>
                            <Col span="2">
                             <img :src="'data:image/png;base64,'+imgCodeData.captcha_img" v-if="imgCodeData.captcha_img" style="height:2rem;margin-left:2rem;cursor:pointer" alt="验证码" @click="getImgCode">
                           </Col>
                    </FormItem>
                
                    <FormItem label="" prop="save">
                        <CheckboxGroup v-model="form.save">
                            <Checkbox label="记住账号"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('form')">提 交</Button>
                        <Button @click="handleReset('form')" style="margin-left: 8px">重 置</Button>
                    </FormItem>
                </Form>
                    <!-- <Button @click="value2 = true" type="primary">Open</Button> -->
                    
                <Drawer title="可选账号" placement="right" :closable="false" v-model="valueDrawer">
                            <div class="bank-record" v-for="v in bankRecordData" :key="v.bank_account" @click="paddingAccount(v)">
                                <p>{{v.name}}</p>
                                <p>{{v.bank_account|filterBankAccount}}</p>
                            </div>
                </Drawer>
            </div>
            
    </div>
    
</template>

<script>
   import Axios from 'axios';
   import Area from './area';
   import AutoWithdraw from '../components/AutoWithdraw';
   import {mapState} from 'vuex';

//    import md5 from 'md5';

export default {
    
    data(){
        return {
            username:'',
            isQuit:false,
            labelPosition:'left',
            balance:0.00,
            autoAmount:'',
            imgCodeData:{
                  captcha_string:'',
                  captcha_id:''
            },
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
                    save:['记住账号'],
                },
            bankRecordData:[],
            isShowAccountList:false,// control account list
            AccountListScale:false,
            valueDrawer:false,
            switchBtnStyle:'info',
            withdrawMode:'',
            modeProp:'',
         
            cityData:[{
                name:'请先选择省份'
            }],
            provinceData:Area,
                ruleValidate: {
                    // amount: [
                    //     { required: true, message: '提现金额不能为空', trigger: 'blur' }
                    // ],
                    bank_account: [
                        { required: true, message: '银行账号不能为空', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                     name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                     bank_type: [
                        { required: true, message: '银行类型不能为空', trigger: 'change' }
                    ],
                     branch_bank_name: [
                        { required: true, message: '支行名不能为空', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    pay_password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ],
                    bank_name: [
                        { required: true, type: 'string', message: '银行名称不能为空', trigger: 'blur' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                   
                }
        }
    },
    beforeRouteLeave (to, from, next) {
        this.$store.commit('updateWithdrawNote',this.form)
        next()
    },
    mounted(){
            console.log(this.provinceData,'132')
            this.username=this.getCookie('report_username')? this.getCookie('report_username'):'用户名';
            this.getData()
            this.getImgCode()
    },
 
    components:{
        AutoWithdraw
    },
    filters:{
        showBalance:function(val){
            let r=new RegExp('(?!^)(?=(\\d{3})+$)','ig')
            alert(va)
            return val.toString().replace(r,',')
        }
    },
    methods:{
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        this.checkImgCode()
                    } else {
                        this.$Message.error('信息未填写完全!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
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
         let [i,f]=this.form.amount.toString().split('.')
         if(parseInt(f)>99){
             this.$Message.error('小数点两位以后无效')
             let t=this.form.amount
             this.form.amount=i.replace(/^(?=)\d{3}$/ig,',')+'.'+f.match(/\d{2}/g)[0]
         }
         if(parseInt(parseFloat(value).toFixed(2)*100)>=parseInt(parseFloat(this.balance).toFixed(2)*100)){
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
            },50)
        // this.form.amount=this.balance;

     },
     formdataBankAccount(){
        this.form.bank_account=this.form.bank_account.replace(/\s/g,'').replace(/(\d{4})/ig,'$1 ')
     },
     getData(){
        Axios.get('/api/transfer/withdraw').then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                      this.balance=tem.msg.balance
                      this.autoAmount=tem.msg.amount;
                      this.withdrawMode=tem.msg.withdraw_mode
                      this.modeProp=this.withdrawMode
                      this.bankRecordData=tem.msg.bank_records
                    }else{
                       this.$Message.error(tem.msg)
                    }
            })
            .catch(err=>{
                       this.$Message.error('系统故障')
            })
     },
     sendMsg(){
         let url=`/api/transfer/withdraw`,
             sendData=this.formdataPost(this.form)
             if(!sendData)return;
             Axios.post('/api/transfer/withdraw',sendData).then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                        this.$Message.success('提现成功')
                        this.$store.commit('updateRouter','/mine')
                        this.$router.push('/mine')
                    }else if(tem.code==10435){
                        this.handleWithdrawEdge(tem)
                        this.getImgCode()
                    }else{
                        this.$Message.error(tem.msg)
                        this.getImgCode()
                    }
            })
            // .catch(err=>{
            //            this.$Message.error('系统故障')
            // })
     },
     handleWithdrawEdge(msg){
        let conf=confirm(`扣除手续费实际到账金额：${msg.withdraw_amount}`)
        if(!conf) return;
        this.form.amount=msg.withdraw_amount
        this.sendMsg()
     },
     formdataPost(obj){
        let sendData=new FormData()
            obj.bank_account.replace(/\s/g,'')
        for(let v in obj){
            if(v=='area'||v=='area2'||v=='save')continue;
            if(!obj[v]){
                this.$Message.error('信息未填写完整')
                return 0
            }
              v=='area1'? sendData.append('area',typeof this.provinceData[obj['area1']]=='undefined'? obj['area1']+','+obj['area2']:this.provinceData[obj['area1']] [0].province+','+obj['area2']):
                          sendData.append(`${v}`,obj[v])
        }
        !obj['save'].length? "":sendData.append(`save`,obj['save'][0])
        return sendData
     },
     paddingAccount(obj){
        this.valueDrawer=false;
        for(let v in obj){
            if(v=='area'){
                [this.form.area1,this.form.area2]=obj[v].split(',')
                this.matchProvinceId(this.form.area1)
            }
            if(typeof this.form[v] !='undefined')this.form[v]=obj[v]
        }
     },
     matchProvinceId(value){
            for(let v in this.provinceData){
                // console.log(this.provinceData[v][0].province)
                if(this.provinceData[v][0].province==value){
                    this.form.area1=v;
                    this.cityData=this.provinceData[this.form.area1]
                    break;
                }
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
      },// end checkImgCode 
    },
     filters:{
        filterBankAccount(value){
                return value.replace(/(\w{4}).*(\w{4})/ig,'$1******$2')
        }
    }
  
}
</script>

<style>
.quik-choice{
    
    cursor: pointer;
    width: 2rem;
    margin-right: .4rem;
    border-radius: .4rem;
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1.1);
}
.quik-choice:hover{
    box-shadow: 0px 5px 20px 0px pink;
    transform: scale(1.2)
}
.bank-record{
    color: snow;
    text-align: center;
    margin-bottom: .2rem;
    background: #409EFF;
    cursor: pointer;
}.bank-record p{
    margin: 0;
}
.bank-record:active{
    background: rgb(87, 82, 82);

}
.right-top-list{
    position: absolute;
    width: 10%;
    right: 2rem;
    min-width: 10rem;
    flex-flow: row nowrap;
}
.auto-switch{
    position: absolute;
    right: 0rem;
    top: 0rem;
}
.withdraw-type{
    font-size: .8rem;
    display: inline-block;
    padding: .2rem;
    cursor: pointer;
    transition: font-size .3s;
    margin: 0;

}
.withdraw-type-active{
    color: #409EFF;
    font-size: 1.2rem;
}
.withdraw-type:hover{
    color: #409EFF;
}
</style>
                             