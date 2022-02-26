import { Physiological } from "../../database-website-main（1）/database-website-main/src/model/model";
import axios from "../../database-website-main（1）/database-website-main/src/utils/axios";

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
