<template>
  <el-empty :description="desc"></el-empty>
</template>

<script setup lang="ts">
const props = defineProps<{
  desc?: string;
}>();
</script>
