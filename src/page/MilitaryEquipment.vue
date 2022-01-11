<template>
  <base-filter :show-text-list="filterList" @delete="deleteFilterOption">
    <div class="filter-content">
      <el-button
        class="filter-content-button"
        v-for="(item, index) in filterOptions"
        :key="item"
        @click="activeFilterOption = index"
        :class="{ active: activeFilterOption === index }"
      >
        {{ item }}
      </el-button>
    </div>
    <div class="filter-content" style="margin-top: 10px"></div>
  </base-filter>
  <slot name="header-tag"> </slot>
  <div class="base-content">
    <base-list-item
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.image"
      @click-content="toInfoDetail"
    >
      <template #default>
        <span>名称: {{ item.name }}</span
        ><br />
        <span>编号: {{ item.id }}</span
        ><br />
        <span>功能: {{ item.features }}</span
        ><br />
        <span>部署地点: {{ item.location }}</span
        ><br />
        <span>所属部门编号: {{ item.dpNumber }}</span
        ><br />
      </template>
    </base-list-item>
  </div>
  <div id="base-pagination">
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseFilter from "../components/BaseFilter.vue";
import BaseListItem from "../components/BaseListItem.vue";
import { MilitaryEquipment } from "../model/model";

const list: MilitaryEquipment[] = [
  {
    name: "巴雷特M82A1",
    id: "0001",
    features: "开炮！",
    details: "连发狙击枪",
    location: "10#507",
    dpNumber: "0001",
    image:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbkimg.cdn.bcebos.com%2Fpic%2F9345d688d43f87943d5954f4dc1b0ef41ad53a41&refer=http%3A%2F%2Fbkimg.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644416765&t=7cbbd4b4ff1b260b0b342bd4891cec35",
  },
];
for (let i = 0; i < 9; i++) {
  list.push(list[0]);
}

const filterOptions: string[] = [];
const filterList = ref({});
let activeFilterOption = ref(0);
const router = useRouter();

function deleteFilterOption(key: string) {
  console.log(key);
}
function toInfoDetail(index: number) {
  router.push("/equipmentDetail");
}
</script>
