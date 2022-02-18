<template>
  <content-header
    :show-text-list="filterList"
    @option-delete="deleteFilterOption"
    @insert="insert"
    @cancel-del="cancelDel"
    @confirm-del="confirmDel"
    @on-is-delete="del"
  >
    <template #default>
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
    </template>
  </content-header>
  <div class="base-content">
    <base-list-item
      :class="{ delete: item.isDel }"
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.image"
      :img-height="130"
      :img-width="250"
      @click-item="selectDel($event, item.isDel)"
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
  <base-dialog v-model="isOpen" @close="cancelInsert" @confirm="confirmInsert">
    <template #content>
      <el-form ref="form" :model="insertOb" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="insertOb['title']" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="封面链接">
          <el-input
            v-model="insertOb['image']"
            placeholder="http://hao123.com/"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻描述">
          <el-input
            v-model="insertOb['briefIntroduction']"
            placeholder="这可是个大新闻"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细信息">
          <el-input
            v-model="insertOb['details']"
            placeholder="详细信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻链接">
          <el-input
            v-model="insertOb['url']"
            placeholder="http://hao123.com/"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input
            v-model="insertOb['time']"
            placeholder="2022/2/18"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="insertOb['author']" placeholder="作者"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseFilter from "../components/BaseFilter.vue";
import BaseListItem from "../components/BaseListItem.vue";
import { News, Result } from "../model/model";
import { FilterNews } from "../model/filter";
import { useRouter } from "vue-router";
import {
  getMilitaryNewsByDetails,
  getMilitaryNewsByTime,
  getMilitaryNewsByTitle,
  getNewList,
  deleteMilitaryNews,
  insertMilitaryNews,
} from "@/api/news";
import { useNewsStore } from "@/store/new";
import empty from "./empty.vue";
import { multipleFilter } from "@/utils/filter";
import ContentHeader from "@/components/ContentHeader.vue";
import { ElMessage } from "element-plus";
import BaseDialog from "../components/BaseDialog.vue";

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

let isDelete = ref(false);
const del = (value: boolean) => {
  isDelete.value = value;
};
const cancelDel = () => {
  const arr = list.value;
  for (let i = 0; i < arr.length; i++) {
    arr[i].isDel = false;
  }
};
const confirmDel = async () => {
  list.value.forEach(async (item) => {
    if (item.isDel) {
      const { data } = await deleteMilitaryNews(item.url);
      const res = data as Result;
      if (res.code !== 0) {
        item.isDel = false;
        ElMessage.error("操作失败，请重试");
      }
    }
  });
  list.value = list.value.filter((item) => !item.isDel);
};
const selectDel = (index: number, isDel = false) => {
  if (isDelete.value) {
    // <base-list-item> emit 的 index 以 1 为起点
    list.value[index - 1].isDel = !isDel;
  }
};
// 插入
let insertOb = ref<News>({} as News);
const isOpen = ref(false);
const insert = () => (isOpen.value = true);
const cancelInsert = () => (isOpen.value = false);
const confirmInsert = async () => {
  cancelInsert();
  const { data } = await insertMilitaryNews(insertOb.value);
  const res = data as Result;
  if (res.code === 0) {
    list.value.unshift(insertOb.value);
    // 展示页面需为 10
    list.value.pop();
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
  insertOb.value = {} as News;
};
</script>
