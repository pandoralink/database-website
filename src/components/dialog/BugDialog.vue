<template>
  <base-dialog @close="close" @confirm="confirm">
    <template #content>
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="爬虫链接">
          <el-input v-model="data['url']" placeholder="爬虫链接"></el-input>
        </el-form-item>
        <el-form-item label="功能备注">
          <el-input v-model="data['remarks']" placeholder="功能备注"></el-input>
        </el-form-item>
        <el-form-item label="规则">
          <el-input v-model="data['rule']" placeholder="规则"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="data['auther']" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="data['switchs']" placeholder="状态"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>
<script lang="ts" setup>
import { Bug } from "@/model/model";
import { unref } from "vue";
import BaseDialog from "../BaseDialog.vue";

const props = defineProps<{
  formValue: Bug;
  methodType: string;
}>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm", data: Bug): void;
}>();

function close() {
  emits("close");
}

function confirm() {
  emits("confirm", data);
}

const data = unref(props.formValue);
</script>
