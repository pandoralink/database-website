<template>
  <div class="base-list-item" @click="clickItem">
    <div class="base-list-item-text">
      <span v-if="showIndex" class="base-list-item-index" @click="clickIndex">{{
        index
      }}</span>
      <div class="base-list-item-text-content" @click="clickContent">
        <slot></slot>
      </div>
    </div>
    <div style="display: flex; align-items: center">
      <img
        v-if="showImg"
        class="base-list-item-img"
        :src="src"
        :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }"
        @click="clickImg"
      />
      <slot name="right" />
    </div>
    <div style="width: 100%">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * showIndex: 是否显示序号
 */
interface Props {
  index?: number;
  src?: string;
  imgWidth?: number;
  imgHeight?: number;
  showIndex?: boolean;
  showImg?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  index: 1,
  imgHeight: 120,
  imgWidth: 180,
  src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp7.itc.cn%2Fimages01%2F20201110%2F990c0a6943d74588b158f197dd61e22e.jpeg&refer=http%3A%2F%2Fp7.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644332662&t=8faead9102c797b0438f70199a37bffb",
  showIndex: true,
  showImg: true,
});

const emits = defineEmits<{
  (e: "clickIndex", index: number): void;
  (e: "clickContent", index: number): void;
  (e: "clickImg", index: number): void;
  (e: "clickItem", index: number): void;
}>();

function clickIndex() {
  emits("clickIndex", props.index);
}

function clickContent() {
  emits("clickContent", props.index);
}

function clickImg() {
  emits("clickImg", props.index);
}

function clickItem() {
  emits("clickItem", props.index);
}
</script>

<style></style>
