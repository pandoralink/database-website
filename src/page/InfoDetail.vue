<template>
  <base-filter :show-text-list="filterList" @delete="deleteFilterOption">
    <div class="filter-content">
      <el-button
        class="filter-content-button"
        v-for="(item, index) in filterOptions"
        :key="item"
        @click="activeFilterOption = index"
        :class="{ active: activeFilterOption === index }"
      >
        {{ item }}
      </el-button>
    </div>
    <div class="filter-content" style="margin-top: 10px"></div>
  </base-filter>
  <div class="base-content new">
    <!-- 左边距统一为 20px -->
    <base-list-item
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.image"
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
    <div style="margin-left: 20px">
      <el-tag effect="dark" size="large"> 人物关系 </el-tag>
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
          <span>{{ "子女：" + item.cname }}</span>
        </div>
        <div class="empoly-relation-detail">
          <img
            :src="EmpolyImg"
            style="width: 60px; height: 60px; border-radius: 30px"
          />
          <br />
          <span>{{ "配偶：" + peopleDetails.spouse }}</span>
        </div>
        <div class="empoly-relation-detail">
          <img
            :src="EmpolyImg"
            style="width: 60px; height: 60px; border-radius: 30px"
          />
          <br />
          <span>{{ "父亲：" + peopleDetails.father.fname }}</span>
        </div>
      </div>
    </div>
    <div style="margin: 10px 0 0 20px">
      <el-tag effect="dark" size="large"> 上下级 </el-tag>
      <br />
      <!-- 可以考虑使用 v-for 遍历人物关系 -->
      <div class="empoly-relation">
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
    <div style="margin: 10px 0 0 20px">
      <el-tag effect="dark" size="large"> 所属部门 </el-tag>
      <br />
      <!-- 可以考虑使用 v-for 遍历人物关系 -->
      <div class="empoly-relation">
        <div class="empoly-relation-detail">
          <span>{{ peopleDetails.department }}</span>
        </div>
      </div>
    </div>
    <!-- 得把这个 relation 封装成组件 -->
    <div style="margin: 10px 0 0 20px">
      <el-tag effect="dark" size="large"> 个人经历 </el-tag>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseFilter from "../components/BaseFilter.vue";
import { People, PeopleDetails, Paternity } from "../model/model";
import { FilterNews } from "../model/filter";
import BaseListItem from "../components/BaseListItem.vue";
import { useRouter } from "vue-router";
import { EmpolyImg } from "../utils/constant";
import { usePeopleStore } from "@/store/people";
import {
  getPeopleDepartmentsById,
  getPeopleEventDetailsById,
  getPeopleFatherById,
  getPeopleSonById,
  getPeopleSpouseById,
} from "@/api/people";

const list: People[] = [];

const filterOptions: string[] = ["姓名", "时间"];
const filterList = ref<FilterNews>({
  name: "",
  time: "",
});
let activeFilterOption = ref(0);

function deleteFilterOption(key: string) {
  if (key === "name") {
    filterList.value.name = "";
  } else if (key === "time") {
    filterList.value.time = "";
  }
}

const peopleStore = usePeopleStore();
const people = peopleStore.people;
const peopleDetails: PeopleDetails = Object.assign(people, {
  eventDetails: "",
  department: "",
  hierarchy: "",
  father: {} as Paternity,
  son: [],
  spouse: "",
});
list.push(people);

const init = async () => {
  const { data: eventDetails } = await getPeopleEventDetailsById(people.number);
  // const { data: department } = await getPeopleDepartmentsById(people.number);
  // const { data: spouse } = await getPeopleSpouseById(people.number);
  // const { data: son } = await getPeopleFatherById(people.number);
  // const { data: father } = await getPeopleSonById(people.number);
  peopleDetails.eventDetails = eventDetails.eventDetails;
  // peopleDetails.department = department.department;
  // peopleDetails.spouse =
  //   spouse.wname === peopleDetails.name ? spouse.mname : spouse.wname;
  // peopleDetails.father = father as Paternity;
  // peopleDetails.son = son as Paternity[];
};
init();
</script>
