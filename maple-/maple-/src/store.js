
import axios  from "axios"

var moduleFirstPage={
    state:{
        test:"11225",
        dataList:[
            {title:"maple",
                id:12,
            }
        ],
    },
    mutations:{
        setData(state,data){
             state.dataList=data;
        }
    },
    actions:{
        getData:function({commit,state,rootState},msg){
            console.log(rootState,"root")
            rootState.loading=true;
            var url="/api/first?number=10",
            self=this,
            sendDat={a:"aaaaa"},
            resData="";
            axios.post(url,JSON.stringify("data"),sendDat)
                    .then(res=>{
                        console.log(res,'res')
                        var tem=[]
                        res.data.forEach(function(item){
                                tem.push(JSON.parse(item))
                        });
                        rootState.loading=true;
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
            //  console.log(state.dataList)
        }
    },
    actions:{
      
    },
}


var store={

    state:{
        leftChange:false,
        loading:false,
    },
    mutations:{
        leftChangeState:function(sta,status){
            sta.leftChange=status;
        }
    },
    actions:{

    },
    modules:{
        first_page:moduleFirstPage,
        web_front:moduleWebFront
    }
}

export default store