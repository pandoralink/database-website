import axios from "@/utils/axios";

// TODO: 失效, 状态码: 500
export const getMilitaryEquipmentList = (auther: string) => {
  return axios({
    url: "/Reptile/get",
    method: "get",
    params: {
      auther,
    },
  });
};