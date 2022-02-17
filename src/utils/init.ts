// 初始化部分接口参数
import { BaseItem } from "../model/model";

export const initIsDel = (arr: any[]) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].isDel = false;
  }
};
