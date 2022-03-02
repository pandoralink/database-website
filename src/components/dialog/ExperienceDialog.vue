<template>
  <base-dialog title="个人经历" @close="close" @confirm="confirm">
    <template #content>
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="经历标题">
          <el-input v-model="data.title" placeholder="奥力给干了"></el-input>
        </el-form-item>
        <el-form-item label="详细经历">
          <el-input
            type="textarea"
            v-model="data.eventDetails"
            placeholder="奥力给干了"
          ></el-input>
        </el-form-item>
        <el-form-item label="经历链接">
          <el-input v-model="data.url" placeholder="经历链接"></el-input>
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
  form: PeopleDetail;
}>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm", data: People): void;
}>();

function close() {
  emits("close");
}

function confirm() {
  emits("confirm", data.value);
}

const { form } = toRefs(props);

let data = ref(props.form);
const updateData = () => {
  data.value = Object.assign({}, props.form);
};

watch(form, updateData);
</script>
