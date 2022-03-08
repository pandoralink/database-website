<template>
  <base-dialog @close="close" @confirm="confirm">
    <template #content>
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="data['name']" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="data['age']" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="国籍">
          <el-input v-model="data['nationality']" placeholder="国籍"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="data['number']" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item label="党派">
          <el-input v-model="data['parties']" placeholder="党派"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="data['education']" placeholder="学历"></el-input>
        </el-form-item>
        <el-form-item label="照片">
          <el-input v-model="data['images']" placeholder="照片链接"></el-input>
        </el-form-item>
        <el-form-item label="人物关系/可选/测试专用" label-width="100px" />
        <el-form-item label="配偶">
          <el-select v-model="data.mname" placeholder="选一个吧">
            <el-option label="罗通" value="罗通"></el-option>
            <el-option label="罗通" value="罗通"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子女">
          <!-- TODO: 需要做封装一个组件以达成多选功能 -->
          <el-select v-model="data.cname" placeholder="选一个吧">
            <el-option label="罗通" value="罗通"></el-option>
            <el-option label="罗通" value="罗通"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上下级">
          <el-select v-model="data.cname" placeholder="选一个吧">
            <el-option label="罗通" value="罗通"></el-option>
            <el-option label="罗通" value="罗通"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门信息/可选" label-width="100px" />
        <el-form-item label="在职地点">
          <el-input
            v-model="data.employPlace"
            placeholder="花江10#507"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位名称">
          <el-input
            v-model="data.employName"
            placeholder="老八秘制厨师"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位编号">
          <el-input
            v-model="data.positionNumber"
            placeholder="10086"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门编号">
          <el-input v-model="data.dpNUmber" placeholder="1111"></el-input>
        </el-form-item>
        <el-form-item label="个人经历/可选" label-width="100px" />
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
