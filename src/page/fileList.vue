<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="file-list-bar">
      <el-icon
        title="返回上一级"
        class="file-list-back"
        color="#00bafd"
        @click="goBackFileList"
        v-if="path !== ''"
      >
        <back />
      </el-icon>
      <el-breadcrumb class="file-breadcrumb" :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in filePath" :key="index">
          {{ item }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table_container">
      <el-table :data="fileList" style="width: 100%" fit>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="文件名">
          <template #default="scope">
            <p @click="goToNextDir(scope.row)">{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="dir" label="类型">
          <template #default="scope">
            <span>{{ scope.row.dir ? "文件夹" : "文件" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="len" label="大小">
          <template #default="scope">
            <span>{{ scope.row.len + " B" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #header>
            <span style="margin-right: 10px">操作</span>
            <el-upload
              style="display: inline-flex"
              class="file-upload"
              action="http://localhost:8080/api/file/addFile"
              :http-request="uploadFile"
              :show-file-list="false"
              :on-success="fileUploadSuccess"
            >
              <el-button
                size="mini"
                title="上传"
                circle
                :icon="Plus"
              ></el-button>
            </el-upload>
            <el-button
              style="margin-left: 10px"
              size="mini"
              title="创建文件夹"
              circle
              :icon="FolderOpened"
              @click="dirDialogFlag = true"
            ></el-button>
          </template>
          <template #default="scope">
            <el-button
              size="mini"
              title="重命名"
              circle
              :icon="Edit"
              @click="openDialog(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              title="下载"
              circle
              :icon="Download"
              :disabled="scope.row.dir"
              @click="download(scope.row.name)"
            ></el-button>
            <el-button
              size="mini"
              title="删除"
              circle
              :icon="Delete"
              @click="deleteFile(scope.row.name)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <dir-dialog
    v-model="dirDialogFlag"
    @close="dirDialogFlag = false"
    @confirm="createDir"
  >
    <template #content>
      <el-input v-model="dirName" placeholder="文件夹名称"></el-input>
    </template>
  </dir-dialog>
  <el-dialog
    title="文件信息"
    v-model="DialogFlag"
    :show-close="false"
    width="50%"
  >
    <el-form ref="form" :model="dialogOb" label-width="80px">
      <el-form-item label="文件名">
        <el-input v-model="dialogOb['name']" placeholder="文件名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="DialogFlag = false">关闭</el-button>
      <el-button @click="updateFileName(dialogOb.name)">确认 </el-button>
    </template>
  </el-dialog>
</template>

<script>
import headTop from "../components/headTop.vue";
import { reactive, ref } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import {
  Delete,
  Edit,
  Plus,
  Download,
  FolderOpened,
  Back,
} from "@element-plus/icons";
import axios from "../utils/axios";
import DirDialog from "../components/DirDialog.vue";

export default {
  components: {
    headTop,
    DirDialog,
    Plus,
    Edit,
    Delete,
    Download,
    FolderOpened,
    Back,
  },
  setup() {
    // 请求数据
    let fileList = reactive([]);
    let DialogFlag = ref(false);
    let dialogOb = ref({
      name: "",
    });
    let dirDialogOb = ref({
      name: "",
    });
    let adiminPower = reactive([]);
    let oldName = "";
    let path = ref("");

    async function getData() {
      try {
        const response = await axios.get("/api/file/hdfsForm");
        const res = response.data.data;
        if (res !== null) {
          fileList.push(...res);
        }
      } catch (err) {
        ElMessage.error("出错了");
        console.log(err);
      }
    }

    getData();

    function openDialog(ob) {
      oldName = ob.name;
      DialogFlag.value = true;
      dialogOb.value = ob;
    }

    /**
     * 由于太多 path 要进行判空并转换
     * 所以特地写了一个 util func
     */
    function pathHandle(path, str) {
      return path === "" ? str : path + "/" + str;
    }

    function updateFileName(name) {
      name = pathHandle(path.value, name);
      oldName = pathHandle(path.value, oldName);
      DialogFlag.value = false;
      axios
        .get("/api/file/modifyFileName", {
          params: {
            newName: name,
            oldName: oldName,
          },
        })
        .then((res) => {
          if (res.data.data === "success") {
            ElMessage.success("修改成功");
          } else {
            ElMessage.error("修改失败");
          }
        })
        .catch((err) => {
          ElMessage.error("修改失败");
        });
    }

    function deleteFile(name) {
      let temp = fileList.filter((item, index) => {
        if (item["name"] != name) return item;
      });
      fileList.length = 0;
      fileList.push(...temp);
      axios.get("/api/file/del", {
        params: {
          path: path.value + "/" + name,
        },
      });
    }

    function fileUploadSuccess(res, file) {
      ElMessage.success("上传成功");
    }

    function uploadFile(param) {
      const formData = new FormData();
      formData.append("upFile", param.file);
      formData.append("path", path.value);
      axios
        .post("/api/file/addFileByPath", formData)
        .then((res) => {
          ElMessage.success(res.data.msg);
          fileList.push(res.data.data);
        })
        .catch((response) => {
          ElMessage.success("服务器出错了");
          param.onError();
        });
    }

    function download(name) {
      let filePath = path.value + "/" + name;
      window.location.href =
        "http://localhost:8080/download?filePath=" +
        filePath +
        "&" +
        "name=" +
        name;
    }

    let dirDialogFlag = ref(false);
    let dirName = ref("");

    function createDir() {
      dirDialogFlag.value = false;
      axios
        .get("/api/file/createDir", {
          params: {
            name: path.value + "/" + dirName.value,
          },
        })
        .then((res) => {
          ElMessage.success(res.data.msg);
          fileList.push(res.data.data);
        })
        .catch((err) => {
          ElMessage.error("服务器出错了");
        });
      dirName.value = "";
    }

    function getFileList(dirPath, nextDirName) {
      axios
        .get("api/file/fileList", {
          params: {
            path: dirPath,
          },
        })
        .then((res) => {
          path.value = dirPath;

          fileList.length = 0;
          if (res.data.data != null) {
            fileList.push(...res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
          ElMessage.error("服务器出错了");
        });
    }

    function goToNextDir(ob) {
      if (ob.dir) {
        let dirPath = path.value === "" ? ob.name : path.value + "/" + ob.name;
        console.log("去往下一级目录：" + dirPath);
        getFileList(dirPath);
      } else {
        console.log("这个是文件无法点击");
      }
    }

    function goBackFileList() {
      let arr = path.value.split("/");
      arr.pop();
      console.log("返回上一级目录：" + arr.join("/"));
      getFileList(arr.join("/"));
    }

    return {
      DialogFlag,
      dialogOb,
      dirName,
      dirDialogFlag,
      openDialog,
      adiminPower,
      fileList,
      Plus,
      Edit,
      Delete,
      Download,
      Back,
      updateFileName,
      fileUploadSuccess,
      deleteFile,
      uploadFile,
      download,
      FolderOpened,
      createDir,
      goToNextDir,
      path,
      goBackFileList,
    };
  },
  computed: {
    filePath: function () {
      if (this.path === "") return ["/"];
      else {
        return this.path.split("/");
      }
    },
  },
};
</script>
