<template>
    <div style="position:relative">
                 <div class="float-btn">
                    <el-button type='primary' @click="refreshLimit">
                        更新权限
                    </el-button>
                </div>
      <el-table
        v-loading="loading2"
        highlight-current-row        
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        ref="multipleTable"
         border
        :data="tableData3"
        tooltip-effect="dark"
        max-height='700'
        style="width: 100%"
        >
      
          <el-table-column
            label="权限名"
            width="">
            <template slot-scope="scope">{{ scope.row.description }}</template>
          </el-table-column>
      
         
          <el-table-column
          label="所属权限组"
          width="">
            <template slot-scope="scope">{{  scope.row.group  }}</template>
          </el-table-column>

          <el-table-column
          label="权限URL"
          width="">
            <template slot-scope="scope">{{  scope.row.url  }}</template>
          </el-table-column>

           <el-table-column
          label="权限方法"
          width="">
            <template slot-scope="scope">{{  scope.row.method  }}</template>
          </el-table-column>
         <el-table-column
          label="操作"
          width="">
            <template slot-scope="scope"><el-button type='primary' size="mini" @click="triggerModifyF(scope.row)">修 改</el-button></template>
          </el-table-column>
        </el-table>
         <!-- 模态框 -->
                <!-- 模态框 添加-->
                 <el-dialog title="添加转入账号" :visible.sync="triggerModify" width="30%" :modal-append-to-body='false'>
                     url：{{show.url}} 方法：{{show.method}}
                  <el-form :model="form">
                    <el-form-item label="权限名" :label-width="formLabelWidth">
                       <el-input v-model="form.description" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="权限组名" :label-width="formLabelWidth">
                       <el-input v-model="form.group" auto-complete="off" ></el-input>
                    </el-form-item>
                  </el-form>
                    <div slot="footer" >
                        <el-button @click="triggerModify=false">取 消</el-button>
                        <el-button type="primary" @click="addAccount()">确 定</el-button>
                    </div>
                </el-dialog>  
    </div>
</template>

<script>

import axios from 'axios'
import Qs from 'qs'
import moment from 'moment'
import { Form } from 'element-ui';
export default {
     data (){
        return {
          loading2:false,//控制加载延迟
          tableData3: [],//表格数据
          triggerModify: false,//模态框
          dialogModifyVisible:false,//修改框控制显示
          formLabelWidth: '80px',//模态框的宽度      
          commodities:[],//商品总数
          roleList:[],
          form :{//模态框数据
                id:'',
                description: '',
                group: '',
            },
          show:{
            url:'',
            method:"",
          }
      }           
        
    },//data end

    mounted(){
        this.getTable();
    },
    methods: {
        addAccount(){
            this.form.id
            this.triggerModify=false;
            let sendStr=this.formdata(this.form)
            axios.put('/api/user/route',sendStr).then((res)=>{
                    if(res.data.code==10000){
                        this.$message({
                            message:res.data.msg,
                            type:'success'
                            });
                            this.getTable(); 
                        }else{
                        this.$message({
                            message:res.data.msg,
                            type:'warning'
                            })
                        }
            });
        },
    
      getTable(){
              this.loading2=true;
              let url=`/api/user/route`
               axios.get(url,).then((res)=>{
                    let tem=res.data.msg;
                   if(res.data.code==10000){
                       this.tableData3=tem;
                       this.loading2=false;
                   }else{
                       this.$message({
                            message:res.data.msg,
                            type:'warning'
                       })
                   }
                  
               })
               .catch((err)=>{
                    console.error(err)
               });
       },//get table data
       formdata(obj){
           let r=new FormData()
           for (let v in obj){
               r.append(`${v}`,obj[v])
           }
           return r
       },   
       refreshLimit(){
              this.loading2=true;
              let url=`/api/user/route?refresh=1`
               axios.get(url,).then((res)=>{
                    let tem=res.data.msg;
                   if(res.data.code==10000){
                       this.tableData3=tem;
                       this.loading2=false;
                   }else{
                       this.$message({
                            message:res.data.msg,
                            type:'warning'
                       })
                   }
                  
               })
               .catch((err)=>{
                    console.error(err)
               });
       },
       triggerModifyF(obj){
           this.triggerModify=true;
           this.form.id=obj.id;
           this.form.description=obj.description
           this.form.group=obj.group
           this.show.url=obj.url
           this.show.method=obj.method

       }
    },
}
</script>

<style>
.float-btn{
    position: absolute;
    z-index: 100;
    right: 5px;
    top: -50px;
}
</style>
