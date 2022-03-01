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
      :src="item.images"
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
            v-model="insertOb['images']"
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
import { multipleFilterByKey, toArray, isEmpty } from "@/utils/filter";
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

const filterList = ref<FilterInfo>({
  name: { value: "", alias: "姓名" },
  id: { value: "", alias: "身份证" },
});

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

const filterChange = async (filterList: FilterInfo) => {
  if (isEmpty(filterList)) {
    getList(currentPage.value);
  } else {
    const res: People[][] = [];
    if (filterList.name.value !== "") {
      const { data } = await getPeopleByName(filterList.name.value as string);
      res.push(toArray<People>(data));
    }
    if (filterList.id.value !== "") {
      const { data } = await getPeopleById(filterList.id.value as string);
      res.push(toArray<People>(data));
    }
    list.value = multipleFilterByKey<People>("name", res);
  }
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
