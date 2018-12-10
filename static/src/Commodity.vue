
<template>

    <div class="acc-out">

    
    <el-col :span='24' class="config-main">
        <el-col>
            <div class="com-btn">
            <span class="out-span" style="color:snow;">商品配置列表</span>
              
            <el-button type='danger' @click="deleteItems">
                删除选中项
            </el-button>
            
            <el-button type='primary' @click="dialogFormVisible = true">
                添加商品
            </el-button>
            </div>
           
               
        </el-col>
        <el-table
        v-loading="loading2"
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
          label="商品名"
          width="">
          <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>

           <el-table-column
          label="账号"
          width="">
          <template slot-scope="scope">{{ scope.row.account }}</template>
          </el-table-column>

          <el-table-column
          prop="price"
          label="商品价格"
          width="">
          </el-table-column>
          <el-table-column
          prop="desc"
          label="商品描述"
          width="">
          </el-table-column>

            <el-table-column
          label="二维码"
          width="">
          <template slot-scope="scope">
          <el-popover
            placement="right"
            width="300"
            trigger="hover"
            >
             <div id="" style="margin-bottom:10px;">
               <textarea name="" :id="'img-url'+scope.$index" cols="30" rows="3" v-model="scope.row.qrcode">
               </textarea>
                <img :src="random(scope.row.qrcode)" alt="二维码" width="50" height="50">
            </div>
            <el-button @click="copyImgUrl(scope.$index)">点击复制链接</el-button>
            <img :src='random(scope.row.qrcode)' alt="qrcode" slot="reference" class="qrcode-img" style="width:50px;">
          </el-popover>
          </template>
          </el-table-column>

            <el-table-column
          label="操作"
          width="">
          <template slot-scope="scope">
          <el-button   @click="modifyItem(scope.row)">修改</el-button> 
        
                        
          </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total='total'
           style="margin-top:.6rem;"
          :current-page.sync="currentPage" @current-change="turnPage">
        </el-pagination>
                <!-- 模态框 添加-->
               
                 <el-dialog title="添加商品" :visible.sync="dialogFormVisible" width="30%" :modal-append-to-body='false'>
                  <el-form :model="form">

                    <el-form-item label="账号" :label-width="formLabelWidth">
                      <el-select v-model="form.account" placeholder="请选择配置账号">
                        <el-option :label="v" :value="v" v-for='v in accountData' :key="v"></el-option> 
                      </el-select>
                    </el-form-item>
                    <el-form-item label="商品名" :label-width="formLabelWidth">
                      <el-input v-model="form.name" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" :label-width="formLabelWidth">
                      <el-input v-model="form.price" auto-complete="off" ></el-input>
                    </el-form-item>
                     <el-form-item label="商品描述" :label-width="formLabelWidth">
                      <el-input v-model="form.desc" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="上传二维码" :label-width="formLabelWidth">
                      <el-input  auto-complete="off" type="file"  placeholder="选择文件" @change="getFile('form',$event)"></el-input>
                    </el-form-item>

                  </el-form>
                  <div slot="footer" >
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sendAddMsg">确 定</el-button>
                  </div>
                </el-dialog>  

                  <!-- 模态框 修改 -->
             <el-dialog title="修改商品" :visible.sync="dialogModifyVisible" width="30%" :modal-append-to-body='false'>
                  <el-form :model="form">

                   <el-form-item label="账号" :label-width="formLabelWidth">
                      <el-select v-model="modify.account" placeholder="请选择配置账号">
                        <el-option :label="v" :value="v" v-for='v in accountData' :key="v"></el-option> 
                      </el-select>
                    </el-form-item>
                    <el-form-item label="商品名" :label-width="formLabelWidth">
                      <el-input v-model="modify.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" :label-width="formLabelWidth">
                      <el-input v-model="modify.price" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述" :label-width="formLabelWidth">
                      <el-input v-model="modify.desc" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="上传二维码" :label-width="formLabelWidth">
                      <el-input  auto-complete="off" type="file" v-model="modifyImg"  placeholder="选择文件" @change="getFile('modify',$event)"></el-input>
                       <img :src="modify.qrcode" style="width:120px;height:120px;">
                    </el-form-item>
                  </el-form>
                  <div slot="footer" >
                    <el-button @click="dialogModifyVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sendModifyMsg">确 定 修 改</el-button>
                  </div>
                </el-dialog> 
    </el-col>
   </div> 
</template>

