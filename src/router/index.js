import { createRouter,createWebHashHistory } from "vue-router";

import home from "@/pages/Home.vue"
import Trajectory from "../pages/Trajectory.vue";
const routes = [
    {
        path : "/",
        name : "Home",
        component : home
    },
    {
        path : '/Map',
        name : 'Map',
        component: Trajectory
    },
    {
        path : '/Screen',
        name : 'Screen',
        component: () => import('@/pages/Screen.vue')
    }
]

const router = createRouter({
    history : createWebHashHistory(),
    routes
})

export default router