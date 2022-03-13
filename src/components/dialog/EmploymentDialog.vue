<template>
  <base-dialog title="职位" @close="close" @confirm="confirm">
    <template #content>
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="data.name" placeholder="姓名" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input
            v-model="data.number"
            placeholder="身份证"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="data.employName" placeholder="职位"></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input v-model="data.dpNUmber" placeholder="部门编号"></el-input>
        </el-form-item>
        <el-form-item label="职位编号">
          <el-input
            v-model="data.positionNumber"
            placeholder="职位编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="在职地点">
          <el-input
            v-model="data.employPlace"
            placeholder="在职地点"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>

<script lang="ts" setup>
import { Employment } from "@/model/model";
import { ref, toRefs, watch } from "vue";
import BaseDialog from "../BaseDialog.vue";

const props = defineProps<{
  form: Employment;
}>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm", data: Employment): void;
}>();

function close() {
  emits("close");
}

function confirm() {
  emits("confirm", data.value);
}

const { form } = toRefs(props);

const data = ref({} as Employment);
const updateData = () => {
  data.value = Object.assign({}, props.form);
};

watch(form, updateData);
</script>

<style scoped></style>
