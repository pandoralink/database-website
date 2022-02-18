import axios from "@/utils/axios";
import { MilitaryEquipment } from "@/model/model";

// FIXME: 每次都返回一样的数据
export const getMilitaryEquipmentList = (num: number) => {
  return axios({
    url: "/militaryEquipment/list",
    method: "get",
    params: {
      num,
    },
  });
};

export const insertMilitaryEquipment = (data: MilitaryEquipment) => {
  return axios({
    url: "/militaryEquipment/insert",
    method: "post",
    data,
  });
};

export const deleteMilitaryEquipment = (number: string) => {
  return axios({
    url: "/militaryEquipment/delete",
    method: "delete",
    params: {
      number,
    },
  });
};

export const selectMilitaryEquipment = (DpNumber: string) => {
  return axios({
    url: "/militaryEquipment/selectByDpNumber",
    method: "get",
    params: {
      DpNumber,
    },
  });
};

export const selectMilitaryEquipmentByDpNumber = (DpNumber: string) => {
  return axios({
    url: "/militaryEquipment/selectByDpNumber",
    method: "get",
    params: {
      DpNumber,
    },
  });
};

export const selectMilitaryEquipmentByName = (name: string) => {
  return axios({
    url: "/militaryEquipment/searchByName",
    method: "get",
    params: {
      name,
    },
  });
};

export const selectMilitaryEquipmentByLocation = (location: string) => {
  return axios({
    url: "/militaryEquipment/searchByLocation",
    method: "get",
    params: {
      location,
    },
  });
};
