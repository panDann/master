

<template>
    <div class="first-head" style="position:relative;">
                            <el-select v-model="accountValue" clearable placeholder="请选择账号" style="" class="option" @change="getData()" >
                                    <el-option
                                    v-for="item in accountList"
                                    :key="item[0]"
                                    :label="item[1]"
                                    :value="item[0]">
                                    </el-option>
                             </el-select>
                    <div class="canvas-account" id="first-page-canvas" v-loading="canvasLoading" 
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                    >
                            <div style="font-size:20px;" class="center" v-if="isNull">暂无数据....</div>
                    </div>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    data(){
        return {
            canvasLoading:false,
            canvasData:[],
            accountList:[],
            accountValue:'',
            isNull:'',
        }
    },
    mounted(){
        this.createEchart();
        let self=this;
        if(typeof window.echarts!='undefined'){
             if(sessionStorage.firstPageOption){
                self.accountValue=sessionStorage.firstPageOption;
                self.getData();
            }else{
                self.getData()
            }
        }else{
            self.canvasLoading=true;
            setTimeout(() => {
                if(sessionStorage.firstPageOption){
                    self.accountValue=sessionStorage.firstPageOption;
                    self.getData();
                }else{
                self.getData()
                }
            }, 500);     
        }
    },
    methods:{
        createEchart(){
             let e=document.createElement('script');
                e.src="https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts-en.min.js"
                document.body.appendChild(e);
                // console.log(window,'window')
        },
        checkNull(){
                if(!this.accountList.length||!this.canvasData[0].length){
                    this.isNull=true
                    this.canvasLoading=false;
                    // alert(this.isNull)
                    return 1
                }
        },
        getData(obj){
           this.canvasLoading=true;
           let url=`/api/report`;
                 this.accountValue? url=this.handleAccountOption():''// select input execution
                 Axios.get(url,)
                      .then(res=>{
                            if(res.data.code==10000){
                                let resData=res.data.msg
                                this.canvasData=resData.records,
                                this.accountList=resData.clients;
                                this.initCanvas(resData.limit,this.canvasData)
                            }else{
                             this.$message({
                              message:'服务器连接错误',
                              type:'warning'
                          })
                            }
                      })
                      .catch(err=>{
                          this.canvasLoading=false;
                          this.$message({
                              message:'系统故障',
                              type:'warning'
                          })
                      })
        },
        handleAccountOption(){
            let url=`/api/report?account=${this.accountValue}`;
              sessionStorage.firstPageOption=this.accountValue;
            return url
        },
        initCanvas(limit,initData){
                   if(this.checkNull())return
                   let canvasInit=echarts.init(document.getElementById('first-page-canvas')),
                    [...sortValue]=initData[1]
                       sortValue.sort()
                   let maxValue=sortValue[sortValue.length-1];
                   let  minValue=sortValue[0];
                    limit? maxValue<=limit? maxValue=limit:'':limit=maxValue;
                    console.log(sortValue)
                   var bl_option = {
                                // 标题
                                title: {
                                    text: `收款账号报表`,
                                    // subtext:`组平均数：${average}/最大值：${ratioData.max}/最小值：${ratioData.min}`
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                //图例名
                                // legend: {
                                //     type: 'scroll',
                                //     orient: 'vertical',
                                //     right: 10,
                                //     top: 20,
                                //     bottom: 20,
                                //     data: accountList,
                                //     selected: [true,false,false,false,false,]
                                // },
                            
                                dataZoom: [
                                 
                                                {   // 这个dataZoom组件，也控制x轴。
                                                    type: 'slider', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                                                    startValue: initData[0].length -8,
                                                    endValue: initData[0].length -1
                                                }
                                            ],
                                grid: {
                                    left: '3%',   //图表距边框的距离
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                //工具框，可以选择
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                //x轴信息样式
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: initData[0],
                                    //坐标轴颜色
                                    axisLine:{
                                        lineStyle:{
                                            color:'red'
                                        }
                                    },
                                    //x轴文字旋转
                                    axisLabel:{
                                        rotate:30,
                                        interval:0
                                    },
                                },
                        
                                yAxis : [
                                    {
                                        type : 'value',
                                        axisLabel : {
                                            formatter: '{value} 元'
                                        },
                                        max:maxValue,
                                        min:minValue
                                    }
                                ],
                                series: [
                                    //虚线
                                    {
                                        name:'当日交易额',
                                        type:'line',
                                        symbolSize:4,   //拐点圆的大小
                                        color:['green'],  //折线条的颜色
                                        data:initData[1],// value
                                        smooth:false,   //关键点，为true是不支持虚线的，实线就用true
                                        itemStyle:{
                                            normal:{
                                                lineStyle:{
                                                    width:2,
                                                    type:'dotted',
                                                    borderColor:'green'  //'dotted'虚线 'solid'实线
                                                }
                                            }
                                        },
                                        label: {normal: {
                                            show: true
                                        }},
                                         markLine: {
                                            data: [
                                                {
                                                    name: 'Y 轴值为 100 的水平线',
                                                    yAxis: limit
                                                }
                                            ],
                                            lineStyle: {
                                                color: 'rgb(255, 0, 0)',
                                                width: 3,
                                                type: 'solid'
                                            }
                                        },
                                    },
                                   
                                ]
                            };// options end 
                            canvasInit.setOption(bl_option);
                            this.canvasLoading=false;

        },// initCanvas end
    },// methods end 
}
</script>

<style lang="scss" scoped>

.first-head{
    width: 100%;
    margin-top: 2rem;
}
.canvas-account{
    display: block;
    width: 80%;
    height: 40rem;
    margin: 0 auto;
    border-radius: .2rem;
    text-align: center;
    background: snow;
    position: relative;
}
.option{
    width:15%;
    height:3rem;
    position:absolute;
    left:0;
    top:0;
    right:0;
    z-index:99;
    overflow: auto;
     margin: auto;
}
.center{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    width: 30%;
    height: 10rem;
    // background: black;
    margin: auto;
}
</style>
