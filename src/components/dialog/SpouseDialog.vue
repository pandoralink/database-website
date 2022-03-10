<template>
  <base-dialog title="父母" @close="close" @confirm="confirm">
    <template #content>
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="配偶">
          <el-input
            v-model="data.mname"
            placeholder="配偶名称"
            :disabled="data.mname === spouseName && !!spouseName"
          ></el-input>
        </el-form-item>
        <el-form-item label="配偶身份证">
          <el-input
            v-model="data.midnumber"
            placeholder="配偶身份证"
            :disabled="data.mname === spouseName && !!spouseName"
          ></el-input>
        </el-form-item>
        <el-form-item label="配偶">
          <el-input
            v-model="data.wname"
            placeholder="配偶名称"
            :disabled="data.wname === spouseName && !!spouseName"
          ></el-input>
        </el-form-item>
        <el-form-item label="配偶身份证">
          <el-input
            v-model="data.widnumber"
            placeholder="配偶身份证"
            :disabled="data.wname === spouseName && !!spouseName"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>
<script lang="ts" setup>
import { Spouse } from "@/model/model";
import { ref, toRefs, watch } from "vue";
import BaseDialog from "../BaseDialog.vue";

const props = defineProps<{
  form: Spouse;
  spouseName?: string;
}>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm", data: Spouse): void;
}>();

function close() {
  emits("close");
}

function confirm() {
  emits("confirm", data.value);
}

const { form } = toRefs(props);

const data = ref({} as Spouse);
const updateData = () => {
  data.value = Object.assign({}, props.form);
};

watch(form, updateData);
</script>
