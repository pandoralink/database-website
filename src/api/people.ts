import axios from "@/utils/axios";
import {
  Department,
  Employment,
  Experiences,
  News,
  People,
  PeopleDetail,
} from "@/model/model";
import { searchEmploymentByNumber } from "@/api/employment";
import { getDepartmentByNumber } from "@/api/department";
import { searchExperiencesByNumber } from "@/api/experiences";
import { Relation, Relationship } from "@/@types/model";
import {
  getMilitaryNewsByDetails,
  getPoliticalNewsByDetails,
} from "@/api/news";

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

export const updatePeople = (data: People) => {
  return axios({
    url: "/people/update",
    method: "put",
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

export const getPeopleDetail = async (people: People) => {
  const res: Relation = {
    sup: [],
    sub: [],
    cPaternity: [],
    spouse: [],
    fPaternity: [],
  };
  const { data: relation } = await getPeopleRelationship(people.number);
  const relationship: Relationship = relation;
  if (relationship.SupHierarchy.length > 0) {
    for (let i = 0; i < relationship.SupHierarchy.length; i++) {
      const { data } = await getPeopleById(
        relationship.SupHierarchy[i].SuperIDnumber
      );
      if (data) {
        res.sup.push(data);
      }
    }
  }
  if (relationship.SubHierarchy.length > 0) {
    for (let i = 0; i < relationship.SubHierarchy.length; i++) {
      const { data } = await getPeopleById(
        relationship.SubHierarchy[i].SubordIDnumber
      );
      res.sub.push(data);
    }
  }
  if (relationship.CPaternity.length > 0) {
    for (let i = 0; i < relationship.CPaternity.length; i++) {
      const { data } = await getPeopleById(relationship.CPaternity[i].Cnumber);
      res.cPaternity.push(data);
    }
  }
  if (relationship.FPaternity.length > 0) {
    for (let i = 0; i < relationship.FPaternity.length; i++) {
      const { data } = await getPeopleById(relationship.FPaternity[i].Fnumber);
      res.fPaternity.push(data);
    }
  }
  if (relationship.Spouse.length > 0) {
    for (let i = 0; i < relationship.Spouse.length; i++) {
      if (relationship.Spouse[i].Mname === people.name) {
        const { data } = await getPeopleById(relationship.Spouse[i].WIDnumber);
        if (data) {
          res.spouse.push(data);
        }
      } else {
        const { data } = await getPeopleById(relationship.Spouse[i].MIDnumber);
        if (data) {
          res.spouse.push(data);
        }
      }
    }
  }
  const { data: employment } = await searchEmploymentByNumber(people.number);
  let department: Department | undefined;
  if (employment) {
    const employ = employment as Employment;
    try {
      const { data: depart } = await getDepartmentByNumber(employ.dpNUmber);
      department = depart;
    } catch (e) {
      console.log(e);
    }
  }
  const { data: experience } = await searchExperiencesByNumber(people.number);
  const { data: militaryNews } = await getMilitaryNewsByDetails(people.name);
  const { data: politicalNews } = await getPoliticalNewsByDetails(people.name);
  const news: News[] = [];
  if (militaryNews && militaryNews?.length) {
    news.push(...militaryNews);
  }
  if (politicalNews && politicalNews?.length) {
    news.push(...politicalNews);
  }

  return {
    detail: Object.assign(
      {},
      people,
      employment as Employment,
      experience as Experiences
    ) as PeopleDetail,
    department: department,
    employment: employment ? (employment as Employment) : null,
    relation: res,
    relationship: relationship,
    news,
  };
};
