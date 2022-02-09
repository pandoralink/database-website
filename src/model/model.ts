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

export interface Department {
  name: string;
  position: string;
  location: string;
  type: number;
  id: string;
  contactInformation: string;
  image: string;
}

export interface MilitaryEquipment {
  name: string;
  id: string;
  features: string;
  details: string;
  location: string;
  dpNumber: string;
  image: string;
}

export interface New {
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
