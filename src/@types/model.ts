import { Hierarchy, Paternity, People, Spouse } from "@/model/model";

export interface Relation {
  sup: People[];
  sub: People[];
  cPaternity: People[];
  fPaternity?: People;
  spouse: People[];
}

/**
 * SupHierarchy: 上级人物
 * SubHierarchy: 下级人物
 * CPaternity:子女
 * FPaternity: 父母
 * Spouse: 配偶
 */
export interface Relationship {
  SupHierarchy: Hierarchy[];
  SubHierarchy: Hierarchy[];
  CPaternity: Paternity[];
  FPaternity: Paternity;
  Spouse: Spouse[];
}
