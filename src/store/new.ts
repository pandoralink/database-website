import { defineStore } from "pinia";

export const useNewsStore = defineStore({
  id: "militaryEquipment",
  state: () => {
    return {
      url: "",
    };
  },
  actions: {
    updateNewsUrl(url: string) {
      this.url = url;
    },
  },
});
