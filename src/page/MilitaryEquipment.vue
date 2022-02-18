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
      <div class="filter-content" style="margin-top: 10px"></div>
    </template>
  </content-header>
  <slot name="header-tag"> </slot>
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
        <span>名称: {{ item.name }}</span
        ><br />
        <span>编号: {{ item.number }}</span
        ><br />
        <span>功能: {{ item.function }}</span
        ><br />
        <span>部署地点: {{ item.location }}</span
        ><br />
        <span>所属部门编号: {{ item.dpNumber }}</span
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
        <el-form-item label="名称">
          <el-input v-model="insertOb['name']" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="insertOb['number']" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label="功能">
          <el-input
            v-model="insertOb['function']"
            placeholder="功能"
          ></el-input>
        </el-form-item>
        <el-form-item label="部署地点">
          <el-input
            v-model="insertOb['location']"
            placeholder="部署地点"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门编号">
          <el-input
            v-model="insertOb['dpNumber']"
            placeholder="所属部门编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细信息">
          <el-input
            v-model="insertOb['details']"
            placeholder="详细信息"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import {
  deleteMilitaryEquipment,
  getMilitaryEquipmentList,
  insertMilitaryEquipment,
} from "@/api/militaryEquipment";
import { useMilitaryEquipmentStore } from "@/store/militaryEquipment";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import BaseListItem from "../components/BaseListItem.vue";
import { MilitaryEquipment, Result } from "../model/model";
import BaseDialog from "../components/BaseDialog.vue";
import { ElMessage } from "element-plus";
import empty from "./empty.vue";
import ContentHeader from "@/components/ContentHeader.vue";

let list = ref<MilitaryEquipment[]>([]);

const filterOptions: string[] = [
  "设备编号",
  "所属部门编号",
  "设备名称",
  "地点",
];
const filterList = ref({});
let activeFilterOption = ref(0);
const router = useRouter();

function deleteFilterOption(key: string) {
  console.log(key);
}
function toInfoDetail(index: number) {
  const militaryEquipmentStore = useMilitaryEquipmentStore();
  militaryEquipmentStore.updateMilitaryEquipment(list.value[index - 1]);
  router.push("/equipmentDetail");
}

const currentPage = ref(1);
const getList = async (num = 1) => {
  const { data } = await getMilitaryEquipmentList(num);
  list.value = data;
};
getList();

watch(currentPage, (newCurrentPage, oldCurrentPage) => {
  getList(newCurrentPage);
});

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
      const { data } = await deleteMilitaryEquipment(item.number);
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
let insertOb = ref<MilitaryEquipment>({} as MilitaryEquipment);
const isOpen = ref(false);
const insert = () => (isOpen.value = true);
const cancelInsert = () => (isOpen.value = false);
const confirmInsert = async () => {
  cancelInsert();
  const { data } = await insertMilitaryEquipment(insertOb.value);
  const res = data as Result;
  if (res.code === 0) {
    list.value.unshift(insertOb.value);
    // 展示页面需为 10
    list.value.pop();
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
  insertOb.value = {} as MilitaryEquipment;
};
</script>
