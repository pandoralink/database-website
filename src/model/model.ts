export interface KeyValue {
  key: string;
  value: string;
}

export enum DepartmentDataType {
  people,
  equipment,
}

/**
 * Item 是否删除
 */
export interface BaseItem {
  isDel?: boolean;
}

/**
 * 给对象的 key 取个中文名
 */
export interface KeyName<T> {
  [key: string]: [keyof T];
}

export interface People extends BaseItem {
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

export interface Department extends BaseItem {
  name: string;
  position: string;
  location: string;
  type: number;
  number: string;
  contactInformation: string;
  image: string;
}

export interface MilitaryEquipment extends BaseItem {
  name: string;
  number: string;
  function: string;
  details: string;
  location: string;
  dpNumber: string;
  image: string;
}

export interface News extends BaseItem {
  title: string;
  image: string;
  briefIntroduction: string;
  details: string;
  url: string;
  time: string;
  author: string;
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

// TODO: rule
/**
 * remarks: 功能备注
 * switchs: 状态
 */
export interface Bug {
  url: string;
  rule: string;
  remarks: string;
  switchs: number;
  auther: string;
}

export interface Paternity {
  Fname: string;
  Fnumber: string;
  Cname: string;
  Cnumber: string;
}

export interface Experiences {
  eventDetails: string;
  name: string;
  number: string;
  time: string;
  title: string;
  url: string;
}

export interface Spouse {
  Mname: string;
  MIDnumber: string;
  Wname: string;
  WIDnumber: string;
}

export interface Physiological {
  age: number;
  bloodType: string;
  gender: string;
  health: string;
  name: string;
  number: string;
  skinColour: string;
}

export interface Hierarchy {
  superIDnumber: string;
  subordName: string;
  supername: string;
  subordIDnumber: string;
}

export interface Employment {
  name: string;
  number: string;
  employPlace: string;
  employName: string;
  positionNumber: string;
  dpNUmber: string;
}
