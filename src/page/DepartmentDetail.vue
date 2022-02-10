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
    <el-button @click="changeDataType(0)" type="primary"> 成员列表 </el-button>
    <el-button @click="changeDataType(1)" type="primary"> 武器库 </el-button>
    <base-list-item
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.image"
      @click-content="toInfoDetail"
    >
      <template #default>
        <template v-if="dataType === 0">
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
        <template v-if="dataType === 1">
          <span>名称: {{ item.name }}</span
          ><br />
          <span>编号: {{ item.number }}</span
          ><br />
          <span>功能: {{ item.function }}</span
          ><br />
          <span>部署地点: {{ item.location }}</span
          ><br />
          <span>所属部门编号: {{ item.dpNumber }}</span
          ><br />
        </template>
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
import { MilitaryEquipment, People, DepartmentDataType } from "../model/model";
import { FilterDepartment } from "../model/filter";

const empoly = {
  name: "罗通",
  age: 21,
  nationality: "中国",
  image:
    "https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505",
  number: "372523198009045752",
  parties: "中国共产党",
  education: "本科",
};
const equipment = {
  name: "巴雷特M82A1",
  id: "0001",
  features: "开炮！",
  details: "连发狙击枪",
  location: "10#507",
  dpNumber: "0001",
  image:
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbkimg.cdn.bcebos.com%2Fpic%2F9345d688d43f87943d5954f4dc1b0ef41ad53a41&refer=http%3A%2F%2Fbkimg.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644416765&t=7cbbd4b4ff1b260b0b342bd4891cec35",
};
const empolyFilterOptions = ["部门", "时间", "身份证", "职位"];
const equipmentFilterOptions = [];
let list = ref<MilitaryEquipment[] | People[]>([empoly]);
for (let i = 0; i < 9; i++) {
  list.value.push(list.value[0]);
}

const filterOptions: string[] = empolyFilterOptions;
const filterList = ref<FilterDepartment>({
  type: undefined,
  name: "",
  address: "",
  id: "",
});
let activeFilterOption = ref(0);
let dataType = ref<DepartmentDataType>(0);

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
  console.log(index);
}

/**
 * 切换数据类型，0 为成员列表
 * 1 为武器库
 * @param type number
 */
function changeDataType(type: number) {
  dataType.value = type as DepartmentDataType;
  if (type === DepartmentDataType.people) {
    list.value = [empoly];
  } else if (type === DepartmentDataType.equipment) {
    list.value = [equipment];
  }
  for (let i = 0; i < 9; i++) {
    list.value.push(list.value[0]);
  }
}
</script>
