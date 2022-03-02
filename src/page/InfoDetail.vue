<template>
  <content-header :show-filter="false">
    <template #right>
      <el-button type="primary" :icon="Edit" @click="update">更新</el-button>
      <el-button type="primary" :icon="Edit" @click="updateExperiences"
        >个人经历
      </el-button>
    </template>
  </content-header>
  <div class="base-content new">
    <!-- 左边距统一为 20px -->
    <base-list-item
      :show-index="false"
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.images"
    >
      <template #default>
        <span>姓名: {{ item.name }}</span
        ><br />
        <span>年龄: {{ item.age }}</span
        ><br />
        <span>国籍: {{ item.nationality }}</span
        ><br />
        <span>身份证号: {{ item.number }}</span
        ><br />
        <span>党派: {{ item.parties }}</span
        ><br />
        <span>学历: {{ item.education }}</span
        ><br />
      </template>
    </base-list-item>
    <div
      class="detail-row"
      style="display: flex; flex-wrap: wrap; padding: 10px"
    >
      <div>
        <el-tag effect="dark" size="large"> 人物关系</el-tag>
        <br />
        <!-- 可以考虑使用 v-for 遍历人物关系 -->
        <div class="employ-relation">
          <div class="employ-relation-detail">
            <img
              :src="EmpolyImg"
              style="width: 60px; height: 60px; border-radius: 30px"
            />
            <br />
            <span>子女：罗通</span>
            <!--          <span>{{ "子女：" + item.cname }}</span>-->
          </div>
          <div class="employ-relation-detail">
            <img
              :src="EmpolyImg"
              style="width: 60px; height: 60px; border-radius: 30px"
            />
            <br />
            <span>妻子：罗通</span>
            <!--          <span>{{ "配偶：" + peopleDetail.spouse }}</span>-->
          </div>
          <!--          <div class="empoly-relation-detail">-->
          <!--            <img-->
          <!--              :src="EmpolyImg"-->
          <!--              style="width: 60px; height: 60px; border-radius: 30px"-->
          <!--            />-->
          <!--            <br />-->
          <!--            &lt;!&ndash;          <span>{{ "父亲：" + peopleDetail.father.fname }}</span>&ndash;&gt;-->
          <!--          </div>-->
        </div>
      </div>
      <div>
        <el-tag effect="dark" size="large"> 上下级</el-tag>
        <br />
        <!-- 可以考虑使用 v-for 遍历人物关系 -->
        <div class="employ-relation">
          <div v-for="item in 3" :key="item" class="employ-relation-detail">
            <img
              :src="EmpolyImg"
              style="width: 60px; height: 60px; border-radius: 30px"
            />
            <br />
            <span>领导：罗通</span>
            <!--            <span>{{ peopleDetail.hierarchy }}</span>-->
          </div>
        </div>
      </div>
      <div>
        <el-tag effect="dark" size="large"> 所属部门</el-tag>
        <br />
        <!-- 可以考虑使用 v-for 遍历人物关系 -->
        <div class="employ-relation" @click="toDepartmentDetail">
          <div class="employ-relation-detail">
            <img
              :src="depart.image"
              style="width: 60px; height: 60px; border-radius: 30px"
            />
            <br />
            <span>{{ depart.name }}</span>
          </div>
        </div>
      </div>
      <!-- TODO: 得把这个 relation 封装成组件 -->
    </div>
    <div
      class="detail-row"
      style="display: flex; flex-wrap: wrap; padding: 10px"
    >
      <div>
        <el-tag effect="dark" size="large"> 相关新闻</el-tag>
        <br />
        <!-- 可以考虑使用 v-for 遍历人物关系 -->
        <div class="employ-relation">
          <div class="employ-relation-detail">
            <img
              src="http://inews.gtimg.com/newsapp_ls/0/14576477631_640330/0"
              style="width: 180px; height: 120px; border-radius: 30px"
            />
            <span>测试新闻标题</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="detail-row"
      style="display: flex; flex-wrap: wrap; padding: 10px"
    >
      <div>
        <el-tag effect="dark" size="large"> 个人经历</el-tag>
        <br />
        <!-- 可以考虑使用 v-for 遍历人物关系 -->
        <div class="employ-relation">
          <div class="employ-relation-detail" style="align-items: flex-start">
            <span style="font-weight: bold">{{ peopleDetail.title }}</span>
            <p class="employ-detail">
              {{ peopleDetail.eventDetails }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <people-dialog
    v-model="isUpdate"
    :form="peopleDetail"
    @close="cancelUpdate"
    @confirm="confirmUpdate"
  />
  <experience-dialog
    v-model="isUpdateExperiences"
    :form="peopleDetail"
    @close="cancelUpdateExperiences"
    @confirm="confirmUpdateExperiences"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  People,
  PeopleDetails,
  Paternity,
  PeopleDetail,
  Department,
  Experiences,
} from "../model/model";
import { FilterNews } from "../model/filter";
import BaseListItem from "../components/BaseListItem.vue";
import { useRouter } from "vue-router";
import { EmpolyImg } from "../utils/constant";
import { usePeopleStore } from "@/store/people";
import { getPeopleDetail } from "@/api/people";
import ContentHeader from "@/components/ContentHeader.vue";
import { useDepartmentStore } from "@/store/department";
import PeopleDialog from "@/components/dialog/PeopleDialog.vue";
import { useUpdate } from "@/mixins/update";
import ExperienceDialog from "@/components/dialog/ExperienceDialog.vue";

const list: People[] = [];

const peopleStore = usePeopleStore();
const people = peopleStore.people;
let peopleDetail = ref<PeopleDetail>(Object.assign({}, people));
list.push(people);
const depart = ref<Department>({} as Department);

const init = async () => {
  const { detail, department } = await getPeopleDetail(people);
  depart.value = department;
  peopleDetail.value = Object.assign({}, peopleDetail, detail);
};
init();

const router = useRouter();
const toDepartmentDetail = () => {
  const departmentStore = useDepartmentStore();
  departmentStore.updateDepartment(depart.value);
  router.push("/departDetail");
};

const { isUpdate, update, confirmUpdate, cancelUpdate } = useUpdate();
const {
  isUpdate: isUpdateExperiences,
  update: updateExperiences,
  confirmUpdate: confirmUpdateExperiences,
  cancelUpdate: cancelUpdateExperiences,
} = useUpdate();
</script>
