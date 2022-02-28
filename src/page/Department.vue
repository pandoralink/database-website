<template>
  <content-header
    :show-text-list="filterList"
    default-filter-option="position"
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
import { Department } from "@/model/model";
import { FilterDepartment } from "@/model/filter";
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
import { isEmpty, multipleFilterByKey, toArray } from "@/utils/filter";
import ContentHeader from "@/components/ContentHeader.vue";
import BaseDialog from "../components/BaseDialog.vue";
import empty from "./empty.vue";
import { useDepartmentStore } from "@/store/department";
import { useInsert } from "@/mixins/insert";
import { useDelete } from "@/mixins/delete";

let list = ref<Department[]>([]);

const filterList = ref<FilterDepartment>({
  number: { value: "", alias: "编号" },
  name: { value: "", alias: "名称" },
  address: { value: "", alias: "地点" },
  position: { value: "", alias: "职位" },
});
const router = useRouter();

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

const filterChange = async (filterList: FilterDepartment) => {
  if (isEmpty(filterList)) {
    getList(currentPage.value);
  } else {
    const res: Department[][] = [];
    if (filterList.number.value !== "") {
      const { data } = await getDepartmentByNumber(
        filterList.number.value as string
      );
      res.push(toArray<Department>(data));
    }
    if (filterList.name.value !== "") {
      const { data } = await getDepartmentByName(
        filterList.name.value as string
      );
      res.push(toArray<Department>(data));
    }
    if (filterList.address.value !== "") {
      const { data } = await getDepartmentByLocation(
        filterList.address.value as string
      );
      res.push(toArray<Department>(data));
    }
    if (filterList.position.value !== "") {
      const { data } = await getDepartmentByPosition(
        filterList.position.value as string
      );
      res.push(toArray<Department>(data));
    }
    list.value = multipleFilterByKey("number", res);
  }
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
