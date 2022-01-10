<template>
  <el-table :data="tableData" style="width: 100%" :border="true">
    <el-table-column type="index" label="序号" width="60" />
    <el-table-column prop="url" label="爬虫链接" width="340">
      https://modao.cc/app/design/pbky1nx34ah18zcs
    </el-table-column>
    <el-table-column prop="desc" label="功能备注"> 墨刀 </el-table-column>
    <el-table-column prop="author" label="作者"> 罗豪 </el-table-column>
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
const tableData = [{},{},{},{},{},{},{},{},{},{}];
</script>
