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
    component: () => import("../page/Login.vue"),
  },
  {
    path: "/login",
    component: () => import("../page/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("../page/register.vue"),
  },
  {
    path: "/manage",
    component: () => import("../page/manage.vue"),
    name: "",
    meta: { desc: "主页" },
    children: [
      {
        path: "/map",
        component: map,
      },
      {
        path: "",
        component: info,
        meta: { desc: "个人信息" },
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
        path: "/equipmentDetail",
        component: EquipmentDetail,
        meta: { desc: "设备详情" },
      },
      {
        path: "/bugManage",
        component: BugManage,
        meta: { desc: "爬虫管理" },
      },
      {
        path: "/department",
        component: department,
        meta: { desc: "部门" },
      },
      {
        path: "/departDetail",
        component: DepartDetail,
        meta: { desc: "部门详情" },
      },
      {
        path: "/militaryNews",
        name: "MilitaryNews",
        component: MilitaryNews,
        meta: { desc: "军事新闻" },
      },
      {
        path: "/politicalNews",
        name: "PoliticalNews",
        component: PoliticalNews,
        meta: { desc: "政治新闻" },
      },
      {
        path: "/newDetail",
        name: "newDetail",
        component: NewDetail,
        meta: { desc: "新闻详情" },
      },
      {
        path: "/militaryEquipment",
        name: "militaryEquipment",
        component: MilitaryEquipment,
        meta: { desc: "军事设备" },
      },
      {
        path: "/spouse",
        name: "spouse",
        component: () => import("@/components/table/Spouse.vue"),
        meta: { desc: "配偶详情" },
      },
      {
        path: "/paternity",
        name: "paternity",
        component: () => import("@/components/table/Paternity.vue"),
        meta: { desc: "子女详情" },
      },
      {
        path: "/supHierarchy",
        component: () => import("@/components/table/Hierarchy.vue"),
        meta: { desc: "上级" },
      },
      {
        path: "/subHierarchy",
        component: () => import("@/components/table/Hierarchy.vue"),
        meta: { desc: "下级" },
      },
      {
        path: "/employment",
        name: "employment",
        component: () => import("@/page/Employment.vue"),
        meta: { desc: "职员" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
