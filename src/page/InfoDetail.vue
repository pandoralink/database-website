<template>
  <content-header
    :show-filter="false"
    :show-del="false"
    :show-ins="false"
    :show-update="true"
  />
  <div class="base-content new">
    <!-- 左边距统一为 20px -->
    <base-list-item
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
    <!--    TODO: 不适合使用固定列-->
    <el-row style="padding: 10px">
      <el-col :span="8">
        <div>
          <el-tag effect="dark" size="large"> 人物关系</el-tag>
          <br />
          <!-- 可以考虑使用 v-for 遍历人物关系 -->
          <div class="empoly-relation">
            <div
              class="empoly-relation-detail"
              v-for="(item, index) in peopleDetails.son"
              :key="index"
            >
              <img
                :src="EmpolyImg"
                style="width: 60px; height: 60px; border-radius: 30px"
              />
              <br />
              <!--          <span>{{ "子女：" + item.cname }}</span>-->
            </div>
            <div class="empoly-relation-detail">
              <img
                :src="EmpolyImg"
                style="width: 60px; height: 60px; border-radius: 30px"
              />
              <br />
              <!--          <span>{{ "配偶：" + peopleDetails.spouse }}</span>-->
            </div>
            <div class="empoly-relation-detail">
              <img
                :src="EmpolyImg"
                style="width: 60px; height: 60px; border-radius: 30px"
              />
              <br />
              <!--          <span>{{ "父亲：" + peopleDetails.father.fname }}</span>-->
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <el-tag effect="dark" size="large"> 上下级</el-tag>
          <br />
          <!-- 可以考虑使用 v-for 遍历人物关系 -->
          <div v-for="item in 5" :key="item" class="empoly-relation">
            <div class="empoly-relation-detail">
              <img
                :src="EmpolyImg"
                style="width: 60px; height: 60px; border-radius: 30px"
              />
              <br />
              <span>{{ peopleDetails.hierarchy }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <el-tag effect="dark" size="large"> 所属部门</el-tag>
          <br />
          <!-- 可以考虑使用 v-for 遍历人物关系 -->
          <div class="empoly-relation" @click="toDepartmentDetail">
            <div class="empoly-relation-detail">
              <img
                :src="depart.image"
                style="width: 60px; height: 60px; border-radius: 30px"
              />
              <br />
              <span>{{ depart.name }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8"
        ><!-- 得把这个 relation 封装成组件 -->
        <div>
          <el-tag effect="dark" size="large"> 个人经历</el-tag>
          <br />
          <!-- 可以考虑使用 v-for 遍历人物关系 -->
          <div class="empoly-relation">
            <div class="empoly-relation-detail">
              <p class="empoly-detail">
                {{ peopleDetails.eventDetails }}
              </p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  People,
  PeopleDetails,
  Paternity,
  PeopleDetail,
  Department,
} from "../model/model";
import { FilterNews } from "../model/filter";
import BaseListItem from "../components/BaseListItem.vue";
import { useRouter } from "vue-router";
import { EmpolyImg } from "../utils/constant";
import { usePeopleStore } from "@/store/people";
import {
  getPeopleDepartmentsById,
  getPeopleDetail,
  getPeopleEventDetailsById,
  getPeopleFatherById,
  getPeopleSonById,
  getPeopleSpouseById,
} from "@/api/people";
import ContentHeader from "@/components/ContentHeader.vue";
import { useDepartmentStore } from "@/store/department";

const list: People[] = [];

const peopleStore = usePeopleStore();
const people = peopleStore.people;
const peopleDetails: PeopleDetail = people;
list.push(people);
const depart = ref<Department>({} as Department);

const init = async () => {
  const { peopleDetail, department } = await getPeopleDetail(people);
  depart.value = department;
};
init();

const router = useRouter();
const toDepartmentDetail = () => {
  const departmentStore = useDepartmentStore();
  departmentStore.updateDepartment(depart.value);
  router.push("/departDetail");
};
</script>
