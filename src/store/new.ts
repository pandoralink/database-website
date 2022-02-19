import { News } from "@/model/model";
import { NewsType } from "@/types";
import { defineStore } from "pinia";

export const useNewsStore = defineStore({
  id: "news",
  state: () => {
    return {
      url: "",
      form: {} as News,
      updateType: NewsType.MILITARY | NewsType.POLITICAL,
    };
  },
  actions: {
    updateNewsUrl(url: string) {
      this.url = url;
    },
    updateForm(form: News, type: NewsType.MILITARY | NewsType.POLITICAL) {
      this.form = form;
      this.updateType = type;
    },
  },
});
