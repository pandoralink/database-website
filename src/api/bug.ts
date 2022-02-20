import axios from "@/utils/axios";

// TODO: 只能通过 name 来查询，没有批量返回
export const getBugList = (num: number) => {
  return axios({
    url: "/Reptile/list",
    method: "get",
    params: {
      num,
    },
  });
};

export const searchBugByAuthor = (auther: string) => {
  return axios({
    url: "/Reptile/auther",
    method: "get",
    params: {
      auther,
    },
  });
};