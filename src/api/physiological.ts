import { Physiological } from "@/model/model";
import axios from "@/utils/axios";

export const insertPhysiological = (data: Physiological) => {
  return axios({
    url: "/physiological/insert",
    method: "post",
    data,
  });
};

export const updatePhysiological = (data: Physiological) => {
  return axios({
    url: "/physiological/update",
    method: "put",
    data,
  });
};

export const deletephysiological = (ID: string) => {
  return axios({
    url: "/physiological/delete",
    method: "delete",
    params: {
      ID,
    },
  });
};

export const searchSpouseByTId = (number: string) => {
  return axios({
    url: "/physiological/get",
    method: "get",
    params: {
      number,
    },
  });
};

export const searchSpouseByNameLike = (name: string) => {
  return axios({
    url: "/physiological/like",
    method: "get",
    params: {
      name,
    },
  });
};
