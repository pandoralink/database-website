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
const {formValue} = toRefs(props);

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

TS 函数类型参数可以这么写

```typescript
export async function confirmInsert<T>(
    callback: (data: T) => Promise<HttpResponse>
): Promise<void> {
}
```

`TS2345: Argument of type 'UnwrapRef<T>' is not assignable to parameter of type 'T'. 'T' could be instantiated with an arbitrary type which could be unrelated to 'UnwrapRef<T>'.`

```typescript
export function useInsert<T>(
    list: Ref<T[]>,
    callback: (data: T) => Promise<HttpResponse>
) {
    // const insertOb = shallowRef<T>({} as T);
    // const insertOb = ref({}) as Ref<T>;
    const insertOb = ref<T>({} as T);
    const isOpen = ref(false);
    const insert = () => (isOpen.value = true);
    const cancelInsert = () => (isOpen.value = false);

    async function confirmInsert(): Promise<void> {
        cancelInsert();
        // 报错，不知道是为什么
        const {data} = await callback(insertOb.value);
        const res = data as Result;
        if (res.code === 0) {
            list.value.unshift(insertOb.value);
            // 展示页面需为 10
            list.value.pop();
            ElMessage.success(res.msg);
        } else ElMessage.error("操作失败，请重试");
        insertOb.value = {} as T;
    }

    return {
        insertOb,
        insert,
        cancelInsert,
        confirmInsert,
    };
}
```

typescript 能够自动推导泛型，比如下面这个

```typescript
function useDelete<T extends BaseItem, K extends keyof T>(
    list: Ref<T[]>,
    callback: (key: K) => Promise<HttpResponse>,
    key: K
) {
}

// 两种等价的写法
useDelete<News, keyof News>(list, deleteMilitaryNews, "url");
// 这种更简洁，而且可以能够自动推导类型
useDelete(list, deleteMilitaryNews, "url");
```

使用 `ts` 时要注意 `API` 参数的设定，因为一旦设定好参数名称，将成为一个**模板**，这个时候抽调逻辑的时候可能无法会很困难，比如

```typescript
// 我的 delete API 回调的参数都是不一样的
// 因为每个删除依靠的键是不一样的
export const deleteMilitaryNews = (url: string) => {
    return axios({
        url: "/MilitaryNews/delete",
        method: "delete",
        params: {
            url,
        },
    });
};

// 但在后期抽调函数时，因为不同的 API 不同键，删除逻辑的回调 API 参数反而不会写了
export function useDelete<T extends BaseItem, K extends keyof T>(
    list: Ref<T[]>,
    // callback 怎么变成动态的呢？
    callback: (key: T[K]) => Promise<HttpResponse>,
    key: K
) {
}

// 但最后的解决方案略显粗糙，解决方案如下
// 照常调用，即使 `deleteMilitaryNews` 和 `callback` 的参数名称不一致，但是只要位置对上了，就能够成功调用
const {data} = await callback(item[key]);
```

通过使用 `element-plus` 推荐的自动导入，我的打包大小开始有了如下变化

```
1.89 -> 1.98 -> 2.83(M)
```

```js
// vue.config.js
/* eslint-disable @typescript-eslint/no-var-requires */
const {ElementPlusResolver} = require("unplugin-vue-components/resolvers");

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      require("unplugin-auto-import/webpack")({
        resolvers: [ElementPlusResolver()],
      }),
      require("unplugin-vue-components/webpack")({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
};
```

```ts
import {createApp} from "vue";
import App from "./App.vue";
import router from "./router/index";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import "../src/style/store.css";
import store from "./store";

const app = createApp(App);
// app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount("#app");
```

后面再去考虑优化的打包的问题吧

对于具名插槽，组件暴露时一定要记得把名字加上，否则不会渲染，如下

```vue
<!-- BaseFilter.vue -->
<template #dropdown>
  <!-- error -->
  <slot></slot>
</template>

<template #dropdown>
  <!-- good -->
  <slot name="dropdown"></slot>
</template>

<!-- ContentHeader.vue -->
<base-filter>
<template #dropdown>
  <!-- 成功渲染 -->
  <slot name="dropdown"></slot>
</template>
</base-filter>
```

插槽寻找存在特殊情况，比如 `default` 的情况

```html
<!-- BaseFilter.vue -->
<template #dropdown>
  <!-- error -->
  <slot></slot>
</template>

<!-- ContentHeader.vue -->
<base-filter>
  <template #dropdown>
    <!-- 实际上这个 <slot> 等于 <slot name="default"> -->
    <!--  而不是我们想要的 <slot name="dropdown">  -->
    <slot></slot>
  </template>
</base-filter>
```

webstorm 比 vscode 做的不足的地方，`vue` 组件 `<script lang="ts" setup>` 自定义的 `props` 不能够自动补全，而 `vscode` 的 `volar` 能做到

```typescript
// EQUIPMENT 会被提示未被使用
enum DepartDataType {
    EMPLOY = 0,
    EQUIPMENT = 1,
}
```

无法自动找到 `vue` 组件，比如

```
不会自动补全
import VueComponent
VueComponent
```

在模板上绑定数据的时候无法自动补全变量名

# CSS

只要设置了 `overflow: scroll` 就一定会出现滑动条组，`overflow: auto` 相对来说更加智能

# 小技巧

`computed` 可以返回一个不可变的响应式式对象

`watch(() => xxx)` 监听一个 `getter`，有时候我们可以利用这个去监听 `props`

```typescript
// watch 必须监听一个响应式对象
const {formValue} = toRefs(props);
watch(formValue, updateData);

// 但是还可以这样写
watch(() => props.formValue, updateData);
```
