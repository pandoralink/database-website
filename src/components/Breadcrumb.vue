<template>
  <el-row align="middle" style="background: white">
    <el-col :span="3">
      <div class="menu-top">Vietnam Website</div>
    </el-col>
    <el-col :span="18">
      <el-page-header
        :icon="ArrowLeftBold"
        title=" "
        :content="$route.meta.desc"
        @back="goBack"
      />
    </el-col>
    <el-col :span="3" style="text-align: center">
      <el-button type="primary" @click="logout">退出登录</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ArrowLeftBold } from "@element-plus/icons";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
const logout = () => {
  router.push("/login");
};
</script>
