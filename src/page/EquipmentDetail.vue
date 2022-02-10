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
  <div class="base-content new">
    <!-- 左边距统一为 20px -->
    <base-list-item
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.image"
    >
      <template #default>
        <span>名称: {{ item.name }}</span
        ><br />
        <span>编号: {{ item.number }}</span
        ><br />
        <span>功能: {{ item.function }}</span
        ><br />
        <span>部署地点: {{ item.location }}</span
        ><br />
        <span>所属部门编号: {{ item.dpNumber }}</span
        ><br />
      </template>
    </base-list-item>
    <el-tag type="primary" effect="dark" size="large" style="margin-left: 20px;"> 设备详情 </el-tag>
    <p class="equipment-detail">
      鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseFilter from "../components/BaseFilter.vue";
import { MilitaryEquipment, New } from "../model/model";
import { FilterNew } from "../model/filter";
import BaseListItem from "../components/BaseListItem.vue";
import { useRouter } from "vue-router";
// 考虑使用 router 去传递链接信息

const list: MilitaryEquipment[] = [
  {
    name: "巴雷特M82A1",
    number: "0001",
    function: "开炮！",
    details: "连发狙击枪",
    location: "10#507",
    dpNumber: "0001",
    image:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbkimg.cdn.bcebos.com%2Fpic%2F9345d688d43f87943d5954f4dc1b0ef41ad53a41&refer=http%3A%2F%2Fbkimg.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644416765&t=7cbbd4b4ff1b260b0b342bd4891cec35",
  },
];

const filterOptions: string[] = ["姓名", "时间"];
const filterList = ref<FilterNew>({
  name: "",
  time: "",
});
let activeFilterOption = ref(0);

function deleteFilterOption(key: string) {
  if (key === "name") {
    filterList.value.name = "";
  } else if (key === "time") {
    filterList.value.time = "";
  }
}
</script>
