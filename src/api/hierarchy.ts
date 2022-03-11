import { Hierarchy } from "@/model/model";
import axios from "@/utils/axios";

export const insertHierarchy = (data: Hierarchy) => {
  return axios({
    url: "/hierarchy/insert",
    method: "post",
    data,
  });
};

export const updateHierarchy = (data: Hierarchy) => {
  return axios({
    url: "/hierarchy/update",
    method: "put",
    data,
  });
};

export const deletepHierarchy = (
  SuperIDnumber: string,
  SubordIDnumber: string
) => {
  return axios({
    url: "/hierarchy/delete",
    method: "delete",
    params: {
      SuperIDnumber,
      SubordIDnumber,
    },
  });
};

export const deletepHierarchyByID = (ID: string) => {
  return axios({
    url: "/hierarchy/deleteALL",
    method: "delete",
    params: {
      ID,
    },
  });
};

export const deletepHierarchyBySuperID = (SuperID: string) => {
  return axios({
    url: "/hierarchy/deleteSuper",
    method: "delete",
    params: {
      SuperID,
    },
  });
};

export const deletepHierarchyBySubordID = (SubordID: string) => {
  return axios({
    url: "/hierarchy/deleteSubord",
    method: "delete",
    params: {
      SubordID,
    },
  });
};

export const searchHierarchyByOId = (ID: string) => {
  return axios({
    url: "hierarchy/hierarchy/selectOID",
    method: "get",
    params: {
      ID,
    },
  });
};

export const searchHierarchyBySuperId = (SuperID: string) => {
  return axios({
    url: "/hierarchy/selectOIDSuper",
    method: "get",
    params: {
      SuperID,
    },
  });
};

export const searchHierarchyBySubordId = (SubordID: string) => {
  return axios({
    url: "/hierarchy/selectOIDSubord",
    method: "get",
    params: {
      SubordID,
    },
  });
};

export const searchHierarchyByTId = (SuperdID: string, SubordID: string) => {
  return axios({
    url: "/hierarchy/selectOIDSubord",
    method: "get",
    params: {
      SuperdID,
      SubordID,
    },
  });
};

export const searchHierarchyByName = (nameO: string) => {
  return axios({
    url: "/hierarchy/selectNameO",
    method: "get",
    params: {
      nameO,
    },
  });
};
