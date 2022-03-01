import axios from "@/utils/axios";
import { Employment, People, PeopleDetail } from "@/model/model";
import { searchPaternityByFId } from "@/api/paternity";
import { searchEmploymentByNumber } from "@/api/employment";
import { getDepartmentByNumber } from "@/api/department";

export const getPeopleListTotal = () => {
  return axios({
    url: "/people/total",
    method: "get",
  });
};

export const insertPeople = (data: People) => {
  return axios({
    url: "/people/insert",
    method: "post",
    data,
  });
};

export const deletePeople = (number: string) => {
  return axios({
    url: "/people/delete",
    method: "delete",
    params: {
      number,
    },
  });
};

export const getPeopleList = (num: number) => {
  return axios({
    url: "/people/list",
    method: "get",
    params: {
      num,
    },
  });
};

export const getPeopleByName = (name: string) => {
  return axios({
    url: "/people/like",
    method: "get",
    params: {
      name,
    },
  });
};

// TODO: 输入错误的 number 会出现奇怪的错误，比如 1002
export const getPeopleById = (number: string) => {
  return axios({
    url: "/people/get",
    method: "get",
    params: {
      number,
    },
  });
};

export const getPeopleEventDetailsById = (number: string) => {
  return axios({
    url: "/experiences/get",
    method: "get",
    params: {
      number,
    },
  });
};

// TODO: 疑似没有提供给单个 people 找部门的功能
export const getPeopleDepartmentsById = (number: string) => {
  return axios({
    url: "/department/selectByNumber",
    method: "get",
    params: {
      number,
    },
  });
};

// TODO: 该 API 有问题, 状态码 500
export const getPeopleSpouseById = (ID: string) => {
  return axios({
    url: "/spouse/selectTID",
    method: "get",
    params: {
      ID,
    },
  });
};

// TODO: 该 API 有问题
export const getPeopleFatherById = (Cnumber: string) => {
  return axios({
    url: "/spouse/selectTID",
    method: "get",
    params: {
      Cnumber,
    },
  });
};

// TODO: 该 API 有问题
export const getPeopleSonById = (Fnumber: string) => {
  return axios({
    url: "/spouse/selectTID",
    method: "get",
    params: {
      Fnumber,
    },
  });
};

export const getPeopleDetail = async (people: People) => {
  // const { data } = await searchPaternityByFId(id);
  const { data: employment } = await searchEmploymentByNumber(people.number);
  const employ = employment as Employment;
  const { data: department } = await getDepartmentByNumber(employ.dpNUmber);
  return {
    peopleDetail: Object.assign(
      {},
      people,
      employment as Employment
    ) as PeopleDetail,
    department: department,
  };
};
