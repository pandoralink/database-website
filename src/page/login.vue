<template>
  <div class="login_page">
    <div class="manage_tip">
      <p>越南数据库系统</p>
    </div>
    <section class="form_contianer">
      <el-form :model="loginData" :rules="rules" ref="loginForm">
        <el-form-item>
          <el-input placeholder="名称" v-model="loginData.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginData.password"
            show-password
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(loginData)" class="submit_btn"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
      <span class="register-info"
        >还没有账号？快去
        <router-link to="/register">注册</router-link>
      </span>
    </section>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "../utils/axios";
import { reactive } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { ElNotification } from "element-plus";
import path from "../utils/constant.js";
import { Right, Plus } from "@element-plus/icons";
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      ElMessage({
        message: "暂时不需要输入密码, 可直接点击登录",
        duration: 3000,
        showClose: true,
      });
    });

    let loginData = reactive({
      password: "",
      name: "",
    });
    const rules = {
      id: {
        required: true,
        message: "不能为空",
      },
      username: {
        required: true,
        message: "不能为空",
      },
      password: {
        required: true,
        message: "不能为空",
      },
    };

    const router = useRouter();

    function superLogin() {
      router.push("/manageRegister");
    }

    function login(ob) {
      // axios.get(path.LOGIN, { params: ob }).then((res) => {
      //   if (res.data.data !== null) {
      //     ElMessage.success("登录成功");
      //     localStorage.setItem("studentInfo", JSON.stringify(res.data));
      //     router.push("/manage");
      //   } else {
      //     ElMessage.error(res.data.msg);
      //   }
      // });
      router.push("/manage");
    }

    return {
      superLogin,
      login,
      loginData,
      rules,
      Right,
      Plus,
    };
  },
};
</script>
