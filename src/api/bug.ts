import axios from "@/utils/axios";

// TODO: 只能通过 name 来查询，没有批量返回
export const getBugList = (auther: string) => {
  return axios({
    url: "/Reptile/get",
    method: "get",
    params: {
      auther,
    },
  });
};