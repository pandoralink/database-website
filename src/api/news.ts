import axios from "@/utils/axios";

export const getNewList = (num: number) => {
  return axios({
    url: "/MilitaryNews/list",
    method: "get",
    params: {
      num,
    },
  });
};

export const getPoliticalNewsList = (num: number) => {
  return axios({
    url: "/politicalNews/list",
    method: "get",
    params: {
      num,
    },
  });
};
