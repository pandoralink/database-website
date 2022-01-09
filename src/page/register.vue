<template>
  <div class="login_page fillcontain">
    <div class="manage_tip">
      <p>越南数据库系统</p>
    </div>
    <section class="form_contianer">
      <el-form
        :model="registerData"
        ref="formData"
        label-width="80px"
        class="store-form-data"
      >
        <el-form-item label="名称">
          <el-input v-model="registerData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registerData.password"></el-input>
        </el-form-item>
        <div style="display: flex; width: 100%; justify-content: space-between">
          <el-button type="primary" @click="loginBack">返回登录 </el-button>
          <el-button type="primary" @click="registerRole(registerData)"
            >提交
          </el-button>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts" setup>
import axios from "../utils/axios";
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { Result } from "@/model/selfCloudModel.js";
import { onMounted } from "vue";

onMounted(() => {
  ElMessage({
    message: "暂时不需要输入密码，可直接点击登录",
    duration: 3000,
    showClose: true,
  });
});

const router = useRouter();
let registerData = reactive({
  name: "",
  password: "",
});

function registerRole(ob: { name: string; password: string }) {
  console.log("管理员登录中...", ob);
  // if (ob.name == "" || ob.password == "") {
  //   return;
  // }
  // axios
  //   .post("/api/user/register", ob)
  //   .then((res: Result) => {
  //     if (res.data.data === "failure") {
  //       ElMessage.error(res.data.msg);
  //     } else {
  //       ElMessage.success(res.data.msg);
  //       localStorage.setItem("managerInfo", JSON.stringify(ob));
  //       router.push("/manage");
  //     }
  //   })
  //   .catch((err: any) => {
  //     ElMessage.error("登录失败");
  //     console.log(err);
  //   });
  router.push("/manage");
}

function loginBack() {
  router.go(-1);
}
</script>
