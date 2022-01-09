<template>
  <el-row
    ><el-col :span="24">
      <head-top></head-top> </el-col
  ></el-row>
  <el-row class="main-page">
    <el-col :span="4" class="store-sidebar">
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
          <el-menu-item index="2-1" route="userInfo">军事新闻</el-menu-item>
          <el-menu-item index="2-2" route="userInfo">政治新闻</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3" route="userInfo">部门</el-menu-item>
        <el-menu-item index="4" route="userInfo">军事设备</el-menu-item>
        <el-menu-item index="5" route="map">越南地图</el-menu-item>
        <el-menu-item index="6" route="userInfo">爬虫管理</el-menu-item>
      </el-menu>
    </el-col>
    <el-col
      :span="20"
      style="
        height: 100%;
        overflow: auto;
        background-color: #f5f5f5;
        padding: 12px 24px;
      "
    >
      <router-view />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import headTop from "../components/headTop.vue";
</script>
