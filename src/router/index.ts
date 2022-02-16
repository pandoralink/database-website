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
const DepartmentDetail = () => import("../page/DepartmentDetail.vue");
const DepartDetail = () => import("../page/DepartDetail.vue");
const InfoDetail = () => import("../page/InfoDetail.vue");

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
        path: "/department",
        component: department,
        meta: { desc: ["文件查看"] },
      },
      {
        path: "/militaryNews",
        component: MilitaryNews,
        meta: { desc: ["文件查看"] },
        props: true,
      },
      {
        path: "/politicalNews",
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
