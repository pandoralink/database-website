import { Spouse } from "@/model/model";
import { defineStore } from "pinia";
import { ref } from "vue";

// TODO: 可以考虑将 PeopleDetail 中相关的信息集中统一管理
export const useSpouseStore = defineStore("spouse", () => {
  const spouse = ref<Spouse[]>([]);
  const updateSpouse = (data: Spouse[]) => {
    spouse.value = data;
  };

  // spouseName, 为个人信息中的名称
  const spouseName = ref("");
  const updateSpouseName = (name: string) => {
    spouseName.value = name;
  };

  return { spouse, spouseName, updateSpouse, updateSpouseName };
});
