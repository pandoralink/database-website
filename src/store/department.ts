import { Department } from "@/model/model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDepartmentStore = defineStore("department", () => {
  const department = ref<Department>({} as Department);
  const updateDepartment = (data: Department) => {
    department.value = data;
  };

  return { department, updateDepartment };
});
