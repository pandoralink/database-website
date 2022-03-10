import { Paternity } from "@/model/model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePaternityStore = defineStore("Paternity", () => {
  const paternity = ref<Paternity[]>([]);
  const updatePaternity = (data: Paternity[]) => {
    paternity.value = data;
  };

  return { paternity, updatePaternity };
});
