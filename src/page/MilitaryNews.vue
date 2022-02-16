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
        v-model="filterList.title"
        placeholder="标题"
        @change="filterChange"
        v-if="activeFilterOption === 0 && filterOptions.length !== 0"
      ></el-input>
      <el-input
        v-model="filterList.time"
        placeholder="时间"
        @change="filterChange"
        v-if="activeFilterOption === 1"
      ></el-input>
      <el-input
        v-model="filterList.details"
        placeholder="内容"
        @change="filterChange"
        v-if="activeFilterOption === 2"
      ></el-input>
    </div>
  </base-filter>
  <div class="base-content">
    <base-list-item
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.image"
      :img-height="130"
      :img-width="250"
      @click-content="toInfoDetail"
    >
      <template #default>
        <span class="new-title">{{ item.title }}</span
        ><br />
        <p class="new-briefIntroduction">{{ item.briefIntroduction }}</p>
        <br />
        <span class="new-author">{{ item.author }}</span>
        <span>{{ item.time }}</span>
      </template>
    </base-list-item>
    <empty v-if="list.length === 0" desc="没有数据了"></empty>
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
import { News } from "../model/model";
import { FilterNews } from "../model/filter";
import { useRouter } from "vue-router";
import {
  getMilitaryNewsByDetails,
  getMilitaryNewsByTime,
  getMilitaryNewsByTitle,
  getNewList,
} from "@/api/news";
import { useNewsStore } from "@/store/new";
import empty from "./empty.vue";
import { multipleFilter } from "@/utils/filter";

let list = ref<News[]>([]);

const filterOptions: string[] = ["标题", "时间", "内容"];
const filterList = ref<FilterNews>({
  title: "",
  time: "",
  details: "",
});
let activeFilterOption = ref(0);
const router = useRouter();

function deleteFilterOption(key: string) {
  if (key === "title") {
    filterList.value.title = "";
  } else if (key === "time") {
    filterList.value.time = "";
  } else {
    filterList.value.details = "";
  }
  filterChange();
  if (
    !filterList.value.title &&
    !filterList.value.time &&
    !filterList.value.details
  ) {
    getList(currentPage.value);
  }
}
function toInfoDetail(index: number) {
  const newsStore = useNewsStore();
  newsStore.updateNewsUrl(list.value[index - 1].url);
  router.push("/newDetail");
}

const currentPage = ref(1);
const getList = async (num = 1) => {
  const { data } = await getNewList(num);
  list.value = data;
};
getList();

watch(currentPage, (newCurrentPage, oldCurrentPage) => {
  getList(newCurrentPage);
});

const filterChange = async () => {
  let titleFilterList: News[] = [];
  let timeFilterList: News[] = [];
  let detailsFilterList: News[] = [];
  // 应该定义工具类去简化代码
  if (filterList.value.title !== "") {
    const { data } = await getMilitaryNewsByTitle(filterList.value.title);
    if (data instanceof Array) {
      titleFilterList.push(...data);
    } else titleFilterList.push(data);
  }
  if (filterList.value.time !== "") {
    const { data } = await getMilitaryNewsByTime(filterList.value.time);
    if (data instanceof Array) {
      timeFilterList.push(...data);
    } else timeFilterList.push(data);
  }
  if (filterList.value.details !== "") {
    const { data } = await getMilitaryNewsByDetails(filterList.value.details);
    if (data instanceof Array) {
      detailsFilterList.push(...data);
    } else detailsFilterList.push(data);
  }
  list.value = multipleFilter(
    "title",
    timeFilterList,
    titleFilterList,
    detailsFilterList
  );
};
</script>
