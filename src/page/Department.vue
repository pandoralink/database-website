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
    <div class="filter-content" style="margin-top: 10px">
      <!-- 没有选择和 button 一起循环是为了方便扩展 -->
      <el-input
        v-model="filterList.type"
        placeholder="部门"
        v-if="activeFilterOption === 0"
      ></el-input>
      <el-input
        v-model="filterList.id"
        placeholder="编号"
        v-if="activeFilterOption === 1"
      ></el-input>
      <el-input
        v-model="filterList.name"
        placeholder="名称"
        v-if="activeFilterOption === 2"
      ></el-input>
      <el-input
        v-model="filterList.address"
        placeholder="地点"
        v-if="activeFilterOption === 3"
      ></el-input>
    </div>
  </base-filter>
  <div class="base-content">
    <base-list-item
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.image"
      @click-content="toInfoDetail"
    >
      <template #default>
        <!-- 存在 <span> 吞空格的情况 -->
        <span>部门编号:{{ item.id }}</span
        ><br />
        <span>部门类型: {{ item.type }}</span
        ><br />
        <span>部门名称: {{ item.name }}</span
        ><br />
        <span>部门地点: {{ item.location }}</span
        ><br />
        <span>部门职位: {{ item.position }}</span
        ><br />
        <span>联系方式: {{ item.contactInformation }}</span
        ><br />
      </template>
    </base-list-item>
  </div>
  <div id="base-pagination">
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseFilter from "../components/BaseFilter.vue";
import BaseListItem from "../components/BaseListItem.vue";
import { Department } from "../model/model";
import { FilterDepartment } from "../model/filter";
import { useRouter } from "vue-router";

const list: Department[] = [
  {
    name: "社联",
    position: "很高",
    location: "507",
    type: 1,
    id: "0001",
    contactInformation: "10086",
    image:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.mbakswang.com%2Fuploadfile%2F2020%2F0425%2F20200425054659410.jpg&refer=http%3A%2F%2Fwww.mbakswang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644415969&t=c71534513d63c7ee74835957b8ca3478",
  },
];
for (let i = 0; i < 9; i++) {
  list.push(list[0]);
}

const filterOptions: string[] = ["部门", "编号", "名称", "地点"];
const filterList = ref<FilterDepartment>({
  type: undefined,
  name: "",
  address: "",
  id: "",
});
let activeFilterOption = ref(0);
const router = useRouter();

function deleteFilterOption(key: string) {
  // 不知道为什么无法使用 [index] 的方式访问 ref 对象属性
  if (key === "name") {
    filterList.value.name = "";
  } else if (key === "type") {
    filterList.value.type = undefined;
  } else if (key === "address") {
    filterList.value.address = "";
  } else if (key === "id") {
    filterList.value.id = "";
  }
}
function toInfoDetail(index: number) {
  router.push("/departDetail");
}
</script>
