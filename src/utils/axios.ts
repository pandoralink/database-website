import axios from "axios";
import { ElMessage } from "element-plus";

// 生产环境 URL
const url = "";
const developmentUrl = "http://localhost:8081";
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? developmentUrl : url;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      ElMessage({
        showClose: true,
        message: "服务器出错了",
        type: "error",
      });
      return Promise.reject(error.response.data);
    }
  }
);

export default axios;
