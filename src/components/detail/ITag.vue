<template>
  <div>
    <el-tag effect="dark" size="large">{{ title }}</el-tag>
    <div class="employ-relation">
      <slot name="content">
        <tag-detail
          v-for="(item, index) in list"
          :key="index"
          :img="item.img"
          :content="item.content"
          :round="item.round"
          :circle="item.circle"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TagDetail from "@/components/detail/TagDetail.vue";

interface TagDetail {
  img?: string;
  circle?: boolean;
  round?: boolean;
  content: string;
}

const props = defineProps<{
  title?: string;
  list?: TagDetail[];
}>();
</script>

<style scoped></style>
