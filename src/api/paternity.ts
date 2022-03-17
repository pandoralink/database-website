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
    data,
  });
};

// FIXME: 应该由父子双方 ID 删除
export const deletePaternity = (CID: string, FID: string) => {
  return axios({
    url: "/paternity/delete",
    method: "delete",
    params: {
      CID,
      FID,
    },
  });
};

export const searchPaternityByFId = (Fnumber: string) => {
  return axios({
    url: "/paternity/selectFID",
    method: "get",
    params: {
      Fnumber,
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
