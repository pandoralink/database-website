<template>
  <content-header
    :show-filter="false"
    :show-del="false"
    @insert="insertOnHierarchy"
  ></content-header>
  <div class="base-content">
    <el-table :data="list" style="width: 100%" :border="true">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="Supername" label="上级名称"></el-table-column>
      <el-table-column
        prop="SuperIDnumber"
        label="上级身份证"
      ></el-table-column>
      <el-table-column prop="SubordName" label="下级名称"></el-table-column>
      <el-table-column
        prop="SubordIDnumber"
        label="下级身份证"
      ></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" round @click="update(scope.$index)"
            >更新
          </el-button>
          <el-button
            type="danger"
            round
            @click="del(list[scope.$index], scope.$index)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <hierarchy-dialog
    v-model="isOpen"
    :type="type"
    :form="insertOb"
    @close="cancelInsert"
    @confirm="confirmInsertOnHierarchy"
  />
  <hierarchy-dialog
    v-model="isUpdate"
    :type="type"
    :form="updateOb"
    @close="cancelUpdate"
    @confirm="confirmUpdate"
  />
</template>

<script lang="ts" setup>
import ContentHeader from "@/components/ContentHeader.vue";
import { Hierarchy } from "@/model/model";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { Result } from "@/@types/http";
import { useInsert } from "@/mixins/insert";
import { useUpdateOnTable } from "@/mixins/table/update";
import { usePeopleDetailStore } from "@/store/peopledetail";
import {
  deletepHierarchy,
  insertHierarchy,
  updateHierarchy,
} from "@/api/hierarchy";
import HierarchyDialog from "@/components/dialog/HierarchyDialog.vue";

const list = ref<Hierarchy[]>([]);

const peopleDetailStore = usePeopleDetailStore();
const people = peopleDetailStore.people;
const type = peopleDetailStore.type;
list.value = peopleDetailStore.hierarchy;

const { insertOb, isOpen, cancelInsert, confirmInsert, insert, setInsertOb } =
  useInsert(list, insertHierarchy);
const insertOnHierarchy = () => {
  if (peopleDetailStore.type === "sup") {
    setInsertOb({
      SubordIDnumber: "",
      SubordName: "",
      Supername: people.name,
      SuperIDnumber: people.number,
    });
  } else {
    setInsertOb({
      SubordIDnumber: people.name,
      SubordName: people.number,
      Supername: "",
      SuperIDnumber: "",
    });
  }
  insert();
};
const confirmInsertOnHierarchy = (hierarchy: Hierarchy) => {
  setInsertOb(hierarchy);
  confirmInsert();
};
const del = async (value: Hierarchy, index: number) => {
  const { data } = await deletepHierarchy(
    value.SuperIDnumber,
    value.SubordIDnumber
  );
  const res = data as Result;
  if (res.code === 0) {
    list.value.splice(index, 1);
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};
const { updateOb, isUpdate, update, confirmUpdate, cancelUpdate } =
  useUpdateOnTable(list, updateHierarchy);
</script>
