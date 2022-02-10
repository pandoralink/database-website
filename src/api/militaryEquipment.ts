import axios from "@/utils/axios";
import { People } from "@/model/model";

export const getMilitaryEquipmentList = (num: number) => {
  return axios({
    url: "/militaryEquipment/list",
    method: "get",
    params: {
      num,
    },
  });
};