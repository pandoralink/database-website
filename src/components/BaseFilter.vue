<template>
  <div class="base-filter">
    <div>
      <el-input
        style="border-radius: 10px; background-color: #f5f5f5"
        v-model="searchContent"
        placeholder="罗通竟然.."
      >
        <template #prefix>
          <el-icon class="el-input__icon" :color="black">
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>
    <div style="display: flex">
      <el-icon :size="24" :color="black">
        <Filter />
      </el-icon>
      <p style="margin: 0">筛选</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Filter, Search } from "@element-plus/icons";
import { ref } from "vue";

const black = "black";
const searchContent = ref("");
</script>

<style></style>
]
