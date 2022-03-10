<template>
  <content-header
    :show-filter="false"
    :show-del="false"
    @insert="insert"
  ></content-header>
  <div class="base-content">
    <el-table :data="list" style="width: 100%" :border="true">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="mname" label="丈夫"></el-table-column>
      <el-table-column prop="midnumber" label="丈夫身份证"></el-table-column>
      <el-table-column prop="wname" label="妻子"></el-table-column>
      <el-table-column prop="widnumber" label="子女身份证"></el-table-column>
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
  <spouse-dialog
    v-model="isOpen"
    :form="insertOb"
    @close="cancelInsert"
    @confirm="confirmInsert"
  />
  <spouse-dialog
    v-model="isUpdate"
    :form="updateOb"
    :spouse-name="spouseName"
    @close="cancelUpdate"
    @confirm="confirmUpdate"
  />
</template>

<script lang="ts" setup>
import { deleteBug } from "@/api/bug";
import ContentHeader from "@/components/ContentHeader.vue";
import { Bug, Spouse } from "@/model/model";
import { FormMethod } from "@/types";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { Result } from "@/@types/http";
import { useSpouseStore } from "@/store/spouse";
import { useInsert } from "@/mixins/insert";
import { insertSpouse, updateSpouse } from "@/api/spouse";
import SpouseDialog from "@/components/dialog/SpouseDialog.vue";
import { useUpdateOnTable } from "@/mixins/table/update";

const list = ref<Spouse[]>([]);

const spouseStore = useSpouseStore();
const spouseName = spouseStore.spouseName;
list.value = spouseStore.spouse;
let formValue = ref<Bug>({} as Bug);
let methodType = ref<FormMethod>("insert");

const { insertOb, isOpen, cancelInsert, confirmInsert, insert } = useInsert(
  list,
  insertSpouse
);

const { updateOb, isUpdate, update, confirmUpdate, cancelUpdate } =
  useUpdateOnTable(list, updateSpouse);

const del = async (value: Bug, index: number) => {
  const { data } = await deleteBug(value.url);
  const res = data as Result;
  if (res.code === 0) {
    list.value.splice(index, 1);
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};

// const changeFormValue = (bug: Bug, type: FormMethod, index?: number) => {
//   isOpen.value = false;
//   if (type === "insert") insertData(bug);
//   else updateData(bug, index as number);
// };
</script>
