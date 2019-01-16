
import axios  from "axios"

var moduleFirstPage={
    state:{
        
        pageSize:10,
        currentPage:1,
        dataList:[],
        searchText:"",
        isSearch:false,
        isPreventLoad:false,
    },
    mutations:{
        firstSetData(state,data){
             state.dataList=data;
        },
        firstStartSearch(state,msg){
            state.isSearch=true
            state.searchText=msg
            state.currentPage=1
            state.dataList=[]
        }
    },
    actions:{
        firstGetData:function({commit,state,rootState},msg){
            if(state.currentPage>4){
                handleError(rootState,"性能考虑，停止加载",true)
                return
            }
            var url=""
            if(state.isSearch){
                url="/api/first?page_num="+state.currentPage+"&search_text="+state.searchText+""
            }else{
                url="/api/first?page_num="+state.currentPage+""
            }
            rootState.loading=true;
            axios.get(url,)
                    .then(res=>{
                        rootState.loading=false;
                        // rootState.commonContentBodyState=!rootState.commonContentBodyState
                        var temRes=res.data
                        // commit("loadingState",false,{root:true})
                        if(temRes.code==10000){
                            temRes.msg.forEach(function(item){
                                    item=JSON.parse(item)
                                    item["isUnfold"]=false;
                                    item["isParsed"]=false;
                                    state.dataList.push(item);
                            });
                            state.currentPage++
                        }else{
                            handleError(rootState,temRes.msg)
                        }
                    })
                    .catch(err=>{
                        console.error(err)
                    })
        },
    },
}

var moduleWebFront={
    state:{
        
        dataList:[],
        searchText:"JS|CSS",
        currentPage:1,
    },
    mutations:{
        webSetData(state,data){
             state.dataList=data;
        },
      
    },
    actions:{
        webGetData:function({commit,state,rootState},msg){
            if(state.currentPage>3){
                handleError(rootState,"性能考虑，停止加载",true)
                return
            }
            var  url="/api/first?page_num="+state.currentPage+"&search_text="+state.searchText+""
            rootState.loading=true;
            axios.get(url,)
                    .then(res=>{
                        rootState.loading=false;
                        var temRes=res.data
                        if(temRes.code==10000){
                            temRes.msg.forEach(function(item){
                                    item=JSON.parse(item)
                                    item["isUnfold"]=false;
                                    item["isParsed"]=false;
                                    state.dataList.push(item);
                            });
                            state.currentPage++
                        }else{
                            handleError(rootState,temRes.msg)
                        }
                    })
                    .catch(err=>{
                        handleError(rootState,"网络故障")
                    })
        },
       },
}
var moduleGolangService={
    state:{
        
        dataList:[],
        searchText:"go",
        currentPage:1,
    },
    mutations:{
        golangSetData(state,data){
             state.dataList=data;
        },
      
    },
    actions:{
        golangGetData:function({commit,state,rootState},msg){
            if(state.currentPage>3){
                handleError(rootState,"性能考虑，停止加载",true)
                return
            }
            var  url="/api/first?page_num="+state.currentPage+"&search_text="+state.searchText+""
            rootState.loading=true;
            axios.get(url,)
                    .then(res=>{
                        rootState.loading=false;
                        var temRes=res.data
                        if(temRes.code==10000){
                            temRes.msg.forEach(function(item){
                                    item=JSON.parse(item)
                                    item["isUnfold"]=false;
                                    item["isParsed"]=false;
                                    state.dataList.push(item);
                            });
                            state.currentPage++
                        }else{
                            handleError(rootState,temRes.msg)
                        }
                    })
                    .catch(err=>{
                        handleError(rootState,"网络故障")
                    })
        },
       },
}
var moduleAboutMaple={// about maple
    state:{
        
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
                        // commit("setData",tem)
                    })
                    .catch(err=>{
                        console.error(err)
                    })
        }
    },
}
var moduleMysqlApplication={
    state:{
        
        dataList:[],
        searchText:"mysql",
        currentPage:1,
    },
    mutations:{
        mysqlSetData(state,data){
             state.dataList=data;
        },
      
    },
    actions:{
        mysqlGetData:function({commit,state,rootState},msg){
            if(state.currentPage>3){
                handleError(rootState,"性能考虑，停止加载",true)
                return
            }
            var  url="/api/first?page_num="+state.currentPage+"&search_text="+state.searchText+""
            rootState.loading=true;
            axios.get(url,)
                    .then(res=>{
                        rootState.loading=false;
                        var temRes=res.data
                        if(temRes.code==10000){
                            temRes.msg.forEach(function(item){
                                    item=JSON.parse(item)
                                    item["isUnfold"]=false;
                                    item["isParsed"]=false;
                                    state.dataList.push(item);
                            });
                            state.currentPage++
                        }else{
                            handleError(rootState,temRes.msg)
                        }
                    })
                    .catch(err=>{
                        handleError(rootState,"网络故障")
                    })
        },
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
        contentBodyChanged:false,
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
        commonContentBodyState(state){
            state.contentBodyChanged=!state.contentBodyChanged
        },
        closeError(sta){
            sta.messagebox.show=false;
        }
        // commonCurrentRoute(sta,route){
        //     sta.currentRoute=route
        // }
    },
    actions:{

    },
    modules:{
        first_page:moduleFirstPage,
        web_front:moduleWebFront,
        golang_service:moduleGolangService,
        about_maple:moduleAboutMaple,
        mysql_application:moduleMysqlApplication
    }
}
function handleError(obj,msg,isForever){
    obj.messagebox={
        msg:msg,
        show:true,
    }
    if(isForever) return
    setTimeout(() => {
        obj.messagebox.show=false;
    }, 3000);
}
function  parseCode(obj){
    var temString=obj.content.toString()
    // var reCodeEnd=/<\/(J|C|G|M|H)code>/ig
    temString=temString.replace(/<(C|J|H|M|G)code>/ig,"<div class='code-div'><pre><code>")
                       .replace(/<\/(C|J|H|M|G)code>/ig,"</code></pre></div>")
                       .replace(/(var\s|func\s|function\s|let\s|const\s|\bset\s|import\s)/ig,"<span class='code-var-span'>$1</span>")
                       .replace(/(return\s|if\b|else\b|for\b|while\b|[^\.]go\s)/ig,"<span class='code-if-span'>$1</span>")
                    //    .replace(/\n/ig,"<br/>")
                    //    .replace(/\s/ig,"&nbsp;")
    temString=temString.replace(/\-/ig,"MAPLE")
                       .replace(/(?=\b\w+?:(\s|\w))/ig,"<span class='code-css-span'>")
                       .replace(/(?=:(\s|\w))/g,"</span>")
                       .replace(/MAPLE/g,"-")
                       .replace(/(\/\/.+?\n)/g,"<span class='code-comment-span'>$1</span>")
                       .replace(/\n/g,"<br/>")
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