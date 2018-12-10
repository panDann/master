<template>
    <div style="position:relative">
                <div class="float-btn">
                    <el-button type='danger' @click="deleteAccount()">
                        删除选中项
                    </el-button>
                    
                    <el-button type='primary' @click="dialogFormVisible = true">
                        添加账号
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
        @selection-change="handleSelectionChange">
          <el-table-column
          type="selection"
          width="55">
          </el-table-column>
          <el-table-column
            label="用户名"
            width="">
            <template slot-scope="scope" > <span @click="triggerModify(scope.row)">{{ scope.row.username }}</span></template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="UID"
            width="100">
          </el-table-column>
     
          <el-table-column
          prop="nickname"
          label="昵称"
          width="">
          </el-table-column>

          <el-table-column
          prop="merchant_id"
          label="商户id"
          width="">
          </el-table-column>

          <el-table-column
          prop="last_login"
          label="上次登录时间"
          width="">
            <template slot-scope="scope">{{  scope.row.last_login  }}</template>

          </el-table-column>
          <el-table-column
          prop="notify_url"
          label="通知接口"
          width="">
          </el-table-column>

        </el-table>
         <!-- 模态框 -->
                <!-- 模态框 添加-->
                 <el-dialog title="添加转入账号" :visible.sync="dialogFormVisible" width="30%" :modal-append-to-body='false'>
                  <el-form :model="form">
                    <el-form-item label="账号" :label-width="formLabelWidth">
                       <el-input v-model="form.username" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth">
                      <el-input v-model="form.password" auto-complete="off" type="text"></el-input>
                    </el-form-item>
                     <el-form-item label="昵称" :label-width="formLabelWidth">
                        <el-input
                            placeholder="请填写昵称"
                            v-model="form.nickname">
                         </el-input>
                     </el-form-item>
                      <el-form-item label="角色" :label-width="formLabelWidth">
                        <el-select
                            placeholder="请选择角色"
                            multiple
                            value-key
                            v-model="form.role">
                            <el-option :label='v[0]' :value="v[1]" :key="v[1]" v-for="v in roleList" :value-key='v[1]'></el-option>
                         </el-select>
                     </el-form-item>
                  </el-form>
                    <div slot="footer" >
                        <!-- <el-button @click="dialogFormVisible=false">取 消</el-button> -->
                        <el-button type="primary" @click="addAccount()">确 定</el-button>
                    </div>
                </el-dialog>  

                 <!-- 模态框 修改-->
                 <el-dialog title="添加转入账号" :visible.sync="dialogModifyVisible" width="30%" :modal-append-to-body='false'>
                  <el-form :model="modify">
                    <el-form-item label="密码" :label-width="formLabelWidth">
                      <el-input v-model="modify.password" auto-complete="off" type="text"></el-input>
                    </el-form-item>
                     <el-form-item label="昵称" :label-width="formLabelWidth">
                        <el-input
                            placeholder="请填写昵称"
                            v-model="modify.nickname">
                         </el-input>
                     </el-form-item>
                      <el-form-item label="角色" :label-width="formLabelWidth" v-if="updateItem">
                        <el-select
                            placeholder="请选择角色"
                            multiple
                            @change="uniqueSelect"
                            v-model="modify.role">
                            <el-option :label='v[0]' :value="v[1]" :key="v[1]" v-for="v in roleList" ></el-option>
                         </el-select>
                     </el-form-item>
                  </el-form>
                    <div slot="footer" >
                        <!-- <el-button @click="dialogFormVisible=false">取 消</el-button> -->
                        <el-button type="primary" @click="modifyAccount()">确 定</el-button>
                    </div>
                </el-dialog>  
    </div>
</template>

<script>

import axios from 'axios'
import Qs from 'qs'
import moment from 'moment'
export default {
     data (){
        return {
          loading2:false,//控制加载延迟
          tableData3: [],//表格数据
          money:'',
          multipleSelection: [],// 批量删除
          dialogFormVisible: false,//模态框
          dialogModifyVisible:false,//修改框控制显示
          formLabelWidth: '80px',//模态框的宽度      
          commodities:[],//商品总数
          roleList:[],
          updateItem:true,
          form :{//模态框数据
                username: '',
                password: '',
                nickname: '',
                role:[],
            },
           modify :{//模态框数据
                id:"",
                password: '',
                nickname: '',
                role:[],
            },
    
      }           
        
    },//data end

    mounted(){
        this.getTable();
    },
    methods: {
       addAccount(){
            this.dialogFormVisible=false;
            let sendStr=this.formdata(this.form);
            axios.post('/api/user/merchant',sendStr).then((res)=>{
                    if(res.data.code==10000){
                        this.$message({
                            message:'添加成功',
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
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getTable(){
              this.loading2=true;
              let url=`/api/user/merchant`
               axios.get(url,).then((res)=>{
                   if(res.data.code==10000){
                       let tem=res.data.msg;
                         for(let i=0,len=tem.length;i<len;i++){

                                tem[i].last_login=moment(tem[i].last_login).utc().zone(0).format('YYYY-MM-DD HH:mm:ss')
                            }
                       this.tableData3=tem;
                       this.roleList=res.data.role;
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
     triggerModify(obj){
         this.dialogModifyVisible=true;
         this.modify.id=obj.id
         this.modify.password=''
         this.modify.nickname=obj.nickname
         this.updateItem=false
         this.modify.role=obj.role_id? obj.role_name.split(','):''
         this.$nextTick(()=>{
             this.updateItem=true;
         })
     },
     modifyAccount(){
            this.dialogModifyVisible=false;
            let sendStr=this.formdata(this.modify);
            axios.put('/api/user/merchant',sendStr).then((res)=>{
                    if(res.data.code==10000){
                        this.$message({
                            message:'修改成功',
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
     uniqueSelect(){
        //  console.log(this.modify.role)
     },
      parseSelect(obj){
         for(let i=0,l=this.roleList.length;i<l;i++){
             for(let j=0,k=obj.length;j<k;j++){
                 if(this.roleList[i][0]==obj[j]){
                        obj[j]=this.roleList[i][1]
                 }
             }
         }
         obj=Array.from(new Set(obj))
         return obj
     },
      deleteAccount(){
          let len=this.multipleSelection.length;
          if(!len){
              this.$message({
                message:'勾选项为空',
                type:'warning'
              })
              return;
          }else{
            let sendArr=[];
                for(let i=0;i<len;i++){
                  sendArr.push(this.multipleSelection[i].id)
                }
            let comf=confirm('确定要删除么？')
            if(comf){
                   axios.delete(`/api/user/merchant?id=${sendArr}`,)
                 .then((res)=>{
                    if(res.data.code==10000){
                       this.$message({
                        message:res.data.msg,
                        type:'success'
                        });
                        this.getTable()
                    }else{
                       this.$message({
                        message:res.data.msg,
                         type:'warning'
                        })
                    }
                 });
            }else{
              return;
            }
           
          }
      },
    formdataTime(arr){
          for(let i=0,len=arr.length;i<len;i++){
              arr[i].last_time=moment(arr[i].last_time).utc().zone(-0).format('YYYY-MM-DD HH:mm:ss')
          }
          return arr
    },
   formdata(obj){
            if(obj.id){
                obj.role=this.parseSelect(obj.role)
            }
           let r=new FormData()
           for (let v in obj){
               r.append(`${v}`,obj[v])
           }
           return r
       }, 
  
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
