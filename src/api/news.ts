import axios from "@/utils/axios";
import { News } from "../model/model";

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

// BUG: 后端没有对字段做校验，不知道哪些是必填项，导致插入后存在 url 为 NULL 的数据，无法删除
export const insertMilitaryNews = (data: News) => {
  return axios({
    url: "/MilitaryNews/insert",
    method: "post",
    data,
  });
};

export const deleteMilitaryNews = (url: string) => {
  return axios({
    url: "/MilitaryNews/delete",
    method: "delete",
    params: {
      url,
    },
  });
};

export const updateMilitaryNews = (data: News) => {
  return axios({
    url: "/MilitaryNews/update",
    method: "put",
    data,
  });
};

// TODO: 新闻部分有重复数据
export const getPoliticalNewsList = (num: number) => {
  return axios({
    url: "/politicalNews/list",
    method: "get",
    params: {
      num,
    },
  });
};

// BUG: 后端没有对字段做校验，不知道哪些是必填项，导致插入后存在 url 为 NULL 的数据，无法删除
export const insertPoliticalNews = (data: News) => {
  return axios({
    url: "/politicalNews/insert",
    method: "post",
    data,
  });
};

export const deletePoliticalNews = (url: string) => {
  return axios({
    url: "/politicalNews/delete",
    method: "delete",
    params: {
      url,
    },
  });
};

export const updatePoliticalNews = (data: News) => {
  return axios({
    url: "/politicalNews/update",
    method: "put",
    data,
  });
};

export const getPoliticalNewsByTitle = (title: string) => {
  return axios({
    url: "/politicalNews/getByTitle",
    method: "get",
    params: {
      title,
    },
  });
};

export const getPoliticalNewsByDetails = (details: string) => {
  return axios({
    url: "/politicalNews/getByDetails",
    method: "get",
    params: {
      details,
    },
  });
};

export const getPoliticalNewsByTime = (time: string) => {
  return axios({
    url: "/politicalNews/getByDetails",
    method: "get",
    params: {
      time,
    },
  });
};
