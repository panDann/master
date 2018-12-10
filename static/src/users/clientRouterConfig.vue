<template>
    <div>
          <el-table
            element-loading-text="拼命加载中"
            highlight-current-row        
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            ref="multipleTable"
            :data="routerData"
            tooltip-effect="dark"
            max-height='700'
            border
            style="width: 100%"
           >
              <el-table-column
              type="selection"
              width="55">
              </el-table-column>

              <el-table-column
              label="客户名"
              width="">
              <template slot-scope="scope"  >
                  <span v-show="!scope.row.contenteditable" >{{ scope.row.name }}</span>
                  <el-select v-model="scope.row.name"  v-show="scope.row.contenteditable">
                                    <el-option :label="v" :value="v" v-for="v in routerNameList" :key="v"></el-option>
                  </el-select>
              </template>
              </el-table-column>

             <el-table-column
               label="优先级"
               width="">
              <template slot-scope="scope"  >
                  <span v-show="!scope.row.contenteditable" >{{ scope.row.priority }}</span>
                  <el-input v-model="scope.row.priority" v-show="scope.row.contenteditable" auto-complete="off" autofocus=true ></el-input>
              </template>
              </el-table-column>

             <el-table-column
              label="权重"
              width="">
              <template slot-scope="scope"  >
                  <span v-show="!scope.row.contenteditable" >{{ scope.row.weight }} (权重比：{{(scope.row.weight/sumWeight) | weightToFix}})</span>
                  <el-input v-model="scope.row.weight" v-show="scope.row.contenteditable" auto-complete="off" autofocus=true ></el-input>
              </template>
              </el-table-column>
             
              <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                  <el-button   @click="scope.row.contenteditable=true" v-show="!scope.row.contenteditable" size="small"  >修改</el-button>    
                  <el-button type="danger"  @click="deleteItem(scope.row)" v-show="!scope.row.contenteditable" size="small"  >删除</el-button>    
                  <el-button type="primary"  @click="modifyItem(scope.row)" v-show="scope.row.contenteditable" size="small"  >确定</el-button>    
                  <el-button type="danger"  @click="scope.row.contenteditable=false" v-show="scope.row.contenteditable" size="small"  >取消</el-button>    
              </template>
              </el-table-column>
        </el-table>
        <strong style="font-size:2rem;cursor:pointer;transition: transform .3s;" :class="{'add-show':addIndex,'add-not-show':!addIndex}" @click="addIndex=!addIndex">+</strong>
        <div style="display:inline-block;margin-left:1rem;">
                <el-select v-model="form.name"  v-show="addIndex">
                                    <el-option :label="v" :value="v" v-for="v in routerNameList" :key="v"></el-option>
                </el-select>
        </div>
         <div style="display:inline-block">
                                <el-input v-model="form.priority" v-show="addIndex" auto-complete="off" autofocus=true ></el-input>
        </div>
         <div style="display:inline-block">
                                <el-input v-model="form.weight" v-show="addIndex" auto-complete="off" autofocus=true ></el-input>
        </div>
        <div style="display:inline-block;margin-left:1rem;">
                                <el-button type='primary' v-show="addIndex" size='small' @click="addItem">添 加</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { lang } from '../../../../../../../Users/Administrator/Desktop/\u5C0F\u6210\u7EC4\u4EF6\u9875\u9762/static/node_modules/moment/moment';
export default {
    data(){ 
        return {
          routerData:[],
          routerNameList:[],
          addIndex:false,
          sumWeight:'',
          form:{
              name:'',
              priority:'',
              weight:'',
          }
        }
    },
    props:['msg'],
    mounted(){
        this.getTable()
    },
    filters:{
        weightToFix(value){
            return parseFloat(value).toFixed(2)
        },
    },
    methods:{
        getTable(){
                let url=`/api/user/client/downstream_allot?client_id=${this.msg}`
                axios.get(url)
                    .then((res)=>{
                        let tem=res.data.msg;
                            if(res.data.code==10000){
                                this.routerNameList=tem.name_list
                                this.sumWeight=this.addContenteditable(tem.downstream_list)
                                this.routerData=tem.downstream_list
                            }else{
                            this.$message({
                                message:res.data.msg,
                                type:'warning'
                            });
                            }
                    })
                    .catch((err)=>{
                            this.$message({
                                message:err,
                                type:'warning'
                            });
                    });
        },
        addContenteditable(obj){
            let sumWeight=new Number;
            for(let i=0,l=obj.length;i<l;i++){
                obj[i]['contenteditable']=false;
                sumWeight+=parseInt(obj[i].weight)
            }
            return sumWeight;
        },
        modifyItem(obj){
            let url=`/api/user/client/downstream_allot`,
                sendData=new FormData()
                for(let v in obj){
                    sendData.append(`${v}`,obj[v])
                }
                axios.put(url,sendData)
                    .then((res)=>{
                            if(res.data.code==10000){
                                this.$message({
                                message:'修改成功',
                                type:'success'
                            });
                            obj.contenteditable=false;
                            this.getTable()
                            }else{
                            this.$message({
                                message:res.data.msg,
                                type:'warning'
                            });
                            }
                    })
                    .catch((err)=>{
                            this.$message({
                                message:err,
                                type:'warning'
                            });
                    });
        },
        addItem(obj){
            let url=`/api/user/client/downstream_allot`,
                sendData=new FormData()
                for(let v in this.form){
                    sendData.append(`${v}`,this.form[v])
                }
                    sendData.append(`client_id`,this.msg)
                axios.post(url,sendData)
                    .then((res)=>{
                            if(res.data.code==10000){
                                this.$message({
                                message:'添加 成功',
                                type:'success'
                            });
                           this.addIndex=false;
                            this.getTable()
                            }else{
                            this.$message({
                                message:res.data.msg,
                                type:'warning'
                            });
                            }
                    })
                    .catch((err)=>{
                            this.$message({
                                message:err,
                                type:'warning'
                            });
                    });
        },
        deleteItem(obj){
            let url=`/api/user/client/downstream_allot?id=${obj.id}`,
                conf=confirm('确定要删除么？')
                if(!conf)return;
                axios.delete(url)
                    .then((res)=>{
                        let tem=res.data.msg;
                            if(res.data.code==10000){
                                this.$message({
                                message:'删除成功',
                                type:'success'});
                                this.getTable()
                            }else{
                            this.$message({
                                message:res.data.msg,
                                type:'warning'
                            });
                            }
                    })
                    .catch((err)=>{
                            this.$message({
                                message:err,
                                type:'warning'
                            });
                    });
        },
    }
}
</script>

<style>
.add-show{
    display: inline-block;
    transform: rotate(45deg);
}
.add-not-show{
    display: inline-block;
    transform: rotate(0deg);
}
</style>
