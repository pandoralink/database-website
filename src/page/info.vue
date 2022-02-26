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
import { People } from "@/model/model";
import { FilterInfo } from "@/model/filter";
import { useRouter } from "vue-router";
import {
  getPeopleList,
  getPeopleById,
  getPeopleByName,
  insertPeople,
  deletePeople,
} from "@/api/people";
import { usePeopleStore } from "@/store/people";
import { initIsDel } from "@/utils/init";
import BaseDialog from "../components/BaseDialog.vue";
import empty from "./empty.vue";
import ContentHeader from "@/components/ContentHeader.vue";
import { multipleFilterByKey, toArray } from "@/utils/filter";
import { useInsert } from "@/mixins/insert";
import { useDelete } from "@/mixins/delete";

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

const filterChange = async () => {
  let res: People[][] = [];
  if (filterList.value.name !== "") {
    const { data } = await getPeopleByName(filterList.value.name);
    res.push(toArray<People>(data));
  }
  if (filterList.value.id !== "") {
    const { data } = await getPeopleById(filterList.value.id);
    res.push(toArray<People>(data));
  }
  list.value = multipleFilterByKey<People>("name", res);
};

const { del, selectDel, confirmDel, cancelDel } = useDelete(
  list,
  deletePeople,
  "number"
);
const { insertOb, isOpen, cancelInsert, confirmInsert, insert } = useInsert(
  list,
  insertPeople
);
</script>
