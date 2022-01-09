<template>
  <div class="base-list-item">
    <div class="base-list-item-text">
      <span class="base-list-item-index">{{ index }}</span>
      <div class="base-list-item-text-content">
        <slot></slot>
      </div>
    </div>
    <img
      class="base-list-item-img"
      :src="src"
      :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  index: number;
  src: string;
  imgWidth: number;
  imgHeight: number;
}

const props = withDefaults(defineProps<Props>(), {
  index: 1,
  imgHeight: 120,
  imgWidth: 120,
  src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp7.itc.cn%2Fimages01%2F20201110%2F990c0a6943d74588b158f197dd61e22e.jpeg&refer=http%3A%2F%2Fp7.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644332662&t=8faead9102c797b0438f70199a37bffb",
});
</script>

<style></style>
]
