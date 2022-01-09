<template>
  <div class="fillcontain">
    <HeadTop />
    <div class="userInfo-content">
      <el-form ref="form" :model="userInfoOb" label-width="80px">
        <el-form-item label="名称">
          <el-input
            v-model="userInfoOb.name"
            placeholder="名称"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userInfoOb.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="userInfoOb.age" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userInfoOb.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeadTop from "../components/headTop.vue";
import axios from "../utils/axios";
import { ElMessage } from "element-plus";
import { ref } from "@vue/reactivity";
import { Result, UserInfo } from "../model/selfCloudModel";

let userInfoOb = ref<UserInfo>({
  name: "",
  password: "",
  age: 0,
  phone: "",
});

async function getData() {
  try {
    const response: Result = await axios.get("/api/user/userInfo");
    userInfoOb.value = response.data.data as UserInfo;
  } catch (err) {
    ElMessage.error("出错了");
    console.log(err);
  }
}

getData();

function onSubmit() {
  axios
    .post("/api/user/updateInfo", userInfoOb.value)
    .then((_res) => {
      ElMessage.success("更新成功");
    })
    .catch((_err) => {
      console.log("更新失败");
    });
}
</script>
