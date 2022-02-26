import { Experiences } from "../../database-website-main（1）/database-website-main/src/model/model";
import axios from "../../database-website-main（1）/database-website-main/src/utils/axios";

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

export const searchExperiencesByNuber = (number: string) => {
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
