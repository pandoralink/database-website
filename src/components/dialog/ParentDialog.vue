<template>
  <!-- TODO: 后端应该返回可选父母值 -->
  <base-dialog title="父母" @close="close" @confirm="confirm">
    <template #content>
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="父母名称">
          <el-input v-model="data.name" placeholder="父母名称"></el-input>
        </el-form-item>
        <el-form-item label="父母身份证">
          <el-input v-model="data.number" placeholder="父母身份证"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>
<script lang="ts" setup>
import { People, PeopleDetail } from "@/model/model";
import { ref, toRefs, watch } from "vue";
import BaseDialog from "../BaseDialog.vue";

const props = defineProps<{
  form: People;
}>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm", data: PeopleDetail): void;
}>();

function close() {
  emits("close");
}

function confirm() {
  emits("confirm", data.value);
}

const { form } = toRefs(props);

let data = ref(props.form);
const updateData = (peopleDetail: PeopleDetail) => {
  data.value = Object.assign({}, peopleDetail);
};

watch(() => props.form, updateData);
</script>
