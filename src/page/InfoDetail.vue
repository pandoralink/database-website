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
      <el-tag type="primary" effect="dark" size="large"> 人物关系 </el-tag>
      <br />
      <!-- 可以考虑使用 v-for 遍历人物关系 -->
      <div class="empoly-relation">
        <div class="empoly-relation-detail">
          <img
            :src="EmpolyImg"
            style="width: 60px; height: 60px; border-radius: 30px"
          />
          <br />
          <span>儿子 罗小通</span>
        </div>
        <div class="empoly-relation-detail">
          <img
            :src="EmpolyImg"
            style="width: 60px; height: 60px; border-radius: 30px"
          />
          <br />
          <span>妻子 罗通的妻子</span>
        </div>
        <div class="empoly-relation-detail">
          <img
            :src="EmpolyImg"
            style="width: 60px; height: 60px; border-radius: 30px"
          />
          <br />
          <span>父亲 罗通他爸</span>
        </div>
      </div>
    </div>
    <div style="margin: 10px 0 0 20px">
      <el-tag type="primary" effect="dark" size="large"> 上下级 </el-tag>
      <br />
      <!-- 可以考虑使用 v-for 遍历人物关系 -->
      <div class="empoly-relation">
        <div class="empoly-relation-detail">
          <img
            :src="EmpolyImg"
            style="width: 60px; height: 60px; border-radius: 30px"
          />
          <br />
          <span>联系人 梁祖豪</span>
        </div>
      </div>
    </div>
    <div style="margin: 10px 0 0 20px">
      <el-tag type="primary" effect="dark" size="large"> 所属部门 </el-tag>
      <br />
      <!-- 可以考虑使用 v-for 遍历人物关系 -->
      <div class="empoly-relation">
        <div class="empoly-relation-detail">
          <span>大日本 + 军统</span>
        </div>
      </div>
    </div>
    <!-- 得把这个 relation 封装成组件 -->
    <div style="margin: 10px 0 0 20px">
      <el-tag type="primary" effect="dark" size="large"> 所属部门 </el-tag>
      <br />
      <!-- 可以考虑使用 v-for 遍历人物关系 -->
      <div class="empoly-relation">
        <div class="empoly-relation-detail">
          <p class="empoly-detail">
            鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯鸡汤来咯
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseFilter from "../components/BaseFilter.vue";
import { People } from "../model/model";
import { FilterNew } from "../model/filter";
import BaseListItem from "../components/BaseListItem.vue";
import { useRouter } from "vue-router";
import { EmpolyImg } from "../utils/constant";

const list = [
  {
    name: "罗通",
    age: 21,
    nationality: "中国",
    image:
      "https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505",
    number: 372523198009045752,
    parties: "中国共产党",
    education: "本科",
  },
];

const filterOptions: string[] = ["姓名", "时间"];
const filterList = ref<FilterNew>({
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
</script>
