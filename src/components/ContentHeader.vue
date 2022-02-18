<template>
  <div class="content-head">
    <base-filter :show-text-list="showTextList" @delete="optionDelete">
      <template #default>
        <slot></slot>
      </template>
    </base-filter>
    <div class="header-option">
      <el-button type="primary" :icon="Plus" @click="insert">新增</el-button>
      <el-button type="primary" :icon="Delete" @click="del">{{
        isDelete ? "取消删除" : "删除"
      }}</el-button>
      <el-button
        type="danger"
        :icon="Delete"
        v-if="isDelete"
        @click="confirmDel"
        >确认删除</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import BaseFilter from "./BaseFilter.vue";
import { Plus, Delete } from "@element-plus/icons";

const props = defineProps<{
  showTextList?: Record<string, unknown>;
}>();

/**
 * onIsDelete: 当组件内部删除标志位发生改变时
 */
const emits = defineEmits<{
  (e: "optionDelete", key: string): void;
  (e: "cancelDel"): void;
  (e: "insert"): void;
  (e: "confirmDel"): void;
  (e: "onIsDelete", value: boolean): void;
}>();

const optionDelete = (key: string) => {
  emits("optionDelete", key);
};

let isDelete = ref(false);
const del = () => {
  isDelete.value = !isDelete.value;
  if (isDelete.value === false) {
    cancelDel();
  }
};
const cancelDel = () => {
  emits("cancelDel");
};
const confirmDel = () => {
  isDelete.value = false;
  emits("confirmDel");
};
const insert = () => {
  emits("insert");
};

watch(isDelete, (newIsDelete, oldIsDelete) => {
  emits("onIsDelete",newIsDelete);
});
</script>
