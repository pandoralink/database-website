import { Paternity } from "@/model/model";
import axios from "@/utils/axios";

export const insertPaternity = (data: Paternity) => {
  return axios({
    url: "/paternity/insert",
    method: "post",
    data,
  });
};

export const updatePaternity = (data: Paternity) => {
  return axios({
    url: "/paternity/update",
    method: "put",
    data
  });
};

export const deletePaternity = (ID: string) => {
  return axios({
    url: "/paternity/delete",
    method: "delete",
    params: {
      ID,
    },
  });
};

export const searchPaternityByFId = (FID: string) => {
  return axios({
    url: "/paternity/selectFID",
    method: "get",
    params: {
      FID,
    },
  });
};

export const searchPaternityByName = (name: string) => {
  return axios({
    url: "/paternity/selectName",
    method: "get",
    params: {
      name,
    },
  });
};