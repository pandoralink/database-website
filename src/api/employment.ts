import { Employment } from "@/model/model";
import axios from "@/utils/axios";
import { HttpResponse } from "@/@types/http";

export const insertEmployment = (data: Employment) => {
  return axios({
    url: "/employment/insert",
    method: "post",
    data,
  });
};

export const updateEmployment = (data: Employment) => {
  return axios({
    url: "/employment/update",
    method: "put",
    data,
  });
};

export const deleteEmployment = (ID: string) => {
  return axios({
    url: "/employment/delete",
    method: "delete",
    params: {
      ID,
    },
  });
};

export const searchEmploymentByNumber = (number: string) => {
  return axios({
    url: "employment/selectByNumber",
    method: "get",
    params: {
      number,
    },
  });
};

export const searchEmploymentByPositionNumber = (PositionNumber: string) => {
  return axios({
    url: "/employment/selectByPositionNumber",
    method: "get",
    params: {
      PositionNumber,
    },
  });
};

export const searchEmploymentByDpNUmber = (DpNUmber: string) => {
  return axios({
    url: "/employment/selectByDpNUmber",
    method: "get",
    params: {
      DpNUmber,
    },
  });
};

export const searchEmploymentByEmployPlace = (employPlace: string) => {
  return axios({
    url: "/employment/searchByEmployName",
    method: "get",
    params: {
      employPlace,
    },
  });
};
