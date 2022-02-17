<template>
  <el-dialog :title="title" :show-close="false" destroy-on-close>
    <slot name="content"></slot>
    <template #footer>
      <el-button @click="close">关闭</el-button>
      <el-button @click="confirm">确认 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();

const emit = defineEmits(["close", "confirm"]);

function close() {
  emit("close");
}

function confirm() {
  emit("confirm");
}
</script>

<style></style>
