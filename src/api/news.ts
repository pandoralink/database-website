import axios from "@/utils/axios";
import { People } from "@/model/model";

export const getNewList = (num: number) => {
  return axios({
    url: "/MilitaryNews/list",
    method: "get",
    params: {
      num,
    },
  });
};