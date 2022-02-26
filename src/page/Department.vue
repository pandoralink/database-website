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
          v-model="filterList.position"
          placeholder="职位"
          v-if="activeFilterOption === 0"
          @change="filterChange"
        ></el-input>
        <el-input
          v-model="filterList.number"
          placeholder="编号"
          v-if="activeFilterOption === 1"
          @change="filterChange"
        ></el-input>
        <el-input
          v-model="filterList.name"
          placeholder="名称"
          v-if="activeFilterOption === 2"
          @change="filterChange"
        ></el-input>
        <el-input
          v-model="filterList.address"
          placeholder="地点"
          v-if="activeFilterOption === 3"
          @change="filterChange"
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
      @click-item="selectDel($event, item.isDel)"
      @click-content="toDetail"
    >
      <template #default>
        <!-- 存在 <span> 吞空格的情况 -->
        <span>部门编号: {{ item.number }}</span
        ><br />
        <span>部门类型: {{ item.type }}</span
        ><br />
        <span>部门名称: {{ item.name }}</span
        ><br />
        <span>部门地点: {{ item.location }}</span
        ><br />
        <span>部门职位: {{ item.position }}</span
        ><br />
        <span>联系方式: {{ item.contactInformation }}</span
        ><br />
      </template>
    </base-list-item>
    <!-- TODO: 修改为单文件组件风格 -->
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
  <!-- TODO: 必选项校验 -->
  <base-dialog v-model="isOpen" @close="cancelInsert" @confirm="confirmInsert">
    <template #content>
      <el-form ref="form" :model="insertOb" label-width="80px">
        <el-form-item label="部门编号">
          <el-input
            v-model="insertOb['number']"
            placeholder="部门编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门类型">
          <el-input
            v-model="insertOb['type']"
            placeholder="部门类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input
            v-model="insertOb['name']"
            placeholder="部门名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门地点">
          <el-input
            v-model="insertOb['location']"
            placeholder="部门地点"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门职位">
          <el-input
            v-model="insertOb['position']"
            placeholder="部门职位"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            v-model="insertOb['contactInformation']"
            placeholder="联系方式"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseListItem from "../components/BaseListItem.vue";
import { Department } from "../model/model";
import { FilterDepartment } from "../model/filter";
import { useRouter } from "vue-router";
import {
  deleteDepartment,
  getDepartmentByLocation,
  getDepartmentByName,
  getDepartmentByNumber,
  getDepartmentByPosition,
  getDepartmentList,
  insertDepartment,
} from "@/api/department";
import { multipleFilter } from "@/utils/filter";
import { ElMessage } from "element-plus";
import ContentHeader from "@/components/ContentHeader.vue";
import BaseDialog from "../components/BaseDialog.vue";
import empty from "./empty.vue";
import { useDepartmentStore } from "@/store/department";
import { Result } from "@/@types/http";
import { useInsert } from "@/mixins/insert";
import { deletePeople, insertPeople } from "@/api/people";
import { useDelete } from "@/mixins/delete";

let list = ref<Department[]>([]);

const filterOptions: string[] = ["职位", "编号", "名称", "地点"];
const filterList = ref<FilterDepartment>({
  number: "",
  name: "",
  address: "",
  position: "",
});
let activeFilterOption = ref(0);
const router = useRouter();

function deleteFilterOption(key: string) {
  // 不知道为什么无法使用 [index] 的方式访问 ref 对象属性
  if (key === "name") {
    filterList.value.name = "";
  } else if (key === "position") {
    filterList.value.position = "";
  } else if (key === "address") {
    filterList.value.address = "";
  } else if (key === "number") {
    filterList.value.number = "";
  }
  filterChange();
  if (
    !filterList.value.name &&
    !filterList.value.number &&
    !filterList.value.address &&
    !filterList.value.position
  ) {
    getList(currentPage.value);
  }
}

function toDetail(index: number) {
  const departmentStore = useDepartmentStore();
  departmentStore.updateDepartment(list.value[index - 1]);
  router.push("/departDetail");
}

const currentPage = ref(1);
const getList = async (num = 1) => {
  const { data } = await getDepartmentList(num);
  list.value = data;
};
getList();

watch(currentPage, (newCurrentPage, oldCurrentPage) => {
  getList(newCurrentPage);
});

const filterChange = async () => {
  let numberFilterList: Department[] = [];
  let nameFilterList: Department[] = [];
  let addressFilterList: Department[] = [];
  let positionFilterList: Department[] = [];
  // TODO: 定义工具类去简化代码
  if (filterList.value.number !== "") {
    const { data } = await getDepartmentByNumber(filterList.value.number);
    if (data instanceof Array) {
      numberFilterList.push(...data);
    } else numberFilterList.push(data);
  }
  if (filterList.value.name !== "") {
    const { data } = await getDepartmentByName(filterList.value.name);
    if (data instanceof Array) {
      nameFilterList.push(...data);
    } else nameFilterList.push(data);
  }
  if (filterList.value.address !== "") {
    const { data } = await getDepartmentByLocation(filterList.value.address);
    if (data instanceof Array) {
      addressFilterList.push(...data);
    } else addressFilterList.push(data);
  }
  if (filterList.value.position !== "") {
    const { data } = await getDepartmentByPosition(filterList.value.position);
    if (data instanceof Array) {
      positionFilterList.push(...data);
    } else positionFilterList.push(data);
  }
  list.value = multipleFilter(
    "number",
    numberFilterList,
    nameFilterList,
    addressFilterList,
    positionFilterList
  );
};

const { del, selectDel, confirmDel, cancelDel } = useDelete(
  list,
  deleteDepartment,
  "number"
);
const { insertOb, isOpen, cancelInsert, confirmInsert, insert } = useInsert(
  list,
  insertDepartment
);
</script>
