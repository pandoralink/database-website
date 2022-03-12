<template>
  <content-header
    :show-filter="false"
    :show-del="false"
    @insert="insertOnSpouse"
  ></content-header>
  <div class="base-content">
    <el-table :data="list" style="width: 100%" :border="true">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="Mname" label="丈夫"></el-table-column>
      <el-table-column prop="MIDnumber" label="丈夫身份证"></el-table-column>
      <el-table-column prop="Wname" label="妻子"></el-table-column>
      <el-table-column prop="WIDnumber" label="子女身份证"></el-table-column>
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
    :spouse-name="spouseName"
    @close="cancelInsert"
    @confirm="confirmInsertOnSpouse"
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
import ContentHeader from "@/components/ContentHeader.vue";
import { Spouse } from "@/model/model";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { Result } from "@/@types/http";
import { useSpouseStore } from "@/store/spouse";
import { useInsert } from "@/mixins/insert";
import { deleteSpouse, insertSpouse, updateSpouse } from "@/api/spouse";
import SpouseDialog from "@/components/dialog/SpouseDialog.vue";
import { useUpdateOnTable } from "@/mixins/table/update";

const list = ref<Spouse[]>([]);

const spouseStore = useSpouseStore();
list.value = spouseStore.spouse;
const spouseName = spouseStore.spouseName;
let spouseNumber = "";
// 这段配偶关系中不会被修改的角色性别
let gender = "";
for (const spouse of list.value) {
  if (spouse.Mname === spouseName) {
    gender = "m";
    spouseNumber = spouse.MIDnumber;
    break;
  }
  if (spouse.Wname === spouseName) {
    gender = "w";
    spouseNumber = spouse.WIDnumber;
    break;
  }
}

const { insertOb, isOpen, cancelInsert, confirmInsert, insert, setInsertOb } =
  useInsert(list, insertSpouse);
const insertOnSpouse = () => {
  setInsertOb({
    WIDnumber: gender === "w" ? spouseNumber : "",
    Wname: gender === "w" ? spouseName : "",
    Mname: gender === "m" ? spouseName : "",
    MIDnumber: gender === "m" ? spouseNumber : "",
  });
  insert();
};
const confirmInsertOnSpouse = (spouse: Spouse) => {
  setInsertOb(spouse);
  confirmInsert();
};
const del = async (value: Spouse, index: number) => {
  const { data } = await deleteSpouse(
    spouseName === value.Mname ? value.MIDnumber : value.WIDnumber
  );
  const res = data as Result;
  if (res.code === 0) {
    list.value.splice(index, 1);
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};
const { updateOb, isUpdate, update, confirmUpdate, cancelUpdate } =
  useUpdateOnTable(list, updateSpouse);
</script>
