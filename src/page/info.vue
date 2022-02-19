<template>
  <content-header
    :show-text-list="filterList"
    @option-delete="deleteFilterOption"
    @insert="insert"
    @cancel-del="cancelDel"
    @confirm-del="confirmDel"
    @on-is-delete="del"
    :show-update="showUpdate"
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
        <el-input
          v-model="filterList.name"
          placeholder="姓名"
          v-if="activeFilterOption === 0"
          @change="filterChange"
        ></el-input>
        <el-input
          v-model="filterList.id"
          placeholder="身份证"
          v-if="activeFilterOption === 1"
          @change="filterChange"
        ></el-input>
      </div>
    </template>
  </content-header>
  <slot name="header-tag"></slot>
  <div class="base-content">
    <base-list-item
      :class="{ delete: item.isDel }"
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.image"
      @click-item="selectDel($event, item.isDel)"
      @click-content="toInfoDetail"
    >
      <template #default>
        <span>姓名: {{ item.name }}</span
        ><br />
        <span>年龄: {{ item.age }}</span
        ><br />
        <span>国籍: {{ item.nationality }}</span
        ><br />
        <span>身份证号: {{ item.number }}</span
        ><br />
        <span>党派: {{ item.parties }}</span
        ><br />
        <span>学历: {{ item.education }}</span
        ><br />
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
        <el-form-item label="姓名">
          <el-input v-model="insertOb['name']" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="insertOb['age']" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="国籍">
          <el-input
            v-model="insertOb['nationality']"
            placeholder="国籍"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="insertOb['number']"
            placeholder="身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item label="党派">
          <el-input v-model="insertOb['parties']" placeholder="党派"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input
            v-model="insertOb['education']"
            placeholder="学历"
          ></el-input>
        </el-form-item>
        <el-form-item label="照片">
          <el-input
            v-model="insertOb['image']"
            placeholder="照片链接"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseListItem from "../components/BaseListItem.vue";
import { People, Result } from "../model/model";
import { FilterInfo } from "../model/filter";
import { useRouter } from "vue-router";
import {
  getPeopleList,
  getPeopleById,
  getPeopleByName,
  insertPeople,
  deletePeople,
} from "@/api/people";
import { usePeopleStore } from "@/store/people";
import { initIsDel } from "../utils/init";
import BaseDialog from "../components/BaseDialog.vue";
import { ElMessage } from "element-plus";
import empty from "./empty.vue";
import ContentHeader from "@/components/ContentHeader.vue";

// info 作为 DepartDetail 子组件时需暴露 update, 给父组件更新部门信息
interface Props {
  showUpdate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showUpdate: false,
});

const emits = defineEmits<{
  (e: "update"): void;
}>();

const update = () => {
  emits("update");
};

const router = useRouter();

let list = ref<People[]>([]);

const filterOptions: string[] = ["姓名", "身份证"];
const filterList = ref<FilterInfo>({
  name: "",
  id: "",
});
let activeFilterOption = ref(0);

function deleteFilterOption(key: string) {
  if (key === "name") {
    filterList.value.name = "";
    filterChange();
  } else if (key === "id") {
    filterList.value.id = "";
    filterChange();
  }
  if (!filterList.value.name && !filterList.value.id) {
    getList(currentPage.value);
  }
}

function toInfoDetail(index: number) {
  const peopleStore = usePeopleStore();
  peopleStore.updatePeople(list.value[index - 1]);
  router.push("/infoDetail");
}

const currentPage = ref(1);
const getList = async (num = 1) => {
  const { data } = await getPeopleList(num);
  initIsDel(data);
  list.value = data;
};
getList();

watch(currentPage, (newCurrentPage, oldCurrentPage) => {
  getList(newCurrentPage);
});

// filter
const filterChange = async () => {
  let nameFilterList: People[] = [];
  let idFilterList: People[] = [];
  let res: People[] = [];
  const set = new Set();
  if (filterList.value.name !== "") {
    const { data } = await getPeopleByName(filterList.value.name);
    if (data instanceof Array) {
      nameFilterList.push(...data);
    } else nameFilterList.push(data);
  }
  if (filterList.value.id !== "") {
    const { data } = await getPeopleById(filterList.value.id);
    // 后端 data 可能不为 array 而是 object, 因此全部采用 push
    if (data instanceof Array) {
      idFilterList.push(...data);
    } else idFilterList.push(data);
  }
  const allFilterlist = [nameFilterList, idFilterList];
  for (let i = 0; i < allFilterlist.length; i++) {
    if (allFilterlist[i].length > 0 && res.length > 0) {
      res = intersect(allFilterlist[i], res);
    } else if (allFilterlist[i].length > 0 && res.length === 0) {
      allFilterlist[i].forEach((item) => set.add(item.name));
      res.push(...allFilterlist[i]);
    }
  }
  list.value = res;
};
const intersect = (arr1: People[], arr2: People[]): People[] => {
  const set = new Set();
  const res: People[] = [];
  arr1.forEach((item) => set.add(item.name));
  arr2.forEach((item) => {
    if (set.has(item.name)) {
      res.push(item);
    }
  });
  return res;
};

// 操作
// 删除
/**
 * isDelete 是列表项删除状态，父组件依赖其维护是否具有选中状态
 * 值需要和子组件保持一致
 */
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
      const { data } = await deletePeople(item.number);
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
let insertOb = ref<People>({} as People);
const isOpen = ref(false);
const insert = () => (isOpen.value = true);
const cancelInsert = () => (isOpen.value = false);
const confirmInsert = async () => {
  cancelInsert();
  const { data } = await insertPeople(insertOb.value);
  const res = data as Result;
  if (res.code === 0) {
    list.value.unshift(insertOb.value);
    // 展示页面需为 10
    list.value.pop();
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
  insertOb.value = {} as People;
};
</script>
