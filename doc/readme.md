<!--
 * @Author: your name
 * @Date: 2022-02-17 15:43:34
 * @LastEditTime: 2022-02-23 15:58:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \database-website\doc\readme.md
-->

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

- 内嵌网页 `iframe` 重定向到原网址的问题
- 多级组件 `Event`, `Props` 继承问题，即使是父组件只有子组件一个元素
- Mixin 似乎是兄弟组件逻辑复用的一种方式
- refs 也是一种组件的传递方式
- CSS 文件书写顺序 - CSScomb

封装组件的问题

- 继承官方 API，仅进行少量的增强
- 支持自定义动态具名插槽

# 已完善部分

1. 部门信息表
2. People 表
3. 爬虫表（insert 存在 Bug）
4. 军事新闻表
5. 政治新闻表

# 未完善部分

1. 父子关系表
2. 个人经历信息表
3. 配偶关系表
4. 政治军事上下级关系表
5. 用户生理信息表
6. 职位表 - 基本和 info.vue 一致，在 api 上创建接口然后按照 info.vue 里面写就行了

1-5 的内容与 People 表的内容高度耦合，但是暂不清楚是否需要拆分，先不要动

# 封装带回调函数

注意，`ts` 箭头函数定义泛型的时候，这种情况需要注意

```ts
const getFilterData = <T>(filterList: T): T => {
  return filterList;
};
```

要在 `T` 后面加上 `T`，否则会报错

参考[6 种方法](https://blog.csdn.net/weixin_45389051/article/details/118250554)

**不应该封装回调函数数组**