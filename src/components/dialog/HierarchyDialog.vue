<template>
  <base-dialog title="上下级" @close="close" @confirm="confirm">
    <template #content>
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="上级名称">
          <el-input
            v-model="data.Supername"
            placeholder="上级名称"
            :disabled="type === 'sup'"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级身份证">
          <el-input
            v-model="data.SuperIDnumber"
            placeholder="上级身份证"
            :disabled="type === 'sup'"
          ></el-input>
        </el-form-item>
        <el-form-item label="下级名称">
          <el-input
            v-model="data.SubordName"
            placeholder="下级名称"
            :disabled="type === 'sub'"
          ></el-input>
        </el-form-item>
        <el-form-item label="下级身份证">
          <el-input
            v-model="data.SubordIDnumber"
            placeholder="下级身份证"
            :disabled="type === 'sub'"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>
<script lang="ts" setup>
import { Hierarchy } from "@/model/model";
import { ref, toRefs, watch } from "vue";
import BaseDialog from "../BaseDialog.vue";

const props = defineProps<{
  form: Hierarchy;
  type: "sup" | "sub";
}>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm", data: Hierarchy): void;
}>();

function close() {
  emits("close");
}

function confirm() {
  emits("confirm", data.value);
}

const { form } = toRefs(props);

const data = ref({} as Hierarchy);
const updateData = () => {
  data.value = Object.assign({}, props.form);
};

watch(form, updateData);
</script>
