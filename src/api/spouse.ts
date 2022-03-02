import { Spouse } from "@/model/model";
import axios from "@/utils/axios";

export const insertSpouse = (data: Spouse) => {
  return axios({
    url: "/spouse/insertSpouse",
    method: "post",
    data,
  });
};

export const updateSpouse = (data: Spouse) => {
  return axios({
    url: "/spouse/updateSpouse",
    method: "put",
    data,
  });
};

export const deleteSpouse = (ID: string) => {
  return axios({
    url: "/spouse/deleteSpouse",
    method: "delete",
    params: {
      ID,
    },
  });
};

export const searchSpouseByTId = (ID: string) => {
  return axios({
    url: "/spouse/selectTID",
    method: "get",
    params: {
      ID,
    },
  });
};

export const searchSpouseByMID = (MIDnumber: string) => {
  return axios({
    url: "/spouse/selectMID",
    method: "get",
    params: {
      MIDnumber,
    },
  });
};

export const searchSpouseByMname = (Mname: string) => {
  return axios({
    url: "/selectName",
    method: "get",
    params: {
      Mname,
    },
  });
};

export const searchSpouseByWname = (Wname: string) => {
  return axios({
    url: "/selectName",
    method: "get",
    params: {
      Wname,
    },
  });
};
