<template>
  <el-row align="middle" style="background: white">
    <el-col :span="3">
      <div class="menu-top">Vietnam Website</div>
    </el-col>
    <el-col :span="21">
      <el-breadcrumb class="i-breadcrumb" separator="/">
        <el-breadcrumb-item
          v-for="v in data.breadcrumbList"
          :key="v.path"
          :to="{ path: v.path }"
          >{{ v.desc }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { watch } from "vue";
import { reactive } from "@vue/reactivity";

// 路由元信息，用于面包屑导航
interface IRouteMeta {
  path?: string;
  desc?: string | string[];
}

const route = useRoute();

const updateBreadcrumb = () => {
  const breadcrumbList: Array<IRouteMeta> = [];
  // const notShowBreadcrumbList = ["Dashboard", "RedirectPage"]; // 不显示面包屑的导航
  // if (
  //   route.matched[0] &&
  //   notShowBreadcrumbList.includes(route.matched[0].name as string)
  // )
  //   return breadcrumbList;
  route.matched.forEach((v) => {
    const obj: IRouteMeta = {
      desc: v.meta.desc,
      path: v.path,
    };
    breadcrumbList.push(obj);
  });
  return breadcrumbList;
};
const data = reactive({
  breadcrumbList: updateBreadcrumb(),
});
watch(
  () => route.path,
  () => (data.breadcrumbList = updateBreadcrumb())
);
</script>
