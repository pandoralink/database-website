<template>
  <div class="header_container">
    <div class="menu-top">Vietnam Website</div>
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta.desc" :key="index">{{
          item
        }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="primary"
      size="small"
      round
      style="margin-right: 10px"
      @click="signOut"
    >退出
    </el-button
    > -->
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from '../utils/axios'
import path from '../utils/constant'

export default {
  setup () {
    const router = useRouter()

    function signOut () {
      axios.get(path.LOGOUT).then(res => {
        if (res.data.data === 'success') {
          ElMessage.success(res.data.msg);
          router.push('/login')
        }
      }).catch(err => {
        console.log(err);
        ElMessage.error('出错了！')
      })
    }

    return {
      signOut,
    }
  },
}
</script>
