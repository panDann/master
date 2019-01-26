
import ContentF from "./main/Content"
import ContentGo from "./main/ContentGo"
import ContentMySQL from "./main/ContentMySQL"
import ContentWeb from "./main/ContentWeb"
import ContentMaple from "./main/ContentMaple"

var router=[
    {
        path:"/first",
        component:ContentF
    },
    {
        path:"/golang_service",
        component:ContentGo
    },
    {
        path:"/web_front",
        component:ContentWeb
    },
    {
        path:"/mysql_application",
        component:ContentMySQL
    },
    {
        path:"/about_maple",
        component:ContentMaple
    }
]

export default router