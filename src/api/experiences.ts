import { Experiences } from "@/model/model";
import axios from "@/utils/axios";

export const insertExperiences = (data: Experiences) => {
  return axios({
    url: "/experiences/insert",
    method: "post",
    data,
  });
};

export const updateExperiences = (data: Experiences) => {
  return axios({
    url: "/physiological/update",
    method: "put",
    data,
  });
};

export const deleteExperiences = (ID: string) => {
  return axios({
    url: "/ experiences /delete",
    method: "delete",
    params: {
      ID,
    },
  });
};

export const searchExperiencesByNumber = (number: string) => {
  return axios({
    url: "/experiences/get",
    method: "get",
    params: {
      number,
    },
  });
};

export const searchExperiencesByNameLike = (name: string) => {
  return axios({
    url: "/experiences/like",
    method: "get",
    params: {
      name,
    },
  });
};
