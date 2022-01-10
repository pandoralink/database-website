<!-- 暂被废弃 -->
<template>
  <span v-for="(item, index) in list" :key="index">
    {{ item.key }}: {{ item.value }}
  </span>
</template>

<script lang="ts" setup>
import { KeyValue } from "../model/model";

interface Props {
  list: KeyValue[];
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [{ key: "key", value: "value" }] as KeyValue[],
});
</script>
