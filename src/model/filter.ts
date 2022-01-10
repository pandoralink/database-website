/**
 * 筛选部分的实体
 */
export interface FilterNew {
  name: string;
  time: string;
}

export interface FilterNew {
  name: string;
  time: string;
}

export interface FilterDepartment {
  type?: 0 | 1;
  name: string;
  id: string;
  address: string;
}

export interface FilterInfo {
  department: string;
  name: string;
  id: string;
  employName: string;
}
