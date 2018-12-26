
import axios  from "axios"

var moduleFirstPage={
    state:{
        test:"11225",
        dataList:[
            // {title:"maple",
            //     id:12,
            // }
        ],
        
    },
    mutations:{
        setData(state,data){
             state.dataList=data;
        }
    },
    actions:{
        getData:function({commit,state,rootState},msg){
            rootState.loading=true;
            var url="/api/first?number=10",
            sendDat={a:"aaaaa"}
            axios.post(url,JSON.stringify("data"),sendDat)
                    .then(res=>{
                        rootState.loading=false;
                        var temRes=res.data
                        // commit("loadingState",false,{root:true})
                        if(temRes.code==10000){
                            var tem=[]
                            temRes.msg.forEach(function(item){
                                    item=JSON.parse(item)
                                    item["isUnfold"]=false;
                                    item["isParsed"]=false;
                                    tem.push(item)
                            });
                            console.log(tem)
                            handleError(rootState,"首页已刷新")
                            commit("setData",tem)
                        }else{
                            handleError(rootState,temRes.msg)
                        }
                       
                    })
                    .catch(err=>{
                        console.error(err)
                    })
            }
    },
}

var moduleWebFront={
    state:{
        test:"11225",
        dataList:[],
    },
    mutations:{
        setData(state,data){
             state.dataList=data;
        }
    },
    actions:{
      
    },
}
var moduleAboutMaple={// about maple
    state:{
        test:"11225",
        isPreview:false,
        mapleContent:"",
        previewAfter:"",
        
    },
    mutations:{
        mapletransferPreview(state,msg){
             state.previewAfter=msg.status? parseCode(msg):""
            //  console.log(state.previewAfter,"1321")
             state.isPreview=msg.status;
        },
        mapleCacheContent(state,msg){
            state.mapleContent=msg
        }
    },
    actions:{
        mapleSendContent:function({commit,state,rootState},msg){
            rootState.loading=true;
            var url="/api/about_maple/send_content",
                sendData=new FormData()
                Object.keys(msg).forEach(item=>{
                    sendData.append(item,msg[item]) 
                   })
            axios.post(url,sendData)
                    .then(res=>{
                        rootState.loading=false;
                        // commit("loadingState",false,{root:true})
                        handleError(rootState,res.data.msg)
                        commit("setData",tem)
                    })
                    .catch(err=>{
                        console.error(err)
                    })
        }
    },
}

var store={

    state:{
        leftChange:false,
        loading:false,
        messagebox:{
            msg:"123",
            show:false
        },
        previewed:"",// 公用的文章解析缓存
        // currentRoute:"",
    },
    mutations:{
        leftChangeState:function(sta,status){
            sta.leftChange=status;
        },
        loadingState:function(sta,status){
            sta.loading=status;
        },
        handleError(sta,msg){
            handleError(sta,msg)
        },
        commonParseCode(state,msg){
            state.previewed=parseCode(msg)
        },
        // commonCurrentRoute(sta,route){
        //     sta.currentRoute=route
        // }
    },
    actions:{

    },
    modules:{
        first_page:moduleFirstPage,
        web_front:moduleWebFront,
        about_maple:moduleAboutMaple
    }
}
function handleError(obj,msg){
    obj.messagebox={
        msg:msg,
        show:true,
    }
    setTimeout(() => {
        obj.messagebox.show=false;
    }, 3000);
}
function  parseCode(obj){
    var temString=obj.content.toString()
    // var reCodeEnd=/<\/(J|C|G|M|H)code>/ig
    temString=temString.replace(/<(C|J|H|M|G)code>/ig,"<div class='code-div'><pre><code>")
                       .replace(/<\/(C|J|H|M|G)code>/ig,"</code></pre></div>")
                       .replace(/(var\s|func\s|function\s|let\s|const\s)/ig,"<span class='code-var-span'>$1</span>")
                       .replace(/(return\s|if\b|else\b|for\b|while\b)/ig,"<span class='code-if-span'>$1</span>")
                    //    .replace(/\n/ig,"<br/>")
                    //    .replace(/\s/ig,"&nbsp;")
    temString=temString.replace(/\-/ig,"MAPLE")
                       .replace(/(?=\b\w+?:\W+)/ig,"<span class='code-css-span'>")
                       .replace(/\:/g,":</span>")
                       .replace(/MAPLE/g,"-")
                       .replace(/(\/\/.+?\n)/g,"<span class='code-comment-span'>$1</span>")
                    //    .replace(/;/g,";<br/>")
                    //    .replace(/(\{|\})/g,"$1<br/>")
    
    if(obj.summary){
        temString= "<h3 class='code-summary'>简介："+obj.summary+"</h3>"+temString
    }
    // if(obj.title){
    //     temString= "<h2 class='code-title'>"+obj.title+"</h2>"+temString
    // }
    // console.log(temString,obj,"tem")
    return temString
}
export default store