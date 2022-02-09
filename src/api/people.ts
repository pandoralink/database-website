import axios from "@/utils/axios";
import { People } from "@/model/model";

export const addPeople = (data: People) => {
  return axios({
    url: "/people/insert",
    method: "post",
    data,
  });
};

export const getPeopleList = (num: number) => {
  return axios({
    url: "/people/list",
    method: "get",
    params: {
      num,
    },
  });
};

export const getPeopleByName = (name: string) => {
  return axios({
    url: "/people/like",
    method: "get",
    params: {
      name,
    },
  });
};

export const getPeopleById = (number: string) => {
  return axios({
    url: "/people/get",
    method: "get",
    params: {
      number,
    },
  });
};
