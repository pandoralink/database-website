<template>
  <base-dialog title="配偶" @close="close" @confirm="confirm">
    <template #content>
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="丈夫">
          <el-input
            v-model="data.Mname"
            placeholder="丈夫"
            :disabled="data.Mname === spouseName"
          ></el-input>
        </el-form-item>
        <el-form-item label="丈夫身份证">
          <el-input
            v-model="data.MIDnumber"
            placeholder="丈夫身份证"
            :disabled="data.Mname === spouseName"
          ></el-input>
        </el-form-item>
        <el-form-item label="妻子">
          <el-input
            v-model="data.Wname"
            placeholder="妻子"
            :disabled="data.Wname === spouseName"
          ></el-input>
        </el-form-item>
        <el-form-item label="妻子身份证">
          <el-input
            v-model="data.WIDnumber"
            placeholder="妻子身份证"
            :disabled="data.Wname === spouseName"
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
