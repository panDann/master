<template>
  <div id="auto-withdraw" style="text-align:center;margin:0 auto;width:80%;overflow:auto;">
     
      <Table ref="selection" border :columns="columns5" :data="tableData"   @on-selection-change="handleSelect" ></Table>
      <br>
      <!-- <Col span="16">
        <Page :total="page" :current="currentPage" :page-size='pageSize' />
      </Col> -->
       <Button @click="addModal=true" type="primary">增 加 账 户</Button>
       <Button @click="deleteItem" type="error">删 除 账 户</Button>
        <Modal
        title="添加"
        v-model="addModal"
        class-name="vertical-center-modal" @on-ok="sendMsg" >
                <Form ref="form" :model="form"  :label-width="80">
                    
                    <FormItem label="姓名" prop="name">
                        <Input v-model="form.name" placeholder="银行卡姓名"></Input>
                    </FormItem>
                    <FormItem label="银行卡号" prop="bank_account">
                        <Input v-model="form.bank_account" placeholder="银行卡号"></Input>
                    </FormItem>
                    <FormItem label="账户类型" prop="bank_type">
                        <Select v-model="form.bank_type" placeholder="选择账户类型" >
                                    <Option value="1" >个人账户</Option>
                                    <Option value="2" >企业账户</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="地区">
                            <Col span="12">
                                <Select v-model="form.area1" placeholder="选择省份" @on-change="handleCity">
                                    <Option :value="i" v-for="(item,i) in provinceData" :key="i">{{item[0].province}}</Option>
                                </Select>
                            </Col>
                        
                            <Col span="12">
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
                </Form>
        </Modal>
        <Modal
        title="修改"
        v-model="modifyModal"
        class-name="vertical-center-modal" @on-ok="sendModifyMsg" >
                <Form :model="modify"  :label-width="80">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="modify.name" placeholder="银行卡姓名"></Input>
                    </FormItem>
                    <FormItem label="银行卡号" prop="bank_account">
                        <Input v-model="modify.bank_account" placeholder="银行卡号"></Input>
                    </FormItem>
                    <FormItem label="账户类型" prop="bank_type">
                        <Select v-model="modify.bank_type" placeholder="选择账户类型" >
                                    <Option value="1" >个人账户</Option>
                                    <Option value="2" >企业账户</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="地区">
                            <Col span="12">
                                <Select v-model="modify.area1" placeholder="选择省份" @on-change="handleModifyCity">
                                    <Option :value="i" v-for="(item,i) in provinceData" :key="i">{{item[0].province}}</Option>
                                </Select>
                            </Col>
                        
                            <Col span="12">
                                <Select v-model="modify.area2" placeholder="选择市" >
                                    <Option :value="v['name']" v-for="(v) in cityData" :key="v['name']">{{v['name']}}</Option>
                                </Select>
                            </Col>
                    </FormItem>
                    <FormItem label="银行名称" prop="bank_name">
                        <Input v-model="modify.bank_name" placeholder="银行名称"></Input>
                    </FormItem>
                    <FormItem label="支行名称" prop="branch_bank_name">
                        <Input v-model="modify.branch_bank_name" placeholder="支行名称"></Input>
                    </FormItem>
                </Form>
        </Modal>
       <!-- <Button @click="handleSelectAll(false)">Cancel all selected</Button> -->
  </div>
</template>

<script>

