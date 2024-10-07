import { createRouter,createWebHashHistory } from "vue-router";

import home from "../pages/Home.vue"

const routes = [
    {
        path : "/",
        name : "Home",
        component : home
    }
]

const router = createRouter({
    history : createWebHashHistory(),
    routes
})

export default router