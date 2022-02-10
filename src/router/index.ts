import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// TODO: 修改组件为动态化加载
import map from "../page/map.vue";
import info from "../page/info.vue";
import department from "../page/Department.vue";
import MilitaryEquipment from "../page/MilitaryEquipment.vue";
import MilitaryNews from "../page/MilitaryNews.vue";
import PoliticalNews from "../page/PoliticalNews.vue";
import NewDetail from "../page/NewDetail.vue";
import BugManage from "../page/BugManage.vue";
import EquipmentDetail from "../page/EquipmentDetail.vue";
import DepartmentDetail from "../page/DepartmentDetail.vue";
import DepartDetail from "../page/DepartDetail.vue";
import InfoDetail from "../page/InfoDetail.vue";

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
      // TODO: 修改 info 和 infoDetail 在路由层级上的关系, 参考 https://hooray.gitee.io/fantastic-admin/guide/router.html#%E5%B0%8F%E6%8A%80%E5%B7%A7
      {
        path: "/info",
        component: info,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/infoDetail",
        component: InfoDetail,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/departDetail",
        component: DepartDetail,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/departmentDetail",
        component: DepartmentDetail,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/equipmentDetail",
        component: EquipmentDetail,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/bugManage",
        component: BugManage,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/newDetail",
        component: NewDetail,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/department",
        component: department,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/militaryNews",
        component: MilitaryNews,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/politicalNews",
        component: PoliticalNews,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/militaryEquipment",
        name: "militaryEquipment",
        component: MilitaryEquipment,
        meta: { desc: ["文件查看"] },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
