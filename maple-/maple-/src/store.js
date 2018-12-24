
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
                        // commit("loadingState",false,{root:true})
                        var tem=[]
                        res.data.forEach(function(item){
                                tem.push(JSON.parse(item))
                        });
                        handleError(rootState,"warning test")
                        commit("setData",tem)
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
             state.previewAfter=msg.status? parseCode(msg.content):""
            //  console.log(state.previewAfter,"1321")
             state.isPreview=msg.status;
        }
    },
    actions:{
        mapleSendContent:function({commit,state,rootState},msg){
            rootState.loading=true;
            var url="/api/first?number=10",
            sendDat={a:"aaaaa"}
            axios.post(url,JSON.stringify("data"),sendDat)
                    .then(res=>{
                        rootState.loading=false;
                        // commit("loadingState",false,{root:true})
                        var tem=[]
                        res.data.forEach(function(item){
                                tem.push(JSON.parse(item))
                        });
                        handleError(rootState,"warning test")
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
        }
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
        }
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
function  parseCode(string){
    var temString=string.toString()
    // var reCodeEnd=/<\/(J|C|G|M|H)code>/ig
    temString=temString.replace(/<(C|J|H|M|G)code>/ig,"<div class='code-div'>")
                       .replace(/<\/(C|J|H|M|G)code>/ig,"</div>")
                       .replace(/(var|func|function|new)/ig,"<span class='code-var-span'>$1</span>")
                       .replace(/\n/ig,"#<br/>")
                    //    .replace(/\s/ig,"&nbsp;")
    temString=temString.replace(/\-/ig,"MAPLE")
                       .replace(/(?=\b\w+?:\W+)/ig,"<span class='code-css-span'>")
                       .replace(/\:/g,":</span>")
                       .replace(/MAPLE/g,"-")
                       .replace(/;/g,";<br/>")
                       .replace(/(\{|\})/g,"$1<br/>")
    return temString
}
export default store