<template>
  <div class="employ-relation-detail">
    <img :src="img" :class="{ circle: circle, round: round }" style="" />
    <br />
    <span>{{ content }}</span>
  </div>
</template>

<script lang="ts" setup>
interface TagDetail {
  img?: string;
  circle?: boolean;
  round?: boolean;
  content: string;
}

const props = withDefaults(defineProps<TagDetail>(), {
  circle: true,
  round: false,
});
</script>

<style scoped>
.circle {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}

.round {
  width: 180px;
  height: 120px;
  border-radius: 30px;
}
</style>
