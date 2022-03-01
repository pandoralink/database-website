import axios from "@/utils/axios";
import { Department } from "@/model/model";

export const getDepartmentList = (num: number) => {
  return axios({
    url: "/department/list",
    method: "get",
    params: {
      num,
    },
  });
};

export const getDepartmentListTotal = () => {
  return axios({
    url: "/department/total",
    method: "get",
  });
};

export const getDepartmentByNumber = (number: string) => {
  return axios({
    url: "/department/selectByNumber",
    method: "get",
    params: {
      number,
    },
  });
};

export const getDepartmentByName = (name: string) => {
  return axios({
    url: "/department/searchByName",
    method: "get",
    params: {
      name,
    },
  });
};

export const getDepartmentByPosition = (position: string) => {
  return axios({
    url: "/department/searchByPosition",
    method: "get",
    params: {
      position,
    },
  });
};

export const getDepartmentByLocation = (location: string) => {
  return axios({
    url: "/department/searchByLocation",
    method: "get",
    params: {
      location,
    },
  });
};

export const insertDepartment = (data: Department) => {
  return axios({
    url: "/department/insert",
    method: "post",
    data,
  });
};

export const deleteDepartment = (number: string) => {
  return axios({
    url: "/department/delete",
    method: "delete",
    params: {
      number,
    },
  });
};

export const updateDepartment = (data: Department) => {
  return axios({
    url: "/department/update",
    method: "put",
    data,
  });
};
