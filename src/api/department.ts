import axios from "@/utils/axios";
import { People } from "@/model/model";

export const getDepartmentList = (num: number) => {
  return axios({
    url: "/department/list",
    method: "get",
    params: {
      num,
    },
  });
};