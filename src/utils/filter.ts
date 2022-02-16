// TODO: 应该考虑泛型数组的问题，并使用 try/catch 判定错误
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
