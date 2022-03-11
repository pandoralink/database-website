import axios from "@/utils/axios";
import { User } from "@/@types/model";

// TODO: 务必加上 session
export const login = (user: User) => {
  return axios({
    url: "/user/login",
    method: "post",
    data: user,
  });
};

export const register = (user: User) => {
  return axios({
    url: "/user/register",
    method: "post",
    data: user,
  });
};
