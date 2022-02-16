export interface KeyValue {
  key: string;
  value: string;
}

export enum DepartmentDataType {
  people,
  equipment,
}

export interface People {
  name: string;
  age: number;
  nationality: string;
  image: string;
  number: string;
  parties: string;
  education: string;
}

export interface PeopleDetails extends People {
  eventDetails: string;
  department: string;
  hierarchy: string;
  father: Paternity;
  son: Paternity[];
  spouse: string;
}

/**
 * 我不是很明白为啥叫这个
 */
export interface Paternity {
  fnumber: string;
  cnumber: string;
  fname: string;
  cname: string;
}

export interface Department {
  name: string;
  position: string;
  location: string;
  type: number;
  number: string;
  contactInformation: string;
  image: string;
}

export interface MilitaryEquipment {
  name: string;
  number: string;
  function: string;
  details: string;
  location: string;
  dpNumber: string;
  image: string;
}

export interface News {
  title: string;
  image: string;
  briefIntroduction: string;
  details: string;
  url: string;
  time: string;
  author: string;
}

export interface Result {
  data: {
    code: number;
    msg: string;
    data: any;
  };
}

export interface UserInfo {
  name: string;
  password: string;
  age: number;
  phone: string;
}

export interface NewResult {
  data: {
    code: number;
    msg: string;
    data<T>(): T;
  };
}

// TODO: rule, switchs, remarks 是什么
export interface Bug {
  url: string;
  rule: string;
  remarks: string;
  switchs: number;
  auther: string;
}
