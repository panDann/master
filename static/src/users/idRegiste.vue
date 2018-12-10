<template>
    <div >
     <el-col :span='24' class="config-main">
        <el-col>
            <div class="acc-btn">
                  <span class="out-span" style="color:snow;"><span style="color:yellow;font-size:inherit">身份</span>信息表</span>
                  <el-button type='danger' @click="deleteItem">
                      删除选中项
                  </el-button>
                  <el-button type='primary' @click="dialogFormVisible = true">
                      添加
                  </el-button>
            </div>     
        </el-col>
           <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            highlight-current-row        
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            max-height='700'
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">

              <el-table-column
              type="selection"
              width="55">
              </el-table-column>

              <el-table-column
              label="姓名"
              width="80">
              <template slot-scope="scope">
                {{scope.row.name}}
              </template>
              </el-table-column>

            <el-table-column
              label="身份证"
              width="200">
              <template slot-scope="scope">
                {{scope.row.idcard}}
              </template>
              </el-table-column>

             <el-table-column
              label="正面照"
              width=""
              show-overflow-tooltip
              >
                <template slot-scope="scope">
                    <el-popover placement="right" trigger="hover">
                                 <img :src="scope.row.front_img+'?'+Math.random()" style="width:20rem;height:10rem;">
                                <span style="display:inline-block;color:green;max-width:5rem;text-overflow:ellipsis;overflow:hidden;" slot='reference'>{{scope.row.front_img}}</span>
                     </el-popover>
                </template>
              </el-table-column>

              <el-table-column
              label="背面照"
              width=""
              show-overflow-tooltip
              >
                <template slot-scope="scope">
                    <el-popover placement="right" trigger="hover">
                                 <img :src="scope.row.back_img+'?'+Math.random()" style="width:20rem;height:10rem;">
                                <span style="display:inline-block;color:green;max-width:5rem;text-overflow:ellipsis;overflow:hidden;" slot='reference'>{{scope.row.back_img}}</span>
                     </el-popover>
                </template>
              </el-table-column>
           <el-table-column
                label="支付宝信息"
                width="150">
                    <template slot-scope="scope">
                        <el-badge  class="item">
                            <el-button   @click="showAlipay(scope.row)" size="small" >点击查看</el-button>    
                        </el-badge>
                    </template>
              </el-table-column>

                  
             <el-table-column
              label="日额度"
              width="150">
              <template slot-scope="scope">
                  <span v-show="!scope.row.modify">{{ scope.row.day_amount_limit }}</span>
                  <el-input v-model="scope.row.day_amount_limit" v-show="scope.row.modify" @keyup.enter.native="sendModifyMsg(scope.row)"></el-input>

              </template>
              </el-table-column>
             
             <el-table-column
              label="月额度"
              width="150">
              <template slot-scope="scope">
                  <span v-show="!scope.row.modify">{{ scope.row.month_amount_limit }}</span>
                  <el-input v-model="scope.row.month_amount_limit" v-show="scope.row.modify" @keyup.enter.native="sendModifyMsg(scope.row)"></el-input>
              </template>
              </el-table-column>

            <el-table-column
              label="手机号"
              width="200">
              <template slot-scope="scope">
                {{scope.row.phone}}
              </template>
              </el-table-column>
            <el-table-column
              label="创建时间"
              width=""
              show-overflow-tooltip
              >
              <template slot-scope="scope">
                {{formdataTime(scope.row.create_time)}}
              </template>
              </el-table-column>

              <el-table-column
                label="操作"
                width="100">
                    <template slot-scope="scope">
                        <el-badge  class="item">
                            <el-button   @click="modifyFun(scope.row)" size="small" >修改</el-button>    
                        </el-badge>
                    </template>
              </el-table-column>
        </el-table>
                        <div style="display:inline-block;">
                                <el-pagination
                                background
                                layout="prev, pager, next"
                                :page-size="pageSize"
                                :total="page" @current-change='turnPage' :current-page.sync=currentPage>
                                </el-pagination>
                        </div>
                                <!-- 修改模态框  -->
                        <el-dialog  title="修改身份信息" :visible.sync="dialogModifyVisible" width="30%" :modal-append-to-body='false'>
                            <el-form :model="modifyData">
                                                <el-form-item label="姓名：" :label-width="label">
                                                   <el-input  v-model="modifyData.name" ></el-input>
                                                </el-form-item>  

                                                <el-form-item label="身份证：" :label-width="label">
                                                    <el-input  v-model="modifyData.idcard"></el-input>
                                                </el-form-item>  

                                                <el-form-item label="日额度：" :label-width="label">
                                                <el-input v-model="modifyData.day_amount_limit" auto-complete="off" ></el-input>
                                                </el-form-item>
                                                <el-form-item label="月额度：" :label-width="label">
                                                <el-input v-model="modifyData.month_amount_limit" auto-complete="off" ></el-input>
                                                </el-form-item>

                                                <el-form-item label="性别：" :label-width="label">
                                                         <el-select name=""  id="" v-model="modifyData.sex" >
                                                             <el-option label="男" value="1"></el-option>
                                                             <el-option label="女" value="0"></el-option>
                                                         </el-select>
                                                </el-form-item> 

                                                <el-form-item label="正面照：" :label-width="label">
                                                <input class='form-control' type="file" @change="modifyReadFile('front')">
                                                </el-form-item> 

                                                <el-form-item label="背面照：" :label-width="label">
                                                 <input class='form-control' type="file" @change="modifyReadFile('back')">
                                                </el-form-item>  

                                                <el-form-item label="手机号：" :label-width="label">
                                                  <el-input   v-model="modifyData.phone"></el-input>
                                                </el-form-item> 
                            </el-form>

                            <div slot="footer" >
                                <el-button @click="dialogModifyVisible = false">取 消</el-button>
                                <el-button type="primary" @click="subModifyMsg">确 定 修 改</el-button>
                            </div>
                    </el-dialog> 
                   <!-- 模态框添加（Modal） -->
                        <el-dialog  title="添加身份信息" :visible.sync="dialogFormVisible" width="40%" :modal-append-to-body='false'>
                                <el-form :model="addData">
                                        <el-form-item label="姓名：" :label-width="label">
                                        <el-input auto-complete="off"  v-model="addData.name" ></el-input>
                                        </el-form-item>  

                                        <el-form-item label="身份证：" :label-width="label">
                                        <el-input auto-complete="off"  v-model="addData.idcard" ></el-input>
                                        </el-form-item>  
                                        <el-form-item label="日额度：" :label-width="label">
                                        <el-input v-model="addData.day_amount_limit" auto-complete="off" ></el-input>
                                        </el-form-item>
                                        <el-form-item label="月额度：" :label-width="label">
                                        <el-input v-model="addData.month_amount_limit" auto-complete="off" ></el-input>
                                        </el-form-item>

                                        <el-form-item label="性别：" :label-width="label">
                                                         <el-select name=""  id="" v-model="addData.sex"  >
                                                            <el-option label="男" value="1"></el-option>
                                                            <el-option label="女" value="0"></el-option>
                                                         </el-select>
                                        </el-form-item> 
                                        <el-form-item label="正面照：" :label-width="label">
                                          <input class="form-control" auto-complete="off"   type="file"   @change="readFile('front')">
                                        </el-form-item> 

                                        <el-form-item label="背面照：" :label-width="label">
                                          <input class="form-control" auto-complete="off"   type="file"  @change="readFile('back')">
                                        </el-form-item>  

                                        <el-form-item label="手机号：" :label-width="label">
                                        <el-input auto-complete="off"  v-model="addData.phone" ></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" >
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="subAddMsg">确 定 添 加</el-button>
                            </div>
                        </el-dialog>
                             
                   <el-dialog
                    :title="'身份证号：'+note_msg.idcard"
                    :visible.sync="dialogVisible"
                     width="60%"
                    :append-to-body="true"
                      >
                        <behavior-note v-if="dialogVisible" :msg="note_msg">
                        </behavior-note>
                  </el-dialog>
    </el-col>
    
   </div>

