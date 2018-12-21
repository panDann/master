
import axios  from "axios"

var moduleFirstPage={
    state:{
        test:"11225",
        dataList:"",
    },
    mutations:{
        setData(state,data){
             state.dataList=data;
            //  console.log(state.dataList)
        }
    },
    actions:{
        getData:function({commit,state},msg){
            var url="/api/first?number=10",
            self=this,
            sendDat={a:"aaaaa"},
            resData="";
            axios.post(url,JSON.stringify("data"),sendDat)
                    .then(res=>{
                        var tem=[]
                        res.data.forEach(function(item){
                                tem.push(JSON.parse(item))
                        });
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
        getData:function({commit,state},msg){
            var url="/api/first?number=10",
            sendDat={a:"aaaaa"}
            axios.post(url,JSON.stringify("data"),sendDat)
                    .then(res=>{
                            var tem=[]
                            res.data.forEach(function(item){
                                    tem.push(JSON.parse(item))
                            });
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