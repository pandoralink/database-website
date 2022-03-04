<template>
  <div class="login-background">
    <div class="form-structure">
      <div class="signup" :class="{ 'slide-up': !isLogin }">
        <h2 class="form-title" id="signup" @click="toLogin">
          {{ isLogin ? "越南数据库管理系统" : "返回登录" }}
        </h2>
        <div class="form-holder">
          <el-form :model="loginData">
            <el-form-item>
              <el-input
                v-model="loginData.name"
                class="login-input"
                type="text"
                placeholder="账号"
                required
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="loginData.password"
                class="login-input"
                type="password"
                placeholder="密码"
                required
              />
            </el-form-item>
          </el-form>
        </div>
        <button class="submit-btn" @click="login">登录</button>
      </div>
      <div class="login" :class="{ 'slide-up': isLogin }">
        <div class="center">
          <h2 class="form-title" id="login" @click="toRegister">
            <span v-if="isLogin">还没有账号？</span>注册
          </h2>
          <div class="form-holder">
            <el-form :model="registerData">
              <el-form-item>
                <el-input
                  v-model="registerData.name"
                  class="login-input"
                  type="text"
                  placeholder="账号"
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="registerData.email"
                  class="login-input"
                  type="email"
                  placeholder="邮箱"
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="registerData.password"
                  class="login-input"
                  type="password"
                  placeholder="密码"
                />
              </el-form-item>
            </el-form>
          </div>
          <button class="submit-btn">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";

onMounted(() => {
  ElMessage({
    message: "暂时不需要输入密码, 可直接点击登录",
    duration: 3000,
    showClose: true,
  });
});

const isLogin = ref(true);
const toLogin = () => {
  isLogin.value = true;
};
const toRegister = () => {
  isLogin.value = false;
};

const loginData = reactive({
  password: "",
  name: "",
});
const registerData = reactive({
  password: "",
  name: "",
  email: "",
});

const router = useRouter();

function login(ob: any) {
  router.push("/manage");
}
</script>
<style scoped>
@import "../style/login.css";

.el-form-item--default {
  margin-bottom: 0;
}
</style>
