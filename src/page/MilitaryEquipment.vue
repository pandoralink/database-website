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
  </div>
  <div id="base-pagination">
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { getMilitaryEquipmentList } from "@/api/militaryEquipment";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import BaseFilter from "../components/BaseFilter.vue";
import BaseListItem from "../components/BaseListItem.vue";
import { MilitaryEquipment } from "../model/model";

let list = ref<MilitaryEquipment[]>([]);

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

const currentPage = ref(1);
const getList = async (num = 1) => {
  const { data } = await getMilitaryEquipmentList(num);
  list.value = data;
};
getList();

watch(currentPage, (newCurrentPage, oldCurrentPage) => {
  getList(newCurrentPage);
});
</script>
