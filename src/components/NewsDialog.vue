<template>
  <base-dialog @close="close" @confirm="confirm">
    <template #content>
      <el-form ref="form" :model="formValue" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="formValue['title']" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="封面链接">
          <el-input
            v-model="formValue['image']"
            placeholder="http://hao123.com/"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻描述">
          <el-input
            v-model="formValue['briefIntroduction']"
            placeholder="这可是个大新闻"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细信息">
          <el-input
            v-model="formValue['details']"
            placeholder="详细信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻链接">
          <el-input
            v-model="formValue['url']"
            placeholder="http://hao123.com/"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input
            v-model="formValue['time']"
            placeholder="2022/2/18"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formValue['author']" placeholder="作者"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </base-dialog>
</template>
<script lang="ts" setup>
import BaseDialog from "../components/BaseDialog.vue";
import { useNewsStore } from "@/store/new";
import { News } from "@/model/model";

const newsStore = useNewsStore();
// formValue 表单修改对象
const formValue = newsStore.form;

const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm", news: News): void;
}>();

function close() {
  emits("close");
}

function confirm() {
  emits("confirm", formValue);
}
</script>
