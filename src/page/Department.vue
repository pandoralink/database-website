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
  </base-filter>
  <div class="base-content">
    <base-list-item
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.image"
      @click-content="toInfoDetail"
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
  </div>
  <div id="base-pagination">
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseFilter from "../components/BaseFilter.vue";
import BaseListItem from "../components/BaseListItem.vue";
import { Department } from "../model/model";
import { FilterDepartment } from "../model/filter";
import { useRouter } from "vue-router";
import {
  getDepartmentByLocation,
  getDepartmentByName,
  getDepartmentByNumber,
  getDepartmentByPosition,
  getDepartmentList,
} from "@/api/department";
import { multipleFilter } from "@/utils/filter";

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
function toInfoDetail(index: number) {
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
    "title",
    numberFilterList,
    nameFilterList,
    addressFilterList,
    positionFilterList
  );
};
</script>
