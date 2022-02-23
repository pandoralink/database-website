export function toArray<T>(data: T[] | []): T[] {
  const res: T[] = [];
  if (data instanceof Array) {
    res.push(...data);
  } else res.push(data);
  return res;
}

// 暂时被废弃
export const multipleFilter = (filterKey: string, a: any[], ...b: any[]) => {
  let res: any[] = [];
  const allFilterlist = [a, ...b];
  for (let i = 0; i < allFilterlist.length; i++) {
    if (allFilterlist[i].length > 0 && res.length > 0) {
      res = intersect(allFilterlist[i], res, filterKey);
    } else if (allFilterlist[i].length > 0 && res.length === 0) {
      res.push(...allFilterlist[i]);
    }
  }
  return res;
};

export function multipleFilterByKey<T>(filterKey: keyof T, filterlist: T[][]): T[] {
  let res: T[] = [];
  for (let i = 0; i < filterlist.length; i++) {
    if (filterlist[i].length > 0 && res.length > 0) {
      // TODO: 或许要修改 intersect
      res = intersect(filterlist[i], res, filterKey as string);
    } else if (filterlist[i].length > 0 && res.length === 0) {
      res.push(...filterlist[i]);
    }
  }
  return res;
}

/**
 * 求交集
 * @param arr1
 * @param arr2
 * @param filterKey 两个对象比较是否相同的 key
 * @returns
 */
export const intersect = (
  arr1: any[],
  arr2: any[],
  filterKey: string
): any[] => {
  const set = new Set();
  const res: any[] = [];
  arr1.forEach((item) => set.add(item[filterKey]));
  arr2.forEach((item) => {
    if (set.has(item[filterKey])) {
      res.push(item);
    }
  });
  return res;
};
