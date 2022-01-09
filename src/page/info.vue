<template>
  <base-filter></base-filter>
  <base-list-item
    v-for="(item, index) in list"
    :key="index"
    :index="1"
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
</template>

<script setup lang="ts">
import BaseFilter from "../components/BaseFilter.vue";
import BaseListItem from "../components/BaseListItem.vue";
import { People } from "../model/model";

const list = [
  {
    name: "罗通",
    age: 21,
    nationality: "中国",
    images:
      "https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505",
    number: 372523198009045752,
    parties: "中国共产党",
    education: "本科",
  },
];
</script>
