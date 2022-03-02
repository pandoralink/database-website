<template>
  <div class="header_container">
    <div class="menu-top">Vietnam Website</div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="{ path: item }"
        v-for="(item, index) in $route"
        :key="index"
        >{{ item.meta.desc }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup></script>
