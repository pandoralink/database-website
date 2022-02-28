<template>
  <content-header
    :show-text-list="filterList"
    default-filter-option="name"
    @change="filterChange"
    @insert="insert"
    @cancel-del="cancelDel"
    @confirm-del="confirmDel"
    @on-is-delete="del"
    :show-update="showUpdate"
    @update="update"
  >
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
import { MilitaryEquipment, People } from "@/model/model";
import BaseDialog from "../components/BaseDialog.vue";
import empty from "./empty.vue";
import ContentHeader from "@/components/ContentHeader.vue";
import { FilterEquipment } from "@/model/filter";
import {
  isEmpty,
  multipleFilter,
  multipleFilterByKey,
  toArray,
} from "@/utils/filter";
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

const filterList = ref<FilterEquipment>({
  name: { value: "", alias: "设备编号" },
  DpNumber: { value: "", alias: "所属部门编号" },
  location: { value: "", alias: "设备名称" },
  number: { value: "", alias: "地点" },
} as FilterEquipment);
const router = useRouter();

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

const filterChange = async (filterList: FilterEquipment) => {
  if (isEmpty(filterList)) {
    getList(currentPage.value);
  } else {
    const res: MilitaryEquipment[][] = [];
    // TODO: 应该定义工具类去简化代码
    if (filterList.number.value !== "") {
      const { data } = await selectMilitaryEquipmentByNumber(
        filterList.number.value as string
      );
      res.push(toArray<MilitaryEquipment>(data));
    }
    if (filterList.DpNumber.value !== "") {
      const { data } = await selectMilitaryEquipmentByDpNumber(
        filterList.DpNumber.value as string
      );
      res.push(toArray<MilitaryEquipment>(data));
    }
    if (filterList.name.value !== "") {
      const { data } = await selectMilitaryEquipmentByName(
        filterList.name.value as string
      );
      res.push(toArray<MilitaryEquipment>(data));
    }
    if (filterList.location.value !== "") {
      const { data } = await selectMilitaryEquipmentByLocation(
        filterList.location.value as string
      );
      res.push(toArray<MilitaryEquipment>(data));
    }
    list.value = multipleFilterByKey("number", res);
  }
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
