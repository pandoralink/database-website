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

// NODE: 实现了多组件插槽继承，代码如下

```html
<template #default>
  <slot></slot>
</template>
```
