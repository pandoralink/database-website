<template>
  <content-header
    :show-text-list="filterList"
    default-filter-option="title"
    @change="filterChange"
    @insert="insert"
    @cancel-del="cancelDel"
    @confirm-del="confirmDel"
    @on-is-delete="del"
  >
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
      :total="total"
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
import BaseListItem from "../components/BaseListItem.vue";
import { News } from "@/model/model";
import { FilterNews } from "@/model/filter";
import { useRouter } from "vue-router";
import {
  getMilitaryNewsByDetails,
  getMilitaryNewsByTime,
  getMilitaryNewsByTitle,
  getNewList,
  deleteMilitaryNews,
  insertMilitaryNews,
  getMilitaryNewsListTotal,
} from "@/api/news";
import { useNewsStore } from "@/store/new";
import empty from "./empty.vue";
import { isEmpty, multipleFilterByKey, toArray } from "@/utils/filter";
import ContentHeader from "@/components/ContentHeader.vue";
import BaseDialog from "../components/BaseDialog.vue";
import { NewsType } from "@/types";
import { useInsert } from "@/mixins/insert";
import { useDelete } from "@/mixins/delete";
import { useGetList } from "@/mixins/useGetList";

let list = ref<News[]>([]);

const filterList = ref<FilterNews>({
  title: { value: "", alias: "标题" },
  time: { value: "", alias: "时间" },
  details: { value: "", alias: "内容" },
});
const router = useRouter();

function toInfoDetail(index: number) {
  const newsStore = useNewsStore();
  newsStore.updateNewsUrl(list.value[index - 1].url);
  newsStore.updateForm(list.value[index - 1], NewsType.MILITARY);
  router.push("/newDetail");
}

const { currentPage, total, getList } = useGetList(
  list,
  getMilitaryNewsListTotal,
  getNewList
);

const filterChange = async (filterList: FilterNews) => {
  if (isEmpty(filterList)) {
    getList(currentPage.value);
  } else {
    const res: News[][] = [];
    if (filterList.title.value !== "") {
      const { data } = await getMilitaryNewsByTitle(
        filterList.title.value as string
      );
      res.push(toArray<News>(data));
    }
    if (filterList.time.value !== "") {
      const { data } = await getMilitaryNewsByTime(
        filterList.time.value as string
      );
      res.push(toArray<News>(data));
    }
    if (filterList.details.value !== "") {
      const { data } = await getMilitaryNewsByDetails(
        filterList.details.value as string
      );
      res.push(toArray<News>(data));
    }
    list.value = multipleFilterByKey<News>("title", res);
  }
};
const { del, cancelDel, confirmDel, selectDel } = useDelete(
  list,
  deleteMilitaryNews,
  "url"
);
const { insertOb, isOpen, insert, cancelInsert, confirmInsert } =
  useInsert<News>(list, insertMilitaryNews);
</script>
