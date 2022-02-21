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

更新和插入的 `Dialog` 可以复用但是不必在同一个组件中使用

# 子组件接收父组件 props 作为初值, 并以此断开两者之间的响应性

子组件使用 `computed` 劫持 `props` 只是使其不可读，子组件拿到后无法修改，正确的做法如下

```ts
// 监听响应式 props 的变化
const { formValue } = toRefs(props);

let data = ref(props.formValue);
const updateData = () => {
  // data.value =  JSON.parse(JSON.stringify(props.formValue));
  data.value = Object.assign({}, props.formValue);
};

watch(formValue, updateData);
```

对 `props` 进行拷贝，`assign` 或者 `JSON` 组合拳都行
