import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import map from "../page/map.vue";
import info from "../page/info.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("../page/404.vue"),
  },
  {
    path: "/",
    component: () => import("../page/login.vue"),
  },
  {
    path: "/login",
    component: () => import("../page/login.vue"),
  },
  {
    path: "/register",
    component: () => import("../page/register.vue"),
  },
  {
    path: "/manage",
    component: () => import("../page/manage.vue"),
    name: "",
    children: [
      {
        path: "/map",
        component: map,
      },
      {
        path: "",
        component: info,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/info",
        name: "info",
        component: info,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/userInfo",
        name: "userInfo",
        component: () => import("../page/userInfo.vue"),
        meta: { desc: ["个人信息"] },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
