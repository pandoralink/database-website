<template>
  <content-header
    :show-text-list="filterList"
    @option-delete="deleteFilterOption"
    :show-del="false"
    :show-ins="false"
    :show-update="true"
    @update="update"
  >
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
  </content-header>
  <div class="base-content new">
    <!-- 左边距统一为 20px -->
    <base-list-item
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.image"
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
    <el-tag effect="dark" size="large" style="margin-left: 20px">
      设备详情
    </el-tag>
    <p class="equipment-detail">
      {{ militaryEquipment.details }}
    </p>
  </div>
  <base-dialog v-model="isOpen" @close="cancelUpdate" @confirm="confirmUpdate">
    <template #content>
      <el-form ref="form" :model="updateOb" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="updateOb['name']" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="updateOb['number']" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label="功能">
          <el-input
            v-model="updateOb['function']"
            placeholder="功能"
          ></el-input>
        </el-form-item>
        <el-form-item label="部署地点">
          <el-input
            v-model="updateOb['location']"
            placeholder="部署地点"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门编号">
          <el-input
            v-model="updateOb['dpNumber']"
            placeholder="所属部门编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细信息">
          <el-input
            v-model="updateOb['details']"
            placeholder="详细信息"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseFilter from "../components/BaseFilter.vue";
import { MilitaryEquipment, News, Result } from "../model/model";
import { FilterEquipment, FilterNews } from "../model/filter";
import BaseListItem from "../components/BaseListItem.vue";
import { useRouter } from "vue-router";
import { useMilitaryEquipmentStore } from "@/store/militaryEquipment";
import { updateMilitaryEquipment } from "@/api/militaryEquipment";
import { ElMessage } from "element-plus";
import ContentHeader from "@/components/ContentHeader.vue";
import BaseDialog from "@/components/BaseDialog.vue";

const list: MilitaryEquipment[] = [];

const filterOptions: string[] = [
  "设备编号",
  "所属部门编号",
  "设备名称",
  "地点",
];
const filterList = ref<FilterEquipment>({
  name: "",
  DpNumber: "",
  location: "",
  number: "",
} as FilterEquipment);
let activeFilterOption = ref(0);

function deleteFilterOption(key: string) {
  if (key === "name") {
    filterList.value.name = "";
  } else if (key === "DpNumber") {
    filterList.value.DpNumber = "";
  } else if (key === "location") {
    filterList.value.location = "";
  } else {
    filterList.value.number = "";
  }
}

const militaryEquipmentStore = useMilitaryEquipmentStore();
const militaryEquipment = militaryEquipmentStore.militaryEquipment;
list.push(militaryEquipment);

let updateOb = militaryEquipment;
const isOpen = ref(false);
const update = () => (isOpen.value = true);
const cancelUpdate = () => (isOpen.value = false);
const confirmUpdate = async () => {
  cancelUpdate();
  const { data } = await updateMilitaryEquipment(updateOb);
  const res = data as Result;
  if (res.code === 0) {
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};
</script>
