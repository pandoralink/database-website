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
      <el-input
        v-model="filterList.name"
        placeholder="姓名"
        v-if="activeFilterOption === 0"
        @change="filterChange"
      ></el-input>
      <el-input
        v-model="filterList.id"
        placeholder="身份证"
        v-if="activeFilterOption === 1"
        @change="filterChange"
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
    <el-pagination
      v-model:currentPage="currentPage"
      background
      layout="prev, pager, next"
      :total="100"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseFilter from "../components/BaseFilter.vue";
import BaseListItem from "../components/BaseListItem.vue";
import { People } from "../model/model";
import { FilterInfo } from "../model/filter";
import { useRouter } from "vue-router";
import { getPeopleList, getPeopleById, getPeopleByName } from "@/api/people";

const router = useRouter();

let list = ref<People[]>([]);

const filterOptions: string[] = ["姓名", "身份证"];
const filterList = ref<FilterInfo>({
  name: "",
  id: "",
});
let activeFilterOption = ref(0);

function deleteFilterOption(key: string) {
  if (key === "name") {
    filterList.value.name = "";
    filterChange();
  } else if (key === "id") {
    filterList.value.id = "";
    filterChange();
  }
  if (!filterList.value.name && !filterList.value.id) {
    getList(currentPage.value);
  }
}
function toInfoDetail(index: number) {
  router.push("/infoDetail");
}

const currentPage = ref(1);
const getList = async (num = 1) => {
  const { data } = await getPeopleList(num);
  list.value = data;
};
getList();

watch(currentPage, (newCurrentPage, oldCurrentPage) => {
  getList(newCurrentPage);
});

// filter
const filterChange = async () => {
  let nameFilterList: People[] = [];
  let idFilterList: People[] = [];
  let res: People[] = [];
  if (filterList.value.name !== "") {
    const { data } = await getPeopleByName(filterList.value.name);
    if (data instanceof Array) {
      nameFilterList.push(...data);
    } else nameFilterList.push(data);
  } else if (filterList.value.id !== "") {
    const { data } = await getPeopleById(filterList.value.id);
    // 后端 data 可能不为 array 而是 object, 因此全部采用 push
    if (data instanceof Array) {
      idFilterList.push(...data);
    } else idFilterList.push(data);
  }
  const allFilterlist = [nameFilterList, idFilterList];
  for (let i = 0; i < allFilterlist.length; i++) {
    if (allFilterlist[i].length > 0 && res.length > 0) {
      allFilterlist[i].forEach((i) => {
        const temp: People[] = [];
        res.forEach((j) => {
          if (i.number === j.number) {
            temp.push(j);
          }
        });
        res = temp;
      });
    } else if (allFilterlist[i].length > 0 && res.length === 0) {
      res.push(...allFilterlist[i]);
    }
  }
  list.value = res;
};
</script>
