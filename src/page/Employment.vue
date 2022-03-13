<template>
  <content-header
    :show-text-list="filterList"
    default-filter-option="positionNumber"
    @change="filterChange"
    @insert="insertOnEmployment"
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
      :show-img="false"
      @click-item="selectDel($event, item.isDel)"
      @click-content="toInfoDetail"
    >
      <template #default>
        <span>姓名: {{ item.name }}</span
        ><br />
        <span>身份证: {{ item.number }}</span
        ><br />
        <span>职位: {{ item.employName }}</span
        ><br />
        <span>部门编号: {{ item.dpNUmber }}</span
        ><br />
        <span>职位编号: {{ item.positionNumber }}</span
        ><br />
        <span>在职地点: {{ item.employPlace }}</span
        ><br />
      </template>
    </base-list-item>
    <empty v-if="list.length === 0" desc="没有数据了"></empty>
  </div>
  <base-dialog v-model="isOpen" @close="cancelInsert" @confirm="confirmInsert">
    <template #content>
      <el-form ref="form" :model="insertOb" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="insertOb.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="insertOb.number" placeholder="身份证"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="insertOb.employName" placeholder="职位"></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input
            v-model="insertOb.dpNUmber"
            placeholder="部门编号"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="职位编号">
          <el-input
            v-model="insertOb.positionNumber"
            placeholder="职位编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="在职地点">
          <el-input
            v-model="insertOb.employPlace"
            placeholder="在职地点"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import BaseListItem from "../components/BaseListItem.vue";
import { Employment } from "@/model/model";
import { FilterEmployment } from "@/model/filter";
import { useRouter } from "vue-router";
import { getPeopleById } from "@/api/people";
import { usePeopleStore } from "@/store/people";
import BaseDialog from "../components/BaseDialog.vue";
import ContentHeader from "@/components/ContentHeader.vue";
import { isEmpty, multipleFilterByKey, toArray } from "@/utils/filter";
import { useInsert } from "@/mixins/insert";
import { useDelete } from "@/mixins/delete";
import {
  deleteEmployment,
  insertEmployment,
  searchEmploymentByDpNUmber,
  searchEmploymentByEmployPlace,
  searchEmploymentByName,
  searchEmploymentByNumber,
  searchEmploymentByPositionNumber,
} from "@/api/employment";
import { ElMessage } from "element-plus";
import { useDepartmentStore } from "@/store/department";

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

let list = ref<Employment[]>([]);

const filterList = ref<FilterEmployment>({
  positionNumber: { value: "", alias: "职位编号" },
  dpNUmber: { value: "", alias: "部门编号" },
  name: { value: "", alias: "姓名" },
  employPlace: { value: "", alias: "在职地点" },
});

async function toInfoDetail(index: number) {
  const peopleStore = usePeopleStore();
  const { data } = await getPeopleById(list.value[index - 1].number);
  if (data) {
    peopleStore.updatePeople(data);
    router.push("/infoDetail");
  } else {
    ElMessage.info("无此人信息");
  }
}

const departmentStore = useDepartmentStore();
const department = departmentStore.department;

const getList = async () => {
  const { data } = await searchEmploymentByDpNUmber(department.number);
  list.value.push(...toArray(data));
};

onMounted(() => {
  getList();
});

const filterChange = async (filterList: FilterEmployment) => {
  if (isEmpty(filterList)) {
    getList();
  } else {
    const res: Employment[][] = [];
    if (filterList.name.value !== "") {
      const { data } = await searchEmploymentByName(
        filterList.name.value as string
      );
      res.push(toArray(data));
    }
    if (filterList.number.value !== "") {
      const { data } = await searchEmploymentByNumber(
        filterList.number.value as string
      );
      res.push(toArray(data));
    }
    if (filterList.employPlace.value !== "") {
      const { data } = await searchEmploymentByEmployPlace(
        filterList.employPlace.value as string
      );
      res.push(toArray(data));
    }
    if (filterList.dpNUmber.value !== "") {
      const { data } = await searchEmploymentByDpNUmber(
        filterList.dpNUmber.value as string
      );
      res.push(toArray(data));
    }
    if (filterList.positionNumber.value !== "") {
      const { data } = await searchEmploymentByPositionNumber(
        filterList.positionNumber.value as string
      );
      res.push(toArray(data));
    }
    list.value = multipleFilterByKey("number", res);
  }
};

const { del, selectDel, confirmDel, cancelDel } = useDelete(
  list,
  deleteEmployment,
  "number"
);
const { insertOb, isOpen, cancelInsert, confirmInsert, insert, setInsertOb } =
  useInsert(list, insertEmployment);
const insertOnEmployment = () => {
  setInsertOb({
    name: "",
    number: "",
    employPlace: department.location,
    employName: "",
    positionNumber: "",
    dpNUmber: department.number,
  });
  insert();
};
</script>
