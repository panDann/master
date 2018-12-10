<template>
    <div id="head">
            <Menu mode="horizontal" :theme="theme1" :active-name="activeIndex" style="padding-left:15%" @on-select="test">
                <MenuItem name="/receipt_record">
                  <Icon type="ios-list-box" />
                    收款记录
                </MenuItem>
                <MenuItem name="/record">
                    <Icon type="ios-paper" />
                    提现记录
                </MenuItem>
                <MenuItem name="/account_manager">
                    <Icon type="ios-card" />
                       
                    银行卡管理
                </MenuItem>
                <!-- <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-stats" />
                    </template>
                    <MenuGroup title="使用">
                        <MenuItem name="3-1">新增和启动</MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="留存">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu> -->
                 <MenuItem name="/withdraw">
                    <Icon type="logo-bitcoin" />
                    提现
                </MenuItem>
                <MenuItem name="/mine">
                    <Icon type="md-person" />
                    我的主页
                </MenuItem>
            </Menu>
            <br>
            <RadioGroup v-model="theme1" v-show="!theme1">
                <Radio label="light"></Radio>
                <Radio label="dark"></Radio>
                <Radio label="primary"></Radio>
            </RadioGroup>

        
    </div>
</template>

<script>
   import {mapState} from 'vuex';
export default {
    data(){
        return{
            theme1:'dark',
            value2:false,
            routerList: {
                receipt_record:{active:false,list:[{}]},
                record:{active:false,list:[{}]},
                account_manager:{active:false,list:[{}]},
                mine:{active:true,list:[{router:"/interface_docu",label:"接口文档"}]},
                withdraw:{active:false,list:[{}]},
            },
        }
    },
    props:["show"],
    computed:mapState({
        activeIndex:'routerIndex'
    }),
    mounted(){
          !sessionStorage.routerIndex?  this.transferRouterList("/mine"):this.transferRouterList(sessionStorage.routerIndex)
    },
    methods:{
        test(v){
            this.$router.push(v)
            sessionStorage.routerIndex=v
            this.transferRouterList(v)
        },
        transferRouterList(v){
            let vIndex=v.replace(/\//g,"")
            if(this.routerList[vIndex].active){
                this.$emit("update:show",this.routerList[vIndex].list)
            }else{
                this.$emit("update:show",0)
            }
        }

    }
}
</script>

<style>
#head{
    margin: 0;
    height: 60px;
}
</style>
