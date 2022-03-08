import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const map = () => import("../page/map.vue");
const info = () => import("../page/info.vue");
const department = () => import("../page/Department.vue");
const MilitaryEquipment = () => import("../page/MilitaryEquipment.vue");
const MilitaryNews = () => import("../page/MilitaryNews.vue");
const PoliticalNews = () => import("../page/PoliticalNews.vue");
const NewDetail = () => import("../page/NewDetail.vue");
const BugManage = () => import("../page/BugManage.vue");
const EquipmentDetail = () => import("../page/EquipmentDetail.vue");
const DepartDetail = () => import("../page/DepartDetail.vue");
const InfoDetail = () => import("../page/InfoDetail.vue");
const Login = () => import("../page/Login.vue");

const Middleware = { template: "<root-view></root-view>" };

declare module "vue-router" {
  interface RouteMeta {
    desc?: string | string[];
  }
}

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
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: () => import("../page/register.vue"),
  },
  {
    path: "/redirect",
    component: () => import("../page/manage.vue"),
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/page/redirect.vue"),
      },
    ],
  },
  {
    path: "/manage",
    component: () => import("../page/manage.vue"),
    name: "manage",
    meta: { desc: "主页" },
    children: [
      {
        path: "",
        component: info,
        meta: { desc: "个人信息" },
      },
      {
        path: "/map",
        component: map,
      },
      // TODO: 修改 info 和 infoDetail 在路由层级上的关系, 参考 https://hooray.gitee.io/fantastic-admin/guide/router.html#%E5%B0%8F%E6%8A%80%E5%B7%A7
      {
        path: "/info",
        component: info,
        meta: { desc: "个人信息" },
      },
      {
        path: "/infoDetail",
        component: InfoDetail,
        meta: { desc: "个人信息详情" },
      },
      {
        path: "/infoDetail/:name",
        component: InfoDetail,
        meta: { desc: "个人信息详情" },
      },
      {
        path: "/departDetail",
        component: DepartDetail,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/bugManage",
        component: BugManage,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/department",
        component: department,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/militaryNews",
        name: "MilitaryNews",
        component: MilitaryNews,
      },
      {
        path: "/politicalNews",
        name: "PoliticalNews",
        component: PoliticalNews,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/newDetail",
        name: "newDetail",
        component: NewDetail,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/militaryEquipment",
        name: "militaryEquipment",
        component: MilitaryEquipment,
        meta: { desc: "" },
      },
      {
        path: "/equipmentDetail",
        component: EquipmentDetail,
        meta: { desc: "" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
