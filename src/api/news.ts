import axios from "@/utils/axios";

// TODO: 新闻部分有重复数据
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

export const getMilitaryNewsByTitle = (title: string) => {
  return axios({
    url: "/MilitaryNews/getByTitle",
    method: "get",
    params: {
      title,
    },
  });
};

export const getMilitaryNewsByDetails = (details: string) => {
  return axios({
    url: "/MilitaryNews/getByDetails",
    method: "get",
    params: {
      details,
    },
  });
};

export const getMilitaryNewsByTime = (time: string) => {
  return axios({
    url: "/MilitaryNews/getByDetails",
    method: "get",
    params: {
      time,
    },
  });
};
