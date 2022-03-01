<template>
  <base-list-item :src="data.image" :show-index="false">
    <template #default>
      <!-- 存在 <span> 吞空格的情况 -->
      <span>部门编号: {{ data.number }}</span
      ><br />
      <span>部门类型: {{ data.type }}</span
      ><br />
      <span>部门名称: {{ data.name }}</span
      ><br />
      <span>部门地点: {{ data.location }}</span
      ><br />
      <span>部门职位: {{ data.position }}</span
      ><br />
      <span>联系方式: {{ data.contactInformation }}</span
      ><br />
    </template>
  </base-list-item>
  <el-button @click="change(0)" type="primary"> 成员列表</el-button>
  <el-button @click="change(1)" type="primary"> 武器库</el-button>
</template>

<script lang="ts" setup>
import BaseListItem from "@/components/BaseListItem.vue";
import { Department } from "@/model/model";

enum DepartDataType {
  EMPLOY = 0,
  EQUIPMENT = 1,
}

/**
 * change: 切换成员列表和武器库
 */
const emits = defineEmits<{
  (e: "change", type: DepartDataType): void;
}>();

const props = defineProps<{
  data: Department;
}>();

const change = (type: DepartDataType) => {
  emits("change", type);
};
</script>

<style scoped></style>
