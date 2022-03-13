/**
 * 筛选部分的实体
 */
export interface FilterBug extends Record<string, ValueAlias> {
  author: ValueAlias;
}

export interface FilterNews extends Record<string, ValueAlias> {
  time: ValueAlias;
  title: ValueAlias;
  details: ValueAlias;
}

export interface FilterNew {
  name: string;
  time: string;
}

export interface FilterDepartment extends Record<string, ValueAlias> {
  number: ValueAlias;
  name: ValueAlias;
  position: ValueAlias;
  address: ValueAlias;
}

export interface FilterInfo extends Record<string, ValueAlias> {
  name: ValueAlias;
  id: ValueAlias;
}

export interface FilterEquipment extends Record<string, ValueAlias> {
  number: ValueAlias;
  DpNumber: ValueAlias;
  name: ValueAlias;
  location: ValueAlias;
}

// 筛选对象的键值和别名
export interface ValueAlias {
  value: string | number | boolean;
  alias: string;
}

export interface FilterEmployment extends Record<string, ValueAlias> {
  positionNumber: ValueAlias;
  dpNUmber: ValueAlias;
  name: ValueAlias;
  employPlace: ValueAlias;
}
