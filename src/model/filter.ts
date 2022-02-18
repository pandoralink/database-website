/**
 * 筛选部分的实体
 */
export interface FilterNews {
  time: string;
  title: string;
  details: string;
}

export interface FilterNew {
  name: string;
  time: string;
}

export interface FilterDepartment {
  number: string;
  name: string;
  position: string;
  address: string;
}

export interface FilterInfo {
  name: string;
  id: string;
}

export interface FilterEquipment {
  number: string;
  DpNumber: string;
  name: string;
  location: string;
}
