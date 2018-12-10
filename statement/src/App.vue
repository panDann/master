<template>
  <div id="app">
      <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left">
            <mu-icon value="We"></mu-icon>
            </mu-button>
               验证码表

            <mu-button flat slot="right" @click="refreshData">
                <img src="./assets/refresh.png" alt="" style="width:32px" :class="{rotate:refresh}" >
            </mu-button>
        </mu-appbar>


                    <mu-paper :z-depth="5">
                        <mu-data-table :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list" 
                         data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading"
                        >
                          <template slot-scope="scope">
                            <td class="is-left">{{scope.row.cTime}}</td>
                            <td class="is-left">{{scope.row.num_total}}</td>
                            <td class="is-left">{{scope.row.verification_code}}</td>
                            <td class="is-left"><span style="color:red">{{scope.row.no_login}}</span></td>
                            <td class="is-center"><span style="color:#67c23a">{{scope.row.success_register}}</span></td>

                          </template>
                        </mu-data-table>
                      </mu-paper>

    <footer class="footer">
     <mu-button color="green"  @click="turnPage('pre')">上一页</mu-button> 
       <mu-chip class="demo-chip" >
    {{dataRange}}
      </mu-chip>
     <mu-button color="info"  @click="turnPage('next')">下一页</mu-button>
    </footer>
  </div>
</template>

<script>

import Axios from 'axios'


export default {
  name: 'app',
   data () {
    return {
        sort: {
        name: '',
        order: 'asc'
      },
      columns: [
          { title: '日期', name: 'cTime', width: 120, align: 'right',  },
          { title: '号码总数', width: 126, name: 'num_total',align: 'left', },
          { title: '验证码数', name: 'verification_code', width: 100, align: 'center', sortable: true },
          { title: '长期未登录', name: 'no_login', width: 100, align: 'center', sortable: true },
          { title: '找回数', name: 'success_register', width: 100, align: 'center', sortable: true },
      ],
      list: [
      ],
      listMirror:[],
      pageSize:8,
      currentPage:1,      
      page:'',
      loading: false,
      refresh:false,

    }
  },
  computed:{
      dataRange:function(){
            if(this.list.length){
                let [...l]=this.listMirror
                return l[l.length-1].cTime.match(/\d\d-\d\d$/ig)[0]+"~"+l[0].cTime.match(/\d\d-\d\d$/ig)[0]

            }else{
              return "日期范围"
            }
      },
  },
  mounted(){
    this.getTable()
  },
  methods: {
    handleSortChange({name, order}){
             this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },
      getTable(){
          this.loading=true;
          let sendStr=`/api/reports/daily_register?&page_size=${this.pageSize}`;
          Axios.get(sendStr,)
          .then((res)=>{
              this.loading=false;
              if(res.data.code==10000){
                this.list=res.data.msg
                 let [...t]=this.list
                     this.listMirror=t;
                this.page=res.data.total%this.pageSize? parseInt(res.data.total/this.pageSize)+1:parseInt(res.data.total/this.pageSize);
                // this.checkPageButton()
                console.log(this.list)
              }else{
                 alert(res.data.msg)
              }
          })
          .catch((err)=>{
              console.log(err)
          })
      },
      refreshData(){
               this.refresh=true;
               let sendStr=`/api/reports/daily_register?page=${this.currentPage}&page_size=${this.pageSize}`;
               Axios.get(sendStr,)
                    .then((res)=>{
                        if(res.data.code==10000){
                          this.refresh=false;
                          this.$toast.success('刷新成功')
                          this.list=res.data.msg
                          let [...t]=this.list
                             this.listMirror=t;
                        }else{
                         alert(res.data.msg)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
      },
      turnPage(index){
               this.loading=true;
               this.checkPageButton(index);
               let sendStr=`/api/reports/daily_register?page=${this.currentPage}&page_size=${this.pageSize}`;
               Axios.get(sendStr,)
                    .then((res)=>{
                        if(res.data.code==10000){
                          this.loading=false;

                          this.list=res.data.msg
                          let [...t]=this.list
                             this.listMirror=t;
                        }else{
                         alert(res.data.msg)

                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
      },
      checkPageButton(index){
        // alert(this.currentPage)
         if(index=='pre'){
              if(this.currentPage==1){
                this.$toast.error('已经是首页')
                          this.loading=false;

              }else{
                this.currentPage--
              }
         }else if(index="next"){
             if(this.currentPage==this.page){
                this.$toast.error('已经是尾页')
                          this.loading=false;

              }else{
                this.currentPage++
              }
         }else{
           
         }
          
      },// f end

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
