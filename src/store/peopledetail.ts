import { Hierarchy, People, Spouse } from "@/model/model";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 上下级信息的 store
 */
export const usePeopleDetailStore = defineStore("Hierarchy", () => {
  const hierarchy = ref<Hierarchy[]>([]);
  const updateHierarchy = (data: Hierarchy[]) => {
    hierarchy.value = data;
  };
  // people 对应的上下级
  const people = ref({} as People);
  const updatePeople = (data: People) => {
    people.value = data;
  };
  // type 无需修改 上级/下级
  const type = ref<"sup" | "sub">("sup");
  const updateType = (value: "sup" | "sub") => {
    type.value = value;
  };
  return {
    hierarchy,
    updateHierarchy,
    people,
    updatePeople,
    type,
    updateType,
  };
});
