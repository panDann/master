<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="home" @on-select="transfer">
                    <div class="layout-logo">广财基建</div>
                    <div class="layout-nav">
                        <!-- <MenuItem name="home" >
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
                        </MenuItem> -->
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 15rem'}">
                <router-view></router-view>
              
            </Content>
            <!-- <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer> -->
        </Layout>
    </div>
</template>
<script>
    export default {
        data (){
          return {

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
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
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
</style>