</template>


<script>
import behavior_note from './behavior_note'
import axios from 'axios'
import moment from 'moment'


export default {
     data (){
       return {
           tableData:[],// table data
           loading:false,
           multipleSelection: [],// 批量删除
           dialogFormVisible: false,//模态框
           dialogModifyVisible:false,//修改框控制显示
           label:'150px',

           addData:{
                name:'',
                idcard:'',
                sex:'',
                phone:"",
                front_img:'',
                back_img:'',
                day_amount_limit:'',
                month_amount_limit:'',
            },// checkbox value
           pageSize:10,
           page:10,
           currentPage:1,

           modifyData:{
                id:'',
                name:'',
                idcard:'',
                sex:'',
                phone:"",
                front_img:'',
                back_img:'',
                day_amount_limit:'',
                month_amount_limit:'',
           },
           file:"",
           note_msg:"",// 根据身份证号查看营业执照
           dialogVisible:false,
           phone_msg:'',// 根据手机号查看注册信息
           relationVisible:false,

       }
   },
   mounted() {
       this.getTable();
   },
   methods:{
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
       refresh(){
           this.getTable();
           this.isTemplate=true;
           this.isTemplateFilter=false;
       },
       readFile(index){
        let e=window.event;
        let file=e.target.files
        if(index=='front'){
            this.addData.front_img=file[0]
        }else{
            this.addData.back_img=file[0]
        }
      },// readFile end
      modifyReadFile(index){
        let e=window.event;
        let file=e.target.files
        if(index=='front'){
            this.modifyData.front_img=file[0]
        }else{
            this.modifyData.back_img=file[0]
        }
     },
     getTable(){
           let sendStr=`/api/resource/idcard?page_size=${this.pageSize}&page=${this.currentPage}`;
           this.loading=true;
           axios.get(sendStr,)
                .then((res)=>{
                    this.loading=false;
                    if(res.data.code==10000){
                            this.tableData=res.data.msg;
                            this.page=res.data.total;
                           console.log(res,'/api/task/devices_and_accounts')
                    }else{
                        this.$message({
                        message:res.data.msg,
                        type:'error'
                        });
                    }
                })
                .catch((err)=>{
                      this.$message({
                        message:'系统异常',
                        type:'error'
                        });
                }); 
     },// get table data function
     stateChange(){
           this.modifyData.id=-1;
     },
     modifyFun(obj,index){
           this.dialogModifyVisible=true;
           this.modifyData.id=obj.id;
           this.modifyData.index=index;
           this.modifyData.name=obj.name;
           this.modifyData.sex=obj.sex;
           this.modifyData.idcard=obj.idcard;
           this.modifyData.phone=obj.phone;
           this.modifyData.day_amount_limit=obj.day_amount_limit;
           this.modifyData.month_amount_limit=obj.month_amount_limit;

     },
     mathRandom(){
        return Math.random()
     },
     subModifyMsg(){
         let url=``;
         let formdata=new FormData()
         let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
                for(let v in this.modifyData){
                    formdata.append(`${v}`,this.modifyData[v])
                }
               url=`/api/resource/idcard`;
               axios.put(url,formdata)
                    .then((res)=>{
                        this.dialogModifyVisible=false;
                        if(res.data.code==10000){
                            this.$message({
                                message:'修改成功',
                                type:'success'
                            })
                            this.getTable();
                        }else{
                            this.$message({
                                message:res.data.msg,
                                type:'danger'
                            })
                        }
                    });

         return;          
     },//
     subAddMsg(){
         let url=``;
         let formdata=new FormData()
         let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
               for(let v in this.addData){
                   formdata.append(`${v}`,this.addData[v])
               }
               console.log(formdata,'fro')
               url=`/api/resource/idcard`;
               axios.post(url,formdata)
                    .then((res)=>{
                        this.dialogAddVisible=false;

                        if(res.data.code==10000){
                                this.$message({
                                    message:'添加成功',
                                    type:'success'
                                });
                               this.getTable();
                        }else{
                             this.$message({
                                    message:res.data.msg,
                                    type:'error'
                                });
                        }
                    });
         return;          
     },//
     showAlipay(obj){
        this.dialogVisible=true;
        this.note_msg=obj
     },
     formdataTime(time){
        return moment(time).zone(0).format('YYYY-MM-DD HH:mm:ss')
     },
     turnPage(){
        let sendStr=`/api/resource/idcard?page_size=${this.pageSize}&page=${this.currentPage}`;
        this.loading=true;
        axios.get(sendStr,)
        .then((res)=>{
            this.loading=false;
            if(res.data.code==10000){
                 this.tableData=res.data.msg;
            }else{
               this.$message({
                message:res.data.msg,
                type:'warning'})
            }
        })
        .catch((err)=>{
            console.error(err)
        }) 
     },
     transferNote(idcard){// 传递
        this.dialogVisible=true;
        this.note_msg=idcard
     },
     transferPhone(phone){// 传递
        this.relationVisible=true;
        this.phone_msg=phone;
     },
        deleteItem(){
          let len=this.multipleSelection.length;
          if(!len){
              this.$message({
                message:'勾选项为空',
                type:'warning'})
              return;
          }else{
             let sendArr=[];
                for(let i=0;i<len;i++){
                  sendArr.push(this.multipleSelection[i].idcard)
                }
            let comf=confirm('确定要删除么？')
            if(!comf) return;
            axios.delete(`/api/resource/idcard?idcard=${sendArr}`,)
                 .then((res)=>{
                    if(res.data.code==10000){
                       this.$message({
                        message:res.data.msg,
                        type:'success'});
                        this.getTable();
                    }else{
                       this.$message({
                         message:res.data.msg,
                         type:'warning'})
                    }
                 });
          }
          console.log(this.multipleSelection)
      },
     
     msgFormdata(obj){// 格式化post数据数组
        let strArr=new FormData();
        for(v in obj){
            strArr.append(`${v}`,obj[v])
        };
        return strArr
    },
    selectHandle(){
        if(this.selectAll[0]=='all'){
            for(let i =0;i<this.tableData.length;i++){
                this.selectData.push(this.tableData[i].id);
            }
        }else{
            this.selectData=[]
        }         
      },
    selectItem(){
        if(this.selectData.length==this.tableData.length){
            this.selectAll=['all']
        }else{
            this.selectAll=[];
        }
        },
    },// methods end 
 
   components:{
       "behavior-note":behavior_note,
   }

}
</script>

<style slot>
.acc-btn{
    width: 100%;
    background:rgb(84, 92, 100);
    height: 50px;
    border-radius: 4px;
    margin-bottom: 5px;
}
.acc-btn button{
    float: right;
    margin: 5px;
}
.acc-btn .out-span{
  display: inline-block;
  /* border: .5px solid; */
      /* margin-top: 15px; */
      padding: 14.5px;
      border-radius: 4px;
     background-color: #409EFF;
      border-right: .2px solid black;
}
.acc-btn::before{
    content: '';
    display: block;    
    clear: both;
}
.acc-btn::after{
    content: '';
    display:block;
    clear: both;
}
.item{
  margin-top: 10px;
  padding: -20px;
}
</style>
