import { Bug } from "@/model/model";
import axios from "@/utils/axios";
import { HttpResponse } from "@/@types/http";

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

export const getReptileListTotal = () => {
  return axios({
    url: "/Reptile/total",
    method: "get",
  });
};

export const searchBugByAuthor = (auther: string): Promise<HttpResponse> => {
  return axios({
    url: "/Reptile/auther",
    method: "get",
    params: {
      auther,
    },
  });
};

// BUG: SQL 错误？
export const insertBug = (data: Bug) => {
  return axios({
    url: "/Reptile/insert",
    method: "post",
    data,
  });
};

export const updateBug = (data: Bug) => {
  return axios({
    url: "/Reptile/update",
    method: "put",
    data,
  });
};

/**
 * 修改爬虫运行状态
 * @param data
 */
export const updateBugState = (data: Bug) => {
  return axios({
    url: "/Reptile/update",
    method: "put",
    data,
  });
};

export const deleteBug = (url: string) => {
  return axios({
    url: "/Reptile/delete",
    method: "delete",
    params: {
      url,
    },
  });
};
