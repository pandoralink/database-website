import { MilitaryEquipment } from "@/model/model";
import { defineStore } from "pinia";

export const useMilitaryEquipmentStore = defineStore({
  id: "militaryEquipment",
  state: () => {
    return {
      militaryEquipment: {} as MilitaryEquipment,
    };
  },
  actions: {
    updateMilitaryEquipment(militaryEquipment: MilitaryEquipment) {
      this.militaryEquipment = militaryEquipment;
    },
  },
});
