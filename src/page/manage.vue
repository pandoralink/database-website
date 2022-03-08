<template>
  <el-row>
    <el-col :span="24" style="height: 60px">
      <breadcrumb></breadcrumb>
    </el-col>
  </el-row>
  <el-row class="main-page">
    <el-col :span="3" class="store-sidebar">
      <el-menu
        default-active="1"
        text-color="#FFFFFF"
        active-text-color="#FFFFFF"
        background-color="#52B7F5"
        router
        style="min-height: 100%"
        unique-opened
      >
        <el-menu-item index="1" route="info">首页</el-menu-item>
        <el-sub-menu index="2">
          <template #title>新闻</template>
          <el-menu-item index="2-1" route="MilitaryNews">军事新闻</el-menu-item>
          <el-menu-item index="2-2" route="PoliticalNews"
            >政治新闻
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3" route="department">部门</el-menu-item>
        <el-menu-item index="4" route="militaryEquipment"
          >军事设备
        </el-menu-item>
        <el-menu-item index="5" route="map">越南地图</el-menu-item>
        <el-menu-item index="6" route="bugManage">爬虫管理</el-menu-item>
      </el-menu>
    </el-col>
    <el-col
      :span="21"
      style="
        height: 100%;
        overflow: auto;
        background-color: #f5f5f5;
        padding: 12px 24px;
      "
    >
      <!-- TODO: 部分路由需要做 keep-alive -->
      <router-view />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ElNotification } from "element-plus";
import { onMounted } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

onMounted(() => {
  ElNotification({
    title: "项目地址",
    message: "https://github.com/pandoralink/database-website",
    position: "bottom-right",
  });
});
</script>
