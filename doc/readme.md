// TODO: 为什么下面的代码不能运行成功
```ts
const confirmDel = () => {
  let arr = list.value;
  arr = arr.filter((item) => !item.isDel);
  isDelete.value = false;
};
// 这个能成功
const confirmDel = () => {
  list.value = list.value.filter((item) => !item.isDel);
  isDelete.value = false;
};
```