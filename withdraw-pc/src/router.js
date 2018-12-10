

import record from './main/record'
import receiptRecord from './main/receipt_record'
import Mine from './main/mine'
import Login from './main/login'
import Withdraw from './main/Withdraw'
import AccountManager from './main/account_manager'
import InterfaceDocu from './main/mine/interface_docu'

const route=[
          {
            path:'/record',
            component:record,
            meta: {
              keepAlive: true // 需要被缓存
            }
          },
          {
            path:'/receipt_record',
            component:receiptRecord,
            meta: {
              keepAlive: true // 需要被缓存
            }
          },
          {
            path:'/login',
            component:Login,
            meta: {
              keepAlive: true // 需要被缓存
            }
          },
           {
            path:'/mine',
            component:Mine,
            meta: {
              keepAlive: true // 需要被缓存
            }
          },
          {
            path:'/interface_docu',
            component:InterfaceDocu,
            meta: {
              keepAlive: true // 需要被缓存
            }
          },
          {
            path:'/withdraw',
            component:Withdraw,
            meta: {
              keepAlive: true // 需要被缓存
            }
          },
          {
            path:'/account_manager',
            component:AccountManager,
            meta: {
              keepAlive: true // 需要被缓存
            }
          },
        ]

export default route