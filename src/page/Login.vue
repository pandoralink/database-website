<template>
  <div class="login-background">
    <div class="form-structure">
      <div class="signup" :class="{ 'slide-up': !isLogin }">
        <h2 class="form-title" id="signup" @click="toLogin">
          {{ isLogin ? "越南数据库管理系统" : "返回登录" }}
        </h2>
        <div class="form-holder">
          <el-form
            :model="loginData"
            ref="loginFormRef"
            :rules="rules"
            inline-message
          >
            <el-form-item
              prop="user"
              style="padding: 8px; border-bottom: 1px solid #eee"
            >
              <el-input
                class="login-input"
                v-model="loginData.user"
                type="text"
                placeholder="账号"
              />
            </el-form-item>
            <el-form-item prop="password" style="padding: 8px">
              <el-input
                class="login-input"
                v-model="loginData.password"
                type="password"
                placeholder="密码"
              />
            </el-form-item>
          </el-form>
        </div>
        <button class="submit-btn" @click="loginSubmitForm(loginFormRef)">
          登录
        </button>
      </div>
      <div class="login" :class="{ 'slide-up': isLogin }">
        <div class="center">
          <h2 class="form-title" id="login" @click="toRegister">
            <span v-if="isLogin">还没有账号？</span>注册
          </h2>
          <div class="form-holder">
            <el-form
              :model="registerData"
              ref="registerFormRef"
              :rules="rules"
              inline-message
            >
              <el-form-item
                prop="user"
                style="padding: 8px; border-bottom: 1px solid #eee"
              >
                <el-input
                  v-model="registerData.user"
                  class="login-input"
                  type="text"
                  placeholder="账号"
                />
              </el-form-item>
              <el-form-item prop="password" style="padding: 8px">
                <el-input
                  v-model="registerData.password"
                  class="login-input"
                  type="password"
                  placeholder="密码"
                />
              </el-form-item>
            </el-form>
          </div>
          <button
            class="submit-btn"
            @click="registerSubmitForm(registerFormRef)"
          >
            注册
          </button>
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
import type { ElForm } from "element-plus";
import { login, register } from "@/api/user";
import { User } from "@/@types/model";
import { Result } from "@/@types/http";

type FormInstance = InstanceType<typeof ElForm>;

const loginFormRef = ref<FormInstance>();
const loginData = reactive<User>({
  user: "",
  password: "",
});

const registerFormRef = ref<FormInstance>();
const registerData = reactive<User>({
  password: "",
  user: "",
});

const rules = reactive({
  user: [
    {
      required: true,
      message: "账号不能为空",
      trigger: "blur",
      inlineMessage: true,
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
});

const loginSubmitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const { data } = await login(loginData);
      const res = data as Result;
      if (res.code === 0) {
        router.push("/manage");
        ElMessage.success(res.msg);
      } else ElMessage.error(res.msg);
    } else {
      ElMessage.error("输入出错");
      return false;
    }
  });
};

const registerSubmitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const { data } = await register(registerData);
      const res = data as Result;
      if (res.code === 0) {
        router.push("/manage");
        ElMessage.success(res.msg);
      } else ElMessage.error(res.msg);
    } else {
      ElMessage.error("输入出错");
      return false;
    }
  });
};

const isLogin = ref(true);
const toLogin = () => {
  isLogin.value = true;
};
const toRegister = () => {
  isLogin.value = false;
};

const router = useRouter();
</script>
<style scoped>
@import "../style/login.css";

.el-form-item--default {
  margin-bottom: 0;
}
</style>
