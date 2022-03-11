<template>
  <el-row align="middle" style="background: white">
    <el-col :span="3">
      <div class="menu-top">Vietnam Website</div>
    </el-col>
    <el-col :span="21">
      <el-page-header
        :icon="ArrowLeftBold"
        title=" "
        :content="$route.meta.desc"
        @back="goBack"
      />
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
</script>
