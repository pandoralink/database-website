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
    <div class="filter-content" style="margin-top: 10px">
      <!-- 没有选择和 button 一起循环是为了方便扩展 -->
      <el-input
        v-model="filterList.department"
        placeholder="部门"
        v-if="activeFilterOption === 0"
      ></el-input>
      <el-input
        v-model="filterList.name"
        placeholder="名称"
        v-if="activeFilterOption === 1"
      ></el-input>
      <el-input
        v-model="filterList.id"
        placeholder="身份证"
        v-if="activeFilterOption === 2"
      ></el-input>
      <el-input
        v-model="filterList.employName"
        placeholder="职位"
        v-if="activeFilterOption === 3"
      ></el-input>
    </div>
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
        <span>姓名: {{ item.name }}</span
        ><br />
        <span>年龄: {{ item.age }}</span
        ><br />
        <span>国籍: {{ item.nationality }}</span
        ><br />
        <span>身份证号: {{ item.number }}</span
        ><br />
        <span>党派: {{ item.parties }}</span
        ><br />
        <span>学历: {{ item.education }}</span
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
import BaseFilter from "../components/BaseFilter.vue";
import BaseListItem from "../components/BaseListItem.vue";
import { People } from "../model/model";
import { FilterInfo } from "../model/filter";
import { useRouter } from "vue-router";

const list = [
  {
    name: "罗通",
    age: 21,
    nationality: "中国",
    image:
      "https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505",
    number: 372523198009045752,
    parties: "中国共产党",
    education: "本科",
  },
];
for (let i = 0; i < 9; i++) {
  list.push(list[0]);
}

const filterOptions: string[] = ["部门", "时间", "身份证", "职位"];
const filterList = ref<FilterInfo>({
  department: "",
  name: "",
  id: "",
  employName: "",
});
let activeFilterOption = ref(0);
const router = useRouter();

function deleteFilterOption(key: string) {
  if (key === "department") {
    filterList.value.department = "";
  } else if (key === "name") {
    filterList.value.name = "";
  } else if (key === "id") {
    filterList.value.id = "";
  } else if (key === "employName") {
    filterList.value.employName = "";
  }
}
function toInfoDetail(index: number) {
  router.push("/infoDetail");
}
</script>
