<template>
  <template v-if="active === 0">
    <info :show-update="true" @update="update">
      <template #header-tag>
        <!-- XXX: 可能会重复渲染 -->
        <department-header :data="department" @change="changeDataType" />
      </template>
    </info>
  </template>
  <template v-if="active === 1">
    <military-equipment :show-update="true" @update="update">
      <template #header-tag>
        <department-header :data="department" @change="changeDataType" />
      </template>
    </military-equipment>
  </template>
  <base-dialog v-model="isOpen" @close="cancelUpdate" @confirm="confirmUpdate">
    <template #content>
      <el-form ref="form" :model="updateOb" label-width="80px">
        <el-form-item label="部门名称">
          <el-input
            v-model="updateOb['name']"
            placeholder="部门名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门职位">
          <el-input
            v-model="updateOb['position']"
            placeholder="部门职位"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门地点">
          <el-input
            v-model="updateOb['location']"
            placeholder="部门地点"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门类型">
          <el-input
            v-model="updateOb['type']"
            placeholder="部门类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input
            v-model="updateOb['number']"
            placeholder="部门编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            v-model="updateOb['contactInformation']"
            placeholder="联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门照片">
          <el-input
            v-model="updateOb['image']"
            placeholder="照片链接"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>

<script lang="ts" setup>
import { updateDepartment } from "@/api/department";
import BaseDialog from "@/components/BaseDialog.vue";
import { DepartmentDataType } from "@/model/model";
import { useDepartmentStore } from "@/store/department";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import info from "./info.vue";
import MilitaryEquipment from "./MilitaryEquipment.vue";
import { Result } from "@/@types/http";
import Header from "@/components/department/DepartmentHeader.vue";
import DepartmentHeader from "@/components/department/DepartmentHeader.vue";

const active = ref<DepartmentDataType>(DepartmentDataType.people);

/**
 * 切换数据类型
 * 0 为成员列表
 * 1 为武器库
 * @param type number
 */
function changeDataType(type: number) {
  active.value = type as DepartmentDataType;
}

// 更新
const departmentStore = useDepartmentStore();
let updateOb = departmentStore.department;
const department = updateOb;
const isOpen = ref(false);
const update = () => (isOpen.value = true);
const cancelUpdate = () => (isOpen.value = false);
const confirmUpdate = async () => {
  cancelUpdate();
  const { data } = await updateDepartment(updateOb);
  const res = data as Result;
  if (res.code === 0) {
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};
</script>
