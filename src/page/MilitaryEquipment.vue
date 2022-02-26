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
          v-model="filterList.number"
          placeholder="设备编号"
          v-if="activeFilterOption === 0"
          @change="filterChange"
        ></el-input>
        <el-input
          v-model="filterList.DpNumber"
          placeholder="所属部门编号"
          v-if="activeFilterOption === 1"
          @change="filterChange"
        ></el-input>
        <el-input
          v-model="filterList.name"
          placeholder="设备名称"
          v-if="activeFilterOption === 2"
          @change="filterChange"
        ></el-input>
        <el-input
          v-model="filterList.location"
          placeholder="地点"
          v-if="activeFilterOption === 3"
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
  selectMilitaryEquipmentByDpNumber,
  selectMilitaryEquipmentByLocation,
  selectMilitaryEquipmentByName,
  selectMilitaryEquipmentByNumber,
} from "@/api/militaryEquipment";
import { useMilitaryEquipmentStore } from "@/store/militaryEquipment";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import BaseListItem from "../components/BaseListItem.vue";
import { MilitaryEquipment } from "@/model/model";
import BaseDialog from "../components/BaseDialog.vue";
import empty from "./empty.vue";
import ContentHeader from "@/components/ContentHeader.vue";
import { FilterEquipment } from "@/model/filter";
import { multipleFilter } from "@/utils/filter";
import { useInsert } from "@/mixins/insert";
import { useDelete } from "@/mixins/delete";

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

let list = ref<MilitaryEquipment[]>([]);

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
const router = useRouter();

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
  filterChange();
  if (
    !filterList.value.name &&
    !filterList.value.DpNumber &&
    !filterList.value.location &&
    !filterList.value.number
  ) {
    getList(currentPage.value);
  }
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

const filterChange = async () => {
  let numberFilterList: MilitaryEquipment[] = [];
  let dpNumberFilterList: MilitaryEquipment[] = [];
  let nameFilterList: MilitaryEquipment[] = [];
  let locationFilterList: MilitaryEquipment[] = [];
  // 应该定义工具类去简化代码
  if (filterList.value.number !== "") {
    const { data } = await selectMilitaryEquipmentByNumber(
      filterList.value.number
    );
    if (data instanceof Array) {
      numberFilterList.push(...data);
    } else numberFilterList.push(data);
  }
  if (filterList.value.DpNumber !== "") {
    const { data } = await selectMilitaryEquipmentByDpNumber(
      filterList.value.DpNumber
    );
    if (data instanceof Array) {
      dpNumberFilterList.push(...data);
    } else dpNumberFilterList.push(data);
  }
  if (filterList.value.name !== "") {
    const { data } = await selectMilitaryEquipmentByName(filterList.value.name);
    if (data instanceof Array) {
      nameFilterList.push(...data);
    } else nameFilterList.push(data);
  }
  if (filterList.value.location !== "") {
    const { data } = await selectMilitaryEquipmentByLocation(
      filterList.value.location
    );
    if (data instanceof Array) {
      locationFilterList.push(...data);
    } else locationFilterList.push(data);
  }
  list.value = multipleFilter(
    "number",
    numberFilterList,
    dpNumberFilterList,
    nameFilterList,
    locationFilterList
  );
};

const { del, cancelDel, confirmDel, selectDel } = useDelete(
  list,
  deleteMilitaryEquipment,
  "number"
);
const { insertOb, isOpen, insert, cancelInsert, confirmInsert } = useInsert(
  list,
  insertMilitaryEquipment
);
</script>
