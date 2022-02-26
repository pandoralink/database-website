<template>
  <!-- XXX: 两个 News 的 content-header 拓展是一致的，可以整合 -->
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
    <empty v-if="list.length === 0" desc="没有数据了" />
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
  <!-- XXX: 两个 News Dialog 是同样的逻辑，需整合 -->
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
import BaseListItem from "../components/BaseListItem.vue";
import { News } from "@/model/model";
import { FilterNews } from "@/model/filter";
import { useRouter } from "vue-router";
import { useNewsStore } from "@/store/new";
import {
  deletePoliticalNews,
  getPoliticalNewsByDetails,
  getPoliticalNewsByTime,
  getPoliticalNewsByTitle,
  getPoliticalNewsList,
  insertPoliticalNews,
} from "@/api/news";
import { multipleFilter } from "@/utils/filter";
import ContentHeader from "@/components/ContentHeader.vue";
import BaseDialog from "../components/BaseDialog.vue";
import { NewsType } from "@/types";
import { useInsert } from "@/mixins/insert";
import empty from "./empty.vue";
import { useDelete } from "@/mixins/delete";

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
    filterChange();
  } else if (key === "time") {
    filterList.value.time = "";
    filterChange();
  } else {
    filterList.value.details = "";
    filterChange();
  }
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
  newsStore.updateForm(list.value[index - 1], NewsType.POLITICAL);
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

const filterChange = async () => {
  let titleFilterList: News[] = [];
  let timeFilterList: News[] = [];
  let detailsFilterList: News[] = [];
  // XXX: 应该定义工具类去简化代码
  if (filterList.value.title !== "") {
    const { data } = await getPoliticalNewsByTitle(filterList.value.title);
    if (data instanceof Array) {
      titleFilterList.push(...data);
    } else titleFilterList.push(data);
  }
  if (filterList.value.time !== "") {
    const { data } = await getPoliticalNewsByTime(filterList.value.time);
    if (data instanceof Array) {
      timeFilterList.push(...data);
    } else timeFilterList.push(data);
  }
  if (filterList.value.details !== "") {
    const { data } = await getPoliticalNewsByDetails(filterList.value.details);
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

const { del, cancelDel, confirmDel, selectDel } = useDelete(
  list,
  deletePoliticalNews,
  "url"
);
// 插入
const { insertOb, isOpen, insert, cancelInsert, confirmInsert } =
  useInsert<News>(list, insertPoliticalNews);
</script>
