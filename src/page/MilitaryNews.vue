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
        <p class="new-briefIntroduction">{{ item.briefIntroduction }}</p
        ><br />
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
import { ref } from "vue";
import BaseFilter from "../components/BaseFilter.vue";
import BaseListItem from "../components/BaseListItem.vue";
import { New } from "../model/model";
import { FilterInfo } from "../model/filter";
import { useRouter } from "vue-router";

const list: New[] = [
  {
    title: "好家伙，这标题这么牛牛！！！！！！！！",
    image: "http://inews.gtimg.com/newsapp_ls/0/14407484937_640330/0",
    briefIntroduction:
      "好家伙，这简介这么长XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    details: "",
    url: "https://news.qq.com/",
    time: "2021/1/6",
    author: "罗通",
  },
];
for (let i = 0; i < 9; i++) {
  list.push(list[0]);
}

const filterOptions: string[] = ["姓名", "时间"];
const filterList = ref<FilterInfo>({
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
  console.log(index);
  router.push("/newDetail");
}
</script>
