<template>
  <content-header
    :show-text-list="filterList"
    default-filter-option="author"
    @change="filterChange"
    :show-del="false"
    @insert="insert"
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
        <!--FIXME: element 会警告，说没有有效子元素 --->
        <el-tooltip
          class="box-item"
          effect="light"
          :content="!list[scope.$index].switchs ? '是否运行？' : '是否暂停'"
        >
          <el-button
            @click="changeBugState(scope.$index)"
            :type="!list[scope.$index].switchs ? 'info' : 'success'"
            round
            >{{ !list[scope.$index].switchs ? "暂停" : "运行" }}
          </el-button>
        </el-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" round @click="update(scope.$index)"
            >更新
          </el-button>
          <el-button
            type="danger"
            round
            @click="del(list[scope.$index], scope.$index)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
  <bug-dialog
    v-model="isOpen"
    :form-value="formValue"
    :method-type="methodType"
    :index="updateDataIndex"
    @close="close"
    @confirm="changeFormValue"
  ></bug-dialog>
</template>

<script lang="ts" setup>
import {
  getBugList,
  searchBugByAuthor,
  insertBug,
  deleteBug,
  updateBug,
  getReptileListTotal,
} from "@/api/bug";
import ContentHeader from "@/components/ContentHeader.vue";
import BugDialog from "@/components/dialog/BugDialog.vue";
import { FilterBug } from "@/model/filter";
import { Bug } from "@/model/model";
import { FormMethod } from "@/types";
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import { Result } from "@/@types/http";
import { isEmpty, toArray } from "@/utils/filter";
import { useGetList } from "@/mixins/useGetList";

const list = ref<Bug[]>([]);

const filterList = ref<FilterBug>({
  author: { value: "", alias: "作者名称" },
});

const { currentPage, total, getList } = useGetList(
  list,
  getReptileListTotal,
  getBugList
);

const filterChange = async (filterList: FilterBug) => {
  if (isEmpty(filterList)) {
    getList(currentPage.value);
  } else {
    let res: Bug[] = [];
    if (filterList.author.value !== "") {
      const { data } = await searchBugByAuthor(
        filterList.author.value as string
      );
      res = toArray<Bug>(data as Bug | Bug[]);
    }
    list.value = res;
  }
};

const changeBugState = (index: number) => {
  const state = list.value[index].switchs;
  list.value[index].switchs = !state ? 1 : 0;
};

let formValue = ref<Bug>({} as Bug);
let methodType = ref<FormMethod>("insert");
const updateDataIndex = ref(0);

const isOpen = ref(false);
const insert = () => {
  isOpen.value = true;
  formValue.value = {} as Bug;
  methodType.value = "insert";
};
const insertData = async (value: Bug) => {
  const { data } = await insertBug(value);
  const res = data as Result;
  if (res.code === 0) {
    list.value.unshift(value);
    if (list.value.length === 10) list.value.pop();
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};

const update = (index: number) => {
  isOpen.value = true;
  formValue.value = list.value[index];
  methodType.value = "update";
  updateDataIndex.value = index;
};
const updateData = async (value: Bug, index: number) => {
  const { data } = await updateBug(value);
  const res = data as Result;
  if (res.code === 0) {
    list.value[index] = value;
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};

const del = async (value: Bug, index: number) => {
  const { data } = await deleteBug(value.url);
  const res = data as Result;
  if (res.code === 0) {
    list.value.splice(index, 1);
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};

const changeFormValue = (bug: Bug, type: FormMethod, index?: number) => {
  isOpen.value = false;
  if (type === "insert") insertData(bug);
  else updateData(bug, index as number);
};
const close = () => {
  isOpen.value = false;
};
</script>
