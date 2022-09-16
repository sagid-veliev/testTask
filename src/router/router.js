import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/pages/VMain.vue";
import ChangePage from "@/pages/VChange.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "main",
            component: MainPage,
        },
        {
            path: "/ChangePage",
            name: "change",
            component: ChangePage,
        }
    ]
});
