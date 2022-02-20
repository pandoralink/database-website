<template>
  <content-header
    :show-text-list="filterList"
    :show-del="false"
    @option-delete="deleteFilterOption"
    @insert="insert"
    @on-is-delete="del"
  >
    <template #default>
      <div class="filter-content">
        <el-button
          class="filter-content-button"
          v-for="(item, index) in filterOptions"
          :key="item"
          :class="{ active: activeFilterOption === index }"
        >
          {{ item }}
        </el-button>
      </div>
      <div class="filter-content" style="margin-top: 10px">
        <el-input
          v-model="filterList.author"
          placeholder="罗通..."
          @change="filterChange"
        ></el-input>
      </div>
    </template>
  </content-header>
  <div class="base-content">
    <el-table :data="list" style="width: 100%" :border="true">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="url" label="爬虫链接" width="340">
      </el-table-column>
      <el-table-column prop="remarks" label="功能备注"></el-table-column>
      <el-table-column prop="rule" label="规则"></el-table-column>
      <el-table-column prop="auther" label="作者"></el-table-column>
      <el-table-column prop="switchs" label="状态" width="100" #default="scope">
        <el-tooltip
          class="box-item"
          effect="light"
          :content="!list[scope.$index].switchs ? '是否运行？' : '是否暂停'"
        >
          <el-button
            @click="changeBugState(scope.$index)"
            :type="!list[scope.$index].switchs ? 'info' : 'success'"
            round
            >{{ !list[scope.$index].switchs ? "暂停" : "运行" }}</el-button
          >
        </el-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template #default>
          <el-button type="primary" round>更新</el-button>
          <el-button type="danger" round>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  <bug-dialog
    v-model="isOpen"
    :form-value="formValue"
    :method-type="methodType"
    @close="close"
    @confirm="close"
  ></bug-dialog>
</template>

<script lang="ts" setup>
import { getBugList, searchBugByAuthor } from "@/api/bug";
import ContentHeader from "@/components/ContentHeader.vue";
import BugDialog from "@/components/dialog/BugDialog.vue";
import { FilterBug } from "@/model/filter";
import { Bug } from "@/model/model";
import { ref, watch } from "vue";

const list = ref<Bug[]>([]);

const filterOptions: string[] = ["作者名称"];
const filterList = ref<FilterBug>({
  author: "",
});
let activeFilterOption = ref(0);

function deleteFilterOption(key: string) {
  if (key === "author") {
    filterList.value.author = "";
  }
  filterChange();
  if (!filterList.value.author) {
    getList(currentPage.value);
  }
}

const currentPage = ref(1);
const getList = async (num = 1) => {
  const { data } = await getBugList(num);
  list.value = data;
};
getList();

watch(currentPage, (newCurrentPage, oldCurrentPage) => {
  getList(newCurrentPage);
});

const filterChange = async () => {
  let bugFilterList: Bug[] = [];
  if (filterList.value.author !== "") {
    const { data } = await searchBugByAuthor(filterList.value.author);
    if (data instanceof Array) {
      bugFilterList.push(...data);
    } else bugFilterList.push(data);
  }
  list.value = bugFilterList;
};

const changeBugState = (index: number) => {
  const state = list.value[index].switchs;
  list.value[index].switchs = !state ? 1 : 0;
};

let formValue = {} as Bug;
let methodType = "insert";

const isOpen = ref(false);
const insert = () => {
  isOpen.value = true;

  formValue = {} as Bug;
  methodType = "insert";
};
const update = (index: number) => {
  formValue = list.value[index];
  methodType = "update";
};
const close = () => {
  isOpen.value = false;
}

let isDelete = ref(false);
const del = (value: boolean) => {
  isDelete.value = value;
};
// const cancelDel = () => {
//   const arr = list.value;
//   for (let i = 0; i < arr.length; i++) {
//     arr[i].isDel = false;
//   }
// };
// const confirmDel = async () => {
//   list.value.forEach(async (item) => {
//     if (item.isDel) {
//       const { data } = await deleteMilitaryNews(item.url);
//       const res = data as Result;
//       if (res.code !== 0) {
//         item.isDel = false;
//         ElMessage.error("操作失败，请重试");
//       }
//     }
//   });
//   list.value = list.value.filter((item) => !item.isDel);
// };
// const selectDel = (index: number, isDel = false) => {
//   if (isDelete.value) {
//     // <base-list-item> emit 的 index 以 1 为起点
//     list.value[index - 1].isDel = !isDel;
//   }
// };
// // 插入
// let insertOb = ref<News>({} as News);

// const insert = () => (isOpen.value = true);
// const cancelInsert = () => (isOpen.value = false);
// const confirmInsert = async () => {
//   cancelInsert();
//   const { data } = await insertMilitaryNews(insertOb.value);
//   const res = data as Result;
//   if (res.code === 0) {
//     list.value.unshift(insertOb.value);
//     // 展示页面需为 10
//     list.value.pop();
//     ElMessage.success(res.msg);
//   } else ElMessage.error("操作失败，请重试");
//   insertOb.value = {} as News;
// };

// const update = () => {

// }
</script>
