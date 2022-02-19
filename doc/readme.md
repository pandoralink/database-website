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

```ts
// 似乎可以反向映射 value 的类型
interface Test {
  enumName: keyof typeof Common.Enums; // "Enum1" | "Enum2" | "Enum3"
}
```

将子组件的 v-model 传递给父组件（如果子组件只有一个元素，类似 `<el-dialog>`, 父元素无需任何配置可以直接使用，如果是子组件内部其他元素，暂时没有解决方案）

子组件需要修改父组件传递的值，但是 props 又禁止子组件修改，可以试试 Pinia/Vuex, 让父组件传递一个**类** Props 去让子组件修改，注意需要考虑是否要保持父子组件传递的值之间的响应性，即互相引用
