<template>
  <template v-if="active === 0">
    <info>
      <template #header-tag>
        <el-button @click="changeDataType(0)" type="primary">
          成员列表
        </el-button>
        <el-button @click="changeDataType(1)" type="primary">
          武器库
        </el-button>
      </template>
    </info>
  </template>
  <template v-if="active === 1">
    <military-equipment>
      <template #header-tag>
        <el-button @click="changeDataType(0)" type="primary">
          成员列表
        </el-button>
        <el-button @click="changeDataType(1)" type="primary">
          武器库
        </el-button>
      </template>
    </military-equipment>
  </template>
</template>

<script lang="ts" setup>
import { DepartmentDataType } from "@/model/model";
import { ref } from "vue";
import info from "./info.vue";
import MilitaryEquipment from "./MilitaryEquipment.vue";

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
</script>
