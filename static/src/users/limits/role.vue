<template>
    <div style="position:relative">
                <div class="float-btn">
                    <el-button type='danger' @click="deleteAccount()">
                        删除选中项
                    </el-button>
                    <el-button type='primary' @click="dialogFormVisible = true">
                        创建角色
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
            label="角色名"
            width="">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
       
          <el-table-column
          label="拥有权限"
          width="">
            <template slot-scope="scope"><el-button type='primary' size="mini" @click="getCheckLimit(scope.row)">点 击 查 看</el-button></template>
          </el-table-column>

        </el-table>
         <!-- 模态框 -->
                <!-- 模态框 添加-->
                 <el-dialog title="创建角色" :visible.sync="dialogFormVisible" width="30%" :modal-append-to-body='false'>
                  <el-form :model="form">
                    <el-form-item label="角色名" :label-width="formLabelWidth">
                       <el-input v-model="form.role" auto-complete="off" ></el-input>
                    </el-form-item>
                  </el-form>
                    <div slot="footer" >
                        <!-- <el-button @click="dialogFormVisible=false">取 消</el-button> -->
                        <el-button type="primary" @click="addRole()">确 定</el-button>
                    </div>
                </el-dialog>  

                 <!-- 模态框 添加-->
                 <el-dialog title="修改/分配角色权限" :visible.sync="dialogModifyVisible" width="30%" :modal-append-to-body='false'>
                  <el-form :model="modify">
                    <el-form-item label="角色名" :label-width="formLabelWidth">
                       <el-input v-model="modify.role" auto-complete="off" ></el-input>
                    </el-form-item>
                    <div style="max-height:20rem;overflow:auto" v-if="update">
                        <el-tree
                        :data="limitList"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="checkedList"
                        :props="defaultProps"
                        @check-change="getChecked">
                        </el-tree>
                    </div>
                  </el-form>
                    <div slot="footer" >
                        <el-checkbox v-model="checkedAll" @change="handleSelectAll">全 选</el-checkbox>
                        <el-button type="primary" @click="modifyRole()">确 定</el-button>
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
          limitList:[],
          checkedList:[],
          update:true,
          multipleSelection: [],// 批量删除
          dialogFormVisible: false,//模态框
          dialogModifyVisible:false,//修改框控制显示
          formLabelWidth: '80px',//模态框的宽度 
          checkedAll:false,
          form :{//模态框数据
                role: '',
            },
          modify:{//模态框数据
                role: '',
            },
          defaultProps: {
            children: 'children',
            label: 'label'
          }
      }           
        
    },//data end

    mounted(){
        this.getTable();
    },
    methods: {
     
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
              let url=`/api/user/role`
               axios.get(url,).then((res)=>{
                   let tem=res.data.msg;
                   if(res.data.code==10000){
                       this.limitList=this.formdataTree(tem.routes)
                       this.tableData3=tem.roles;
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
        addRole(){
                this.dialogFormVisible=false;
                let sendStr=new FormData();
                    sendStr.append('name',this.form.role)
                axios.post('/api/user/role',sendStr).then((res)=>{
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
        getCheckLimit(obj){
            this.dialogModifyVisible=true;
            this.modify.role=obj.name
            this.modify.id=obj.id
            axios.get(`/api/user/role_route_relation?role_id=${obj.id}`).then((res)=>{
                        let tem=res.data.msg
                        if(res.data.code==10000){
                            this.update=false
                            let temArr=[]
                            tem.forEach(item=>{
                                    temArr.push(item.route_id)
                            })
                            this.checkedList=temArr
                                this.$nextTick(()=>{
                                    this.update=true
                                })
                            }else{
                            this.$message({
                                message:res.data.msg,
                                type:'warning'
                                })
                            }
                });
        },
        modifyRole(){
                this.dialogModifyVisible=false;

                let sendRole=new FormData(),
                    sendName=new FormData()
                    sendRole.append('route_id',this.checkedList)
                    sendRole.append('role_id',this.modify.id)
                    sendName.append('name',this.modify.role)// 角色名跟权限配置是分开的
                    sendName.append('id',this.modify.id)
                axios.put('/api/user/role',sendName).then((res)=>{
                        if(res.data.code==10000){
                                this.getTable(); 
                            }else{
                            this.$message({
                                message:res.data.msg,
                                type:'warning'
                                })
                            }
                });
                axios.post('/api/user/role_route_relation',sendRole).then((res)=>{
                        if(res.data.code==10000){
                            this.$message({
                                message:'配置成功',
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
        getChecked(){
            let t=Array.from(new Set(this.$refs.tree.getCheckedKeys()))
            t.shift()
            this.checkedList=t
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
                    axios.delete(`/api/user/role?id=${sendArr}`,)
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
            console.log(this.multipleSelection)
        },
        formdataTree(obj){

            let temA=[],temU=[],re=[];
            for(let i=0,l=obj.length;i<l;i++){
                temA.push(obj[i][0])
            }
            temU=Array.from(new Set(temA));
            for(let i=0,l=temU.length;i<l;i++){
                let count=0;
                re[i]={}
                re[i].label=temU[i]
                re[i].children=[]
                for(let j=0,l=obj.length;j<l;j++){
                        if(temU[i]==obj[j][0]){
                            re[i].children[count]={}
                            re[i].children[count].id=obj[j][2]
                            re[i].children[count].label=obj[j][1]
                            count++
                        }
                }
            }
            return re
        },
        formdataTime(arr){
            for(let i=0,len=arr.length;i<len;i++){
                arr[i].last_time=moment(arr[i].last_time).utc().zone(-0).format('YYYY-MM-DD HH:mm:ss')
            }
            return arr
        },
        handleSelectAll(){
            let tem=[]
            this.update=false
            if(!this.checkedAll){
                tem=[]
            }else{
                for (let i=0,l=this.limitList.length;i<l;i++){
                        for(let v of this.limitList[i].children){
                             tem.push(v.id)
                        }
                }
            }
            this.checkedList=tem;
            this.$nextTick(()=>{
                this.update=true
            })
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
