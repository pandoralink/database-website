<template>
  <content-header
    :show-filter="false"
    :show-del="false"
    @insert="insert"
  ></content-header>
  <div class="base-content">
    <el-table :data="list" style="width: 100%" :border="true">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="fname" label="父母名称"></el-table-column>
      <el-table-column prop="fnumber" label="父母身份证"></el-table-column>
      <el-table-column prop="cname" label="子女名称"></el-table-column>
      <el-table-column prop="cnumber" label="子女身份证"></el-table-column>
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
  updateBugState,
} from "@/api/bug";
import ContentHeader from "@/components/ContentHeader.vue";
import BugDialog from "@/components/dialog/BugDialog.vue";
import { FilterBug } from "@/model/filter";
import { Bug, Paternity, People, PeopleDetail } from "@/model/model";
import { FormMethod } from "@/types";
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import { Result } from "@/@types/http";
import { isEmpty, toArray } from "@/utils/filter";
import { useGetList } from "@/mixins/useGetList";
import { usePeopleStore } from "@/store/people";
import { useSpouseStore } from "@/store/spouse";

const list = ref<Paternity[]>([]);

const spouseStore = useSpouseStore();
list.value = spouseStore.spouse;
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
