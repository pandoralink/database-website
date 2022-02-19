<template>
  <content-header
    :show-text-list="filterList"
    @option-delete="deleteFilterOption"
    :show-del="false"
    :show-ins="false"
    :show-update="true"
    @update="update"
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
          v-if="activeFilterOption === 0 && filterOptions.length !== 0"
        ></el-input>
        <el-input
          v-model="filterList.time"
          placeholder="时间"
          v-if="activeFilterOption === 1"
        ></el-input>
        <el-input
          v-model="filterList.details"
          placeholder="内容"
          v-if="activeFilterOption === 2"
        ></el-input>
      </div>
    </template>
  </content-header>
  <div class="base-content new">
    <iframe :src="newsUrl" frameborder="0" height="100%" width="100%"></iframe>
  </div>
  <news-dialog
    v-model="isOpen"
    @close="cancelUpdate"
    @confirm="confirmUpdate"
  ></news-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { News, Result } from "../model/model";
import { FilterNews } from "../model/filter";
import { useNewsStore } from "@/store/new";
import ContentHeader from "@/components/ContentHeader.vue";
import { updateMilitaryNews, updatePoliticalNews } from "@/api/news";
import { NewsType } from "@/types";
import { ElMessage } from "element-plus";
import NewsDialog from "@/components/NewsDialog.vue";

const filterOptions: string[] = ["姓名", "时间"];
const filterList = ref<FilterNews>({
  title: "",
  time: "",
  details: "",
});
let activeFilterOption = ref(0);

function deleteFilterOption(key: string) {
  if (key === "title") {
    filterList.value.title = "";
  } else if (key === "time") {
    filterList.value.time = "";
  } else {
    filterList.value.details = "";
  }
}

const newsStore = useNewsStore();
const newsUrl = newsStore.url;
const type = newsStore.updateType;

// 更新
// let updateOb = ref<News>({} as News);
const isOpen = ref(false);
const update = () => (isOpen.value = true);
const cancelUpdate = () => (isOpen.value = false);
const confirmUpdate = async (news: News) => {
  cancelUpdate();
  let response = { data: {} as Result };
  if (type === NewsType.MILITARY) response = await updateMilitaryNews(news);
  else response = await updatePoliticalNews(news);
  const res = response.data;
  if (res.code === 0) {
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};
</script>