<script>
import axios from 'axios'
import Qs from 'qs'

export default {
        data (){
        return {
          loading2:false,//控制加载延迟
          tableData3: [],//表格数据
          multipleSelection: [],// 批量删除
          dialogFormVisible: false,//模态框
          dialogModifyVisible:false,//修改框控制显示
          formLabelWidth: '100px',//模态框的宽度      
          commodities:[],//商品总数
          modifyImg:'',//
          accountData:[],//存取模态框账号数量

          total:1,// page number
          currentPage:'',
          pageSize:10,

          form: {//模态框数据
            name: '',
            price: '',
            desc:'',
            file:'',
            account:'',
         },
         modify: {//模态框数据
           name: '',
           price: '',
           id: '',
           desc:'',
           qrcode:'',
           account:'',

        },
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
               axios.get('/api/commodity',).then((res)=>{
                 let tem=res.data.msg;
                    if(res){   
                      this.tableData3=tem.commodities;
                      this.accountData=tem.accounts;
                       this.loading2=false;  
                       this.total=res.data.msg.total;                    
                      // console.log(tem)
                    }
               })
               .catch((err)=>{

               });
    },//get table data
    turnPage(){
               this.loading2=true;
               axios.get(`/api/commodity?1&page=${this.currentPage}&page_size=${this.pageSize}`,).then((res)=>{
                  let tem=res.data.msg;
                    if(res.data.code==10000){   
                      this.tableData3=tem.commodities;
                      this.accountData=tem.accounts;
                       this.loading2=false;                      
                      console.log(tem)
                    }else{
                      this.$message({
                        message:res.data.msg,
                        type:'warning'
                      });
                    }
               })
               .catch((err)=>{
                   this.$message({
                        message:'系统故障',
                        type:'warning'
                      });
               });
    },
    getFile(type){
        let file=window.event.target.files[0]
        
        if(type=='modify'){
          this.modify.file=file
          // this.modify.qrcode=window.event.target.result
        }else{
            this.form.file=file
        } 
    },
      copyImgUrl(index){
          let imgDiv=document.getElementById(`img-url${index}`);
              imgDiv.select();
              document.execCommand("Copy");
              // window.ClipboardData.setData("Text",'231');
          this.$message({
            message:'复制成功',
            type:'success'
          });
      },
     sendAddMsg(){
        this.dialogFormVisible=false;
        let sendStr=new FormData()
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
            for(let v in this.form){
              //  if(v=='file'){
              //    continue;
              //  }
               sendStr.append(`${v}`,this.form[v])
            }
              // console.log(this.form.file,'form')
            
        axios.post(`/api/commodity?`,sendStr,config).then((res)=>{
            if(res){
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
                   
            }
        });
        
     },//添加条目
      deleteItems(){
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
                   axios.delete(`/api/commodity?id=${sendArr}`,)
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
     modifyItem(scope){
       this.dialogModifyVisible=true;
       this.modify.name=scope.name;
       this.modify.price=scope.price;
       this.modify.id=scope.id;
       this.modify.qrcode=scope.qrcode;
       this.modify.account=scope.account;
       this.modify.desc=scope.desc;  
      //  alert(this.modify.account_type)
       console.log(this.modify.id)
     },//显示修改框
      sendModifyMsg(){
        let sendStr=new FormData()
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
            for(let v in this.modify){
               sendStr.append(`${v}`,this.modify[v])
            }
          axios.put(`/api/commodity`,sendStr,config).then((res)=>{
              if(res){
                if(res.data.code==10000)
                  this.dialogModifyVisible=false;
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
                  console.log(res.data)
              
          });
      },//提交修改信息
      random(path){
        return  path+'?'+Math.random()
      },// 图片随机数
    },//methods end} ,
    components:{
    }
  }
  

</script>

<style slot>
.com-btn{
    width: 100%;
    background:rgb(84, 92, 100);
    height: 50px;
    border-radius: 4px;
    margin-bottom: 5px;
}
.com-btn button{
    float: right;
    margin: 5px;
}
.com-btn .out-span{
  display: inline-block;
  /* border: .5px solid; */
     padding: 14.5px;
      border-radius: 4px;
     background-color: #409EFF;
      border-right: .2px solid black;
}
.com-btn::before{
    content: '';
    display: block;    
    clear: both;
}
.com-btn::after{
    content: '';
    display:block;
    clear: both;
}
</style>



// WEBPACK FOOTER //
// src/api/Commodity.vue