<template>
  <el-table :data="tableData" style="width: 100%" :border="true">
    <el-table-column type="index" label="序号" width="60" />
    <el-table-column prop="url" label="爬虫链接" width="340">
    </el-table-column>
    <el-table-column prop="remarks" label="功能备注"></el-table-column>
    <el-table-column prop="auther" label="作者"></el-table-column>
    <el-table-column prop="state" label="状态">
      <el-tag type="success">正常</el-tag>
    </el-table-column>
    <el-table-column prop="operation" label="操作">
      <template #default>
        <el-button type="primary" round>运行</el-button>
        <el-button type="danger" round>关闭</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { getBugList } from "@/api/bug";
import { Bug } from "@/model/model";
import { ref } from "vue";

const tableData = ref<Bug[]>([]);

const getList = async () => {
  const { data } = await getBugList("何首其");
  tableData.value = data;
};
getList();
</script>
