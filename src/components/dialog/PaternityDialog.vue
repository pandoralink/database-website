<template>
  <!-- TODO: 后端应该返回可选父母值 -->
  <base-dialog title="父母" @close="close" @confirm="confirm">
    <template #content>
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="父母名称">
          <el-input
            v-model="data.fname"
            placeholder="父母名称"
            :disabled="type === 'parent'"
          ></el-input>
        </el-form-item>
        <el-form-item label="父母身份证">
          <el-input
            v-model="data.fnumber"
            placeholder="父母身份证"
            :disabled="type === 'parent'"
          ></el-input>
        </el-form-item>
        <el-form-item label="子女名称">
          <el-input
            v-model="data.cname"
            placeholder="子女名称"
            :disabled="type === 'children'"
          ></el-input>
        </el-form-item>
        <el-form-item label="子女身份证">
          <el-input
            v-model="data.cnumber"
            placeholder="子女身份证"
            :disabled="type === 'children'"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>
<script lang="ts" setup>
import { Paternity } from "@/model/model";
import { ref, watch } from "vue";
import BaseDialog from "../BaseDialog.vue";

const props = defineProps<{
  form: Paternity;
  type: "parent" | "children";
}>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm", data: Paternity): void;
}>();

function close() {
  emits("close");
}

function confirm() {
  emits("confirm", data.value);
}

let data = ref(props.form);
const updateData = (paternity: Paternity) => {
  data.value = Object.assign({}, paternity);
};

watch(() => props.form, updateData);
</script>
