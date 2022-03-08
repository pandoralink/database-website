import axios from "@/utils/axios";
import {
  Employment,
  Experiences,
  Hierarchy,
  Paternity,
  People,
  PeopleDetail,
  Spouse,
} from "@/model/model";
import { searchPaternityByFId } from "@/api/paternity";
import { searchEmploymentByNumber } from "@/api/employment";
import { getDepartmentByNumber } from "@/api/department";
import { searchExperiencesByNumber } from "@/api/experiences";
import { toArray } from "@/utils/filter";

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

export const getPeopleRelationship = (number: string) => {
  return axios({
    url: "/people/getRelationship",
    method: "get",
    params: {
      number,
    },
  });
};

/**
 * SupHierarchy: 上级人物
 * SubHierarchy: 下级人物
 * CPaternity:子女
 * FPaternity: 父母
 * Spouse: 配偶
 */
interface Relationship {
  SupHierarchy: Hierarchy[];
  SubHierarchy: Hierarchy[];
  CPaternity: Paternity[];
  FPaternity: Paternity;
  Spouse: Spouse[];
}

interface Relation {
  sup: People[];
  sub: People[];
  cPaternity: People[];
  fPaternity: People | null;
  spouse: People[];
}

export const getPeopleDetail = async (people: People) => {
  const res: Relation = {
    sup: [],
    sub: [],
    cPaternity: [],
    fPaternity: null,
    spouse: [],
  };
  const { data: relation } = await getPeopleRelationship(people.number);
  const relationship: Relationship = relation;
  if (relationship.SupHierarchy.length > 0) {
    for (let i = 0; i < relationship.SupHierarchy.length; i++) {
      const { data } = await getPeopleById(
        relationship.SupHierarchy[i].superIDnumber
      );
      res.sup.push(data);
    }
  }
  if (relationship.SubHierarchy.length > 0) {
    for (let i = 0; i < relationship.SubHierarchy.length; i++) {
      const { data } = await getPeopleById(
        relationship.SubHierarchy[i].subordIDnumber
      );
      res.sub.push(data);
    }
  }
  if (relationship.CPaternity.length > 0) {
    for (let i = 0; i < relationship.CPaternity.length; i++) {
      const { data } = await getPeopleById(relationship.CPaternity[i].cnumber);
      res.cPaternity.push(data);
    }
  }
  if (relationship.FPaternity !== null) {
    const { data } = await getPeopleById(relationship.FPaternity.fnumber);
    res.fPaternity = data;
  }
  if (relationship.Spouse.length > 0) {
    for (let i = 0; i < relationship.Spouse.length; i++) {
      if (relationship.Spouse[i].mname === people.name) {
        const { data } = await getPeopleById(relationship.Spouse[i].widnumber);
        res.spouse.push(data);
      } else {
        const { data } = await getPeopleById(relationship.Spouse[i].midnumber);
        res.spouse.push(data);
      }
    }
  }
  const { data: employment } = await searchEmploymentByNumber(people.number);
  const employ = employment as Employment;
  const { data: department } = await getDepartmentByNumber(employ.dpNUmber);
  const { data: experience } = await searchExperiencesByNumber(people.number);
  return {
    detail: Object.assign(
      {},
      people,
      employment as Employment,
      experience as Experiences
    ) as PeopleDetail,
    department: department,
    relation: res,
  };
};
