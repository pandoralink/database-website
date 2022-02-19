import { People } from "@/model/model";

export type PeopleKeys = keyof People;

const a = "name" as PeopleKeys;
console.log(a);

export enum NewsType {
  MILITARY = 0,
  POLITICAL = 1,
}
