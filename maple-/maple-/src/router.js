
import ContentF from "./components/Content"
import ContentGo from "./components/ContentGo"
import ContentMySQL from "./components/ContentMySQL"
import ContentWeb from "./components/ContentWeb"
import ContentMaple from "./components/ContentMaple"

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