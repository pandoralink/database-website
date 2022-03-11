<template>
  <content-header
    :show-filter="false"
    :show-del="false"
    @insert="insertOnPaternity"
  ></content-header>
  <div class="base-content">
    <el-table :data="list" style="width: 100%" :border="true">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="fname" label="父母名称"></el-table-column>
      <el-table-column prop="fnumber" label="父母身份证"></el-table-column>
      <el-table-column prop="cname" label="子女名称"></el-table-column>
      <el-table-column prop="cnumber" label="子女身份证"></el-table-column>
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
  <paternity-dialog
    v-model="isOpen"
    :type="'parent'"
    :form="insertOb"
    @close="cancelInsert"
    @confirm="confirmInsertOnPaternity"
  />
  <paternity-dialog
    v-model="isUpdate"
    :type="'parent'"
    :form="updateOb"
    @close="cancelUpdate"
    @confirm="confirmUpdate"
  />
</template>

<script lang="ts" setup>
import ContentHeader from "@/components/ContentHeader.vue";
import { Paternity } from "@/model/model";
import { ref } from "vue";
import { usePaternityStore } from "@/store/paternity";
import { useInsert } from "@/mixins/insert";
import { insertPaternity, updatePaternity } from "@/api/paternity";
import PaternityDialog from "@/components/dialog/PaternityDialog.vue";
import { useUpdateOnTable } from "@/mixins/table/update";

const list = ref<Paternity[]>([]);

const paternityStore = usePaternityStore();
const people = paternityStore.people;
list.value = paternityStore.paternity;

const { insertOb, isOpen, cancelInsert, confirmInsert, insert, setInsertOb } =
  useInsert(list, insertPaternity);
const insertOnPaternity = () => {
  // 默认使用 Paternity.vue 的只有父母不可修改
  setInsertOb({
    cnumber: "",
    cname: "",
    fname: people.name,
    fnumber: people.number,
  });
  insert();
};
const confirmInsertOnPaternity = (paternity: Paternity) => {
  setInsertOb(paternity);
  confirmInsert();
};

// const del = async (value: Paternity, index: number) => {
//   const { data } = await deletePaternity(value.url);
//   const res = data as Result;
//   if (res.code === 0) {
//     list.value.splice(index, 1);
//     ElMessage.success(res.msg);
//   } else ElMessage.error("操作失败，请重试");
// };

const { updateOb, isUpdate, update, confirmUpdate, cancelUpdate } =
  useUpdateOnTable(list, updatePaternity);
</script>
