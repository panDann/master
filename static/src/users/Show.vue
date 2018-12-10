
<template>



    <div class="container" style="max-width: 20rem;position: absolute;right: -10rem;;z-index:1000000;">
    <section style="padding-top: 0rem;">
        <div class="row" style="background: rgba(255,255,255,1);min-height:20rem">
            <div>
                 <img src="../assets/alipay.jpg" alt="" style="max-width: 20rem;">
            </div>
            <div class="show-flex">
              <div   >
                {{'账号： ' + msg.reg_account }}
              </div><br/>
               <div   class="">
                {{'昵称： ' + msg.nickname }}
              </div><br/>
               <div   class="">
                {{'密码： ' + msg.password }}
              </div><br/>
               <div   class="">
                {{'支付密码： ' + msg.pay_password  }}
              </div><br/>
               <div   class="">
                {{'状态： ' + msg.stLifeCycle }}
              </div>
              </div>
           </div>   
    </section>
   </div>
</template>
<script>
export default {
     props:['msg'],
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
.show-flex{
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;
    text-align: center;
    width: 100%;
}
</style>

