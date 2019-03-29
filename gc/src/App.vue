<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="activeName" @on-select="transfer">
                    <div class="layout-logo">
                        <img class="logo" src="./assets/gc_logo.jpg" alt="">
                        <p class="layout-logo-text">广财基建处</p>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="home" >
                            <Icon type="ios-navigate"></Icon>
                             首页
                        </MenuItem>
                        <MenuItem name="work_duty">
                            <Icon type="ios-keypad"></Icon>
                            工作职责
                        </MenuItem>
                        <MenuItem name="work_status">
                            <Icon type="ios-analytics"></Icon>
                            工作状态
                        </MenuItem>
                        <MenuItem name="policy">
                            <Icon type="ios-paper"></Icon>
                            政策法规
                        </MenuItem>
                        <MenuItem name="item_link">
                            <Icon type="ios-paper"></Icon>
                            项目链接
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 15rem',position:'relative'}">

                <transition name='ease-in'>
                  <router-view></router-view>
                </transition>
            </Content>
            <!-- <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer> -->
        </Layout>
    </div>
</template>
<script>
    export default {
        data (){
          return {
            activeName:"home"
          }
        },
        watch :{
            $route:function(n,o){
                this.activeName=n.name
            }
        },
        mounted (){
          var container=document.getElementsByClassName("layout")[0]
              container.style.height=window.innerHeight+'px'
              // console.log(container.style)
        },
        methods :{
            transfer(name){
                // alert(name)
                this.$router.push({name:name})
            }
        }
    }
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: auto;
    height: 100%;
    /* background: #5b6270; */
    border-radius: 3px;
    float: left;
    position: relative;
    /* top: 15px; */
    left: 20px;
}
.layout-logo-text{
    float: right;
    color:seashell;
    /* font-weight:698; */
    margin-left: 1rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1rem;
}
.logo {
    height: 90%;
    margin: 5% 0;
    border-radius: 0 0 40% 40%;
}
.layout-nav{
    width: auto;
    float:right;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
.ease-in-enter-active, .ease-in-leave-active {
  transition: opacity  .5s;
}
.ease-in-enter/* .ease-in-leave-active below version 2.1.8 */ {
  opacity: 0;
  position: absolute;
}
.ease-in-leave-to {
  opacity: 0;
  position: absolute;
  transform: scale(0)
}
</style>