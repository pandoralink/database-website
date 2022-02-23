<template>
  <div class="content-head">
    <base-filter :show-text-list="showTextList" @delete="optionDelete">
      <template #default>
        <slot></slot>
      </template>
    </base-filter>
    <div class="header-option">
      <el-button type="primary" v-if="showIns" :icon="Plus" @click="insert"
        >新增
      </el-button>
      <el-tooltip class="box-item" effect="light" content="选中删除">
        <el-button type="primary" v-if="showDel" :icon="Delete" @click="del"
          >{{ isDelete ? "取消删除" : "删除" }}
        </el-button>
      </el-tooltip>
      <el-button
        type="danger"
        :icon="Delete"
        v-if="isDelete"
        @click="confirmDel"
        >确认删除
      </el-button>
      <el-button type="primary" v-if="showUpdate" :icon="Edit" @click="update"
        >更新
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRef, toRefs, watch } from "vue";
import BaseFilter from "./BaseFilter.vue";
import { Plus, Delete, Edit } from "@element-plus/icons";

interface Props {
  showDel?: boolean;
  showIns?: boolean;
  showUpdate?: boolean;
  showTextList: Record<string, unknown>;
}

const props = withDefaults(defineProps<Props>(), {
  showDel: true,
  showIns: true,
  showUpdate: false,
});

/**
 * onIsDelete: 当组件内部`删除`按钮标志位发生改变时
 */
const emits = defineEmits<{
  (e: "optionDelete", key: string): void;
  (e: "cancelDel"): void;
  (e: "insert"): void;
  (e: "update"): void;
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
const update = () => {
  emits("update");
};

watch(isDelete, (newIsDelete, oldIsDelete) => {
  emits("onIsDelete", newIsDelete);
});
</script>
