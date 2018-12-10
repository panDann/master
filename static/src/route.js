
import Login from './Login.vue'
import AccountIn from './AccountIn.vue'
import AccountOut from './AccountOut.vue'
import Commodity from './Commodity.vue'
import Statement from './Statement.vue'
import TransferIn from './TransferIn.vue'
import TransferOut from './TransferOut.vue'
import First from './First.vue'
import commercialManager from './users/commercialManager.vue'
import personalInfo from './users/personalInfo.vue'
import Registe from './users/idRegiste.vue'
import ClientMessage from './users/clientMessage.vue'
import ConfigAccount from './components/ConfigAccount.vue'
import CityService from './CityService.vue'
import ErrorHandle from './records/Error'
import greenQr from './users/greenQr'
import InterfaceDocu from './users/interface_docu'


let routes=[
    {
      path:'/first',
      component:First,
    },
    {
      path:'/account_in',
      component:AccountIn,
    }, 
     {
      path:'/account_out',
      component:AccountOut,
    },
    
     
     {
      path:'/commodity',
      component:Commodity,
    }, 
     {
      path:'/transfer_in',
      component:TransferIn,
    }, 
    {
      path:'/transfer_out',
      component:TransferOut,
    }, 
     {
      path:'/statement',
      component:Statement,// 报表
    },
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/commercial_manager',
      component:commercialManager,// 商户管理
    },
    {
      path:'/personal_info',
      component:personalInfo,
    }, 
    {
      path:'/green_qr',
      component:greenQr,
    }, 
    {
      path:'/interface_docu',
      component:InterfaceDocu,
    }, 
    {
      path:'/id_registe',
      component:Registe,
    },  
    {
      path:'/client_message',
      component:ClientMessage,
    },
    {
      path:'/config_account',
      component:ConfigAccount,
    },
    {
      path:'/city_config',
      component:CityService,
    },
    {
      path:'/error_handle',
      component:ErrorHandle,
    },
  ];// routes end

export default routes;