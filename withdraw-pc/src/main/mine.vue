<template>
    <div id="mine">
                <div>
                    <Collapse v-model="value">
                        <Panel name="1">
                            <span style="font-weight:.5rem;font-size:1.2rem;" >{{username}}</span>
                            <p slot="content">
                              <Button type="primary"  @click="alterPassIndex='login'">修改 登录 密码</Button>
                              <Button type="primary"  @click="alterPassIndex='withdraw'">修改 提现 密码</Button>
                            </p>
                        </Panel>
                    </Collapse>
                    <Card :bordered="false">
                        <!-- <p slot="title">
                        </p> -->
                        <p>
                            余额：<span style="font-size:2rem;color:#409EFF">{{contentData.balance}}</span> 
                        </p>
                        <p >提示：<span class="mine-tip" v-for="(v,i) in contentData.tips" :key="i"> {{v}}</span> </p>
                        <br>
                        <p>
                            <Button type="primary"  @click="leapToWithdraw">去 提 现</Button>
                            <Button type="error" @click="quitSystem">退 出</Button>
                        </p>
                    </Card>
                </div>
       <Modal
        :title="(alterPassIndex=='withdraw'? '修改提现密码':'修改登录密码')"
        v-model="alterPassIndex"
        class-name="vertical-center-modal" @on-ok="sendMsg" >
                <Form ref="form" :model="form"  :label-width="80">
                    <FormItem label="旧密码" prop="bank_name">
                        <Input v-model="form.old_password" type="password" placeholder="请输入原始登录密码"></Input>
                    </FormItem>
                    <FormItem label="新密码" prop="branch_bank_name">
                        <Input v-model="form.new_password" type="password" placeholder="请输入新密码"></Input>
                    </FormItem>
                    <FormItem label="确认新密码" prop="branch_bank_name">
                        <Input v-model="form.new_password_repeat" type="password" placeholder="再次输入新密码"></Input>
                    </FormItem>
                </Form>
        </Modal>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
      data(){
        return {
            username:'',
            isQuit:false,
            contentData:{
                balance:'加载中...',
                tips:'加载中...'
            },
            open:false,
            value:"2",
            alterPassIndex:false,
            modifyModal:false,
            form:{
                old_password:'',
                new_password:'',
                new_password_repeat:'',
            }
        }
    },
    mounted(){
            this.username=this.getCookie('pay_username')? this.getCookie('pay_username'):'用户名';
            this.getData()
            this.value="1"
            let self=this
            setTimeout(()=>{
                self.value="2"
            },1000)
    },
   
    methods:{
     getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
     },
     
     leapToWithdraw(){
         this.$router.push({
          path: '/withdraw',
        })
         this.$store.commit('updateRouter','/withdraw')
     },
     getData(){
           Axios.get('/api/transfer/withdraw').then((res)=>{
                    let tem=res.data
                     let r=new RegExp('(?!^)(?=(\\d{3})+$)','ig')
                    if(tem.code==10000){
                      this.contentData.balance=tem.msg.balance.replace(r,',')
                      this.contentData.tips=tem.msg.tips.split('|')
                    }else{
                       this.$toast.error(tem.msg)
                    }
            })
            .catch(err=>{
                       this.$toast.error('系统故障')
            })
     },
     sendMsg(){
         if(this.form.new_password!==this.form.new_password_repeat){
             this.$Message.error('两次输入新密码不一致')
             this.clearForm(this.form)
             return
         }
         let conf=confirm(`确定要修改 ${this.alterPassIndex=='withdraw'? "提现":"登录"} 密码？`)
         if (!conf){
             this.clearForm(this.form)
             return
         }
         let url=this.alterPassIndex=='withdraw'? "/api/client/withdraw_password":"/api/client/login_password"
         let sendData=new FormData()
         Object.keys(this.form).forEach(item=>{
             if(item=='new_password_repeat')return
             sendData.append(item,this.form[item])
         })
        Axios.put(url,sendData).then((res)=>{
            this.clearForm(this.form)
            if(res.data.code==10000){
                this.$Message.success('修改 成功')
            }else{
              this.$Message.error(res.data.msg)
            }
        });

     },
     clearForm(obj){
        Object.keys(obj).forEach(item=>{
                obj[item]=""
        })
     },
      quitSystem(){
        let conr=confirm(`确定要退出登录么？`)
        if(!conr)return;
        Axios.get('/api/logout').then((res)=>{
            if(res.data.code==10000){
                this.$Message.success('退出成功')
                this.$store.commit('updateUsername',false)
                this.$router.push('/login')
                setTimeout(() => {
                    location.reload()
                }, 700);
            }
       })
     },  // quit system
    },
}
</script>

<style>
.mine-tip{
    margin: .5rem;
    font-size: .9rem;
    display: inline-block;
    transition: font-size .3s linear;
}
.mine-tip:hover{
    margin: 0;
    font-size: 1.4rem;
}
</style>
