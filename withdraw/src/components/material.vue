<template>
  <div id="app">
      <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left">
            <mu-icon value="CS"></mu-icon>
            </mu-button>
               提现记录
            <mu-button flat slot="right" @click="refreshData">
                <img src="../assets/refresh.png" alt="" style="width:20px" :class="{rotate:refresh}" >
            </mu-button>
        </mu-appbar>


                    <mu-paper :z-depth="5">
                        <mu-data-table :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list" 
                         data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" 
                        >
                          <template slot-scope="scope">
                                            <td class="is-left" style="overflow:hidden;overflow-text:ellipsis;white-space:nowrap">{{scope.row.order_no}}</td>
                                            <td class="is-left">{{scope.row.receipt_amount}}</td>
                                            <td class="is-center">{{handleStatus(scope.row.status)}}</td>
                                            <td class="is-center"><span style="color:#67c23a">{{formdataTime(scope.row.create_time)}}</span></td>
                                            <td class="is-left">
                                                {{scope.row.no_login? '':'未到账'}}
                                            </td>
                          </template>
                        </mu-data-table>
                      </mu-paper>

    <footer class="footer">
     <mu-button color="green"  @click="turnPage('pre')" :disabled='!page'>上一页</mu-button> 
       <mu-chip class="demo-chip" >
    <!-- {{dataRange}} -->
      </mu-chip>
     <mu-button color="info"  @click="turnPage('next')" :disabled='!page'>下一页</mu-button>
    </footer>
  </div>
</template>

<script>

import Axios from 'axios'
import moment from 'moment';

export default {
  name: 'app',
   data () {
    return {
        sort: {
        name: '',
        order: 'asc'
      },
      columns:  [
                { title: '订单号', name: 'cTime', width: 120, align: 'left',  },
                { title: '提现金额', width: 150, name: 'num_total',align: 'left',sortable:true },
                { title: '状态', name: 'verification_code', width: 126, align: 'center', },
                { title: '提现时间', name: 'no_login', width: 200, align: 'center', },
                { title: '到账时间', name: 'success_register', width: 200, align: 'left', },
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
                return  this.formdataTime(l[l.length-1].create_time).match(/\d\d-\d\d$/ig)[0]+"~"+this.formdataTime(l[0].create_time).match(/\d\d-\d\d$/ig)[0]
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
          let sendStr=`/api/transfer/withdraw/record?page_size=${this.pageSize}`;
          Axios.get(sendStr,)
          .then((res)=>{
              this.loading=false;
              if(res.data.code==10000){
                this.list=res.data.msg.records
                 let [...t]=this.list
                     this.listMirror=t;
                this.page=Math.ceil(res.data.msg.total/this.pageSize);
                // this.checkPageButton()
              }else{
                  this.$toast.error(res.data.msg)
              }
          })
          .catch((err)=>{
              console.log(err)
          })
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
      refreshData(){
               this.refresh=true;
               let sendStr=`/api/transfer/withdraw/record?page=${this.currentPage}&page_size=${this.pageSize}`;
               Axios.get(sendStr,)
                    .then((res)=>{
                        this.refresh=false;
                        if(res.data.code==10000){
                          this.$toast.success('刷新成功')
                          this.list=res.data.msg.records
                          let [...t]=this.list
                             this.listMirror=t;
                        }else{
                         this.$toast.error(res.data.msg)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
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
                         this.$toast.error(res.data.msg)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
      },
      checkPageButton(index){
         if(index=='pre'){
              if(this.currentPage==1){
                this.$toast.error('已经是首页')
                this.loading=false;
                return 0
              }else{
                this.currentPage--
              }
         }else if(index="next"){
             if(this.currentPage==this.page){
                this.$toast.error('已经是尾页')
                this.loading=false;
                return 0
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
