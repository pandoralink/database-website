import { People } from "@/model/model";

export interface Relation {
  sup: People[];
  sub: People[];
  cPaternity: People[];
  fPaternity?: People;
  spouse: People[];
}