import Axios from 'axios'
import moment from 'moment';
import Area from './area';
export default {
  name: 'app',
   data () {
    return {
     amount:10000|'',
     selectData:[],
      form:{
            bank_account:'',
            name:'',
            area1:'',
            bank_type:'',
            area2:'',
            area:'',
            bank_name:'',
            branch_bank_name:'',
      },
      modify:{
            id:'',
            bank_account:'',
            name:'',
            area1:'',
            bank_type:'',
            area2:'',
            area:'',
            bank_name:'',
            branch_bank_name:'',
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
                        title: '账户类型',
                        key: 'bank_type',
                        width:150,
                        render:(h,pa)=>{
                            return h('span',pa.row.bank_type==1? '个人账户':'企业账户')
                        }
                    },
                    {
                        title: '银行名称',
                        key: 'bank_name',
                        width:150
                    },

                    {
                        title: '支行名称',
                        key: 'branch_bank_name',
                    },
                     {
                        title: '区域',
                        key: 'area',
                    },
                    {
                        title: '操作',
                        width:100,
                        // key: 'branch_bank_name',
                        render:(h,param)=>{
                            return h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                    ghost:true
                                },
                                on: {
                                    click: () => {
                                        this.modifyItem(param.row)
                                    }
                                }
                            }, '修 改')
                        }
                    },
                   
    ],
    tableData: [{
        name:'ken',
        key:'state'
    }],
      cityData:[{
                name:'请先选择省份'
            }],
      provinceData:Area,
      pageSize:8,
      currentPage:1,      
      page:100,

   
      addModal:false,
      modifyModal:false,
     }
  },
  computed:{
     
  },
  props:['msg'],
  mounted(){
    this.amount=this.msg;
    parseInt(this.amount)<10000? this.amount=10000:''
    this.getTable()
  },
 
  methods: {
    handleSelect(sel,o){
        this.selectData=[];
        for(let i=0,l=sel.length;i<l;i++){
            this.selectData.push(sel[i].id)
        }
    },
    handleCity(){
        //  alert(this.form.area1)
        this.form.area2=''
        this.cityData=this.provinceData[this.form.area1]
     },
     handleModifyCity(){
        //  alert(this.form.area1)
        this.modify.area2=''
        this.cityData=this.provinceData[this.modify.area1]
     },
    limitAmount(){
        if(parseInt(this.amount)>100000 || parseInt(this.amount)<10000){
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
         let url=`/api/transfer/bank_card`,
             sendData=this.formdataPost(this.form)
             if(!sendData)return;
             Axios.post('/api/transfer/bank_card',sendData).then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                        this.$Message.success('添加成功')
                        this.getTable()
                    }else{
                       this.$Message.error(tem.msg)
                    }
            })
            // .catch(err=>{
            //            this.$Message.error('系统故障')
            // })
     },
      formdataPost(obj){
        let sendData=new FormData()
        for(let v in obj){
            if(v=='area'||v=='area2'||v=='save')continue;
            if(!obj[v]){
                this.$Message.error('信息未填写完整')
                return 0
            }
              v=='area1'? sendData.append('area',typeof this.provinceData[obj['area1']]=='undefined'? obj['area1']+','+obj['area2']:this.provinceData[obj['area1']] [0].province+','+obj['area2']):
                          sendData.append(`${v}`,obj[v])
        }
        return sendData
     },
      turnPage(){
               let sendStr=`/api/transfer/bank_card?page=${this.currentPage}&page_size=${this.pageSize}`;
               Axios.get(sendStr,)
                    .then((res)=>{
                        if(res.data.code==10000){
                        }else{
                         this.$Message.error(res.data.msg)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
      },
      modifyItem(obj){
            this.modifyModal=true;
            this.modify.id=obj.id
            this.modify.bank_account=obj.bank_account
            this.modify.name=obj.name
            this.modify.area1=obj.area.split(',')[0]
            this.modify.area2=obj.area.split(',')[1]
            this.matchProvinceId(this.modify.area1)
            this.modify.bank_type=obj.bank_type
            this.modify.bank_name=obj.bank_name
            this.modify.branch_bank_name=obj.branch_bank_name
      },
    matchProvinceId(value){
            for(let v in this.provinceData){
                // console.log(this.provinceData[v][0].province)
                if(this.provinceData[v][0].province==value){
                    this.modify.area1=v;
                    this.cityData=this.provinceData[this.modify.area1]
                    break;
                }
            }
     },
      sendModifyMsg(){
           let url=`/api/transfer/bank_card`,
             sendData=this.formdataPost(this.modify)
             if(!sendData)return;
             Axios.put('/api/transfer/bank_card',sendData).then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                        this.$Message.success('修改成功')
                        this.getTable()
                    }else{
                       this.$Message.error(tem.msg)
                    }
            })
      },
      deleteItem(){
         
          let url=`/api/transfer/bank_card?id=${this.selectData}`,
              sendData=new URLSearchParams()
              if(!this.selectData.length){
                  this.$Message.error('未选择条目')
                  return
              }
         let conf=confirm(`确定要删除么？`)
              if(!conf)return;
             sendData.append('id',this.selectData)
             Axios.delete(url,sendData).then((res)=>{
                    let tem=res.data
                    if(tem.code==10000){
                        this.$Message.success('删除成功')
                        this.getTable()
                    }else{
                       this.$Message.error(tem.msg)
                    }
            })
      },
    }// methods end 
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
