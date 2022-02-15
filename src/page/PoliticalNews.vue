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
        v-model="filterList.name"
        placeholder="姓名"
        v-if="activeFilterOption === 0 && filterOptions.length !== 0"
      ></el-input>
      <el-input
        v-model="filterList.time"
        placeholder="时间"
        v-if="activeFilterOption === 1"
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
  </div>
  <div id="base-pagination">
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseFilter from "../components/BaseFilter.vue";
import BaseListItem from "../components/BaseListItem.vue";
import { New } from "../model/model";
import { FilterNew } from "../model/filter";
import { useRouter } from "vue-router";
import { getPoliticalNewsList } from "@/api/news";
import { useNewsStore } from "@/store/new";

let list = ref<New[]>([]);

const filterOptions: string[] = ["姓名", "时间"];
const filterList = ref<FilterNew>({
  name: "",
  time: "",
});
let activeFilterOption = ref(0);
const router = useRouter();

function deleteFilterOption(key: string) {
  if (key === "name") {
    filterList.value.name = "";
  } else if (key === "time") {
    filterList.value.time = "";
  }
}
function toInfoDetail(index: number) {
  const newsStore = useNewsStore();
  newsStore.updateNewsUrl(list.value[index - 1].url);
  router.push("/newDetail");
}

const currentPage = ref(1);
const getList = async (num = 1) => {
  const { data } = await getPoliticalNewsList(num);
  list.value = data;
};
getList();

watch(currentPage, (newCurrentPage, oldCurrentPage) => {
  getList(newCurrentPage);
});
</script>
