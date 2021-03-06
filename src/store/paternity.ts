import { Paternity, People } from "@/model/model";
import { defineStore } from "pinia";
import { ref } from "vue";

// 子女的 store
export const usePaternityStore = defineStore("Paternity", () => {
  const paternity = ref<Paternity[]>([]);
  const updatePaternity = (data: Paternity[]) => {
    paternity.value = data;
  };
  const people = ref({} as People);
  const updatePeople = (data: People) => {
    people.value = data;
  };
  const type = ref<"parent" | "children">("parent");
  const updateType = (value: "parent" | "children") => {
    type.value = value;
  };

  return {
    paternity,
    updatePaternity,
    people,
    updatePeople,
    type,
    updateType,
  };
});
