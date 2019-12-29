# react-app 使用教程

## 前言

不需要觉得 ts 会增加工作量，框架原有的 ts 类型定义是为了开发中配置的和组件使用的准确度。<br>
在业务开发过程中可以直接创建 js/jsx 文件进行开发，与 ts 文件之间可相互引用。（不建议，ts 不香么？）<br>

## 默认提供开发使用的变量和函数或组件

### import {} from 'config' 引用

- isProduction - 是否生产环境，默认判断是否 https 可自行变更，所有判断环境的地方都应该引用该值
- params - 链接参数，http://localhost?val=1 => params = {val: 1}
- host - 接口服务地址，会根据 isProduction 自行变动，需要配置对应的生产和测试地址，测试环境下链接参数 params.host 可强制变更 host
- routers - 路由配置

### import {} from 'common' 引用

- 请求 - 统一使用自带的请求器
  - baseURL - 请求器路由前缀，但是 http 开头的请求地址会忽略该前缀，一般情况下会在请求器内自动调用，无需引用
  - get, post, put, patch, del, upload - 请求器，[使用方法](https://github.com/dyb881/fetch-request)
- 路由 - react-router-dom 抽象封装，主要依靠配置使用
  - TRouter - 单个路由属性
  - TRouters - 路由配置数组
  - TRoutersOptions - 路由选项配置
  - Router - 路由注入组件，根据路由选项判断使用路由类型（hash | browser）
  - Pages - 路由页面集合组件，根据路由配置数组生成，根据路由选项配置跳转动画属性
- 状态 - 默认使用[mobx](https://cn.mobx.js.org/)
  - stores - 全局状态树的实例，在非组件调用的情况下直接引用
  - combine - 让函数组件和状态进行关联，并在组件的 props 注入 stores
  - TStoresProps - 类组件使用的 props
  - Combine - 让类组件和状态进行关联的装饰器，类组件的 props 需要 继承或联合 TStoresProps

## 接口请求

接口请求配置，均在 configs/request 文件下完成<br>
请求器会自行引用当前文件内的配置进行初始化，控制台请求日志和响应结果处理已默认设置<br>

<details>
<summary>configs/request 配置</summary>

IConfig 请查看 [请求使用方法](https://github.com/dyb881/fetch-request) 中的请求配置

```typescript
host = '生产环境域名';
hostTest = '测试环境域名或IP';

requestConfig = {
  host: isProduction ? host : hostTest, // 根据访问环境设置请求服务器
  /**
   * 接口目录前缀，请求器发出的请求
   * 默认情况下使用 host + apiPath + 请求地址 发出请求
   * http开头的请求地址则忽略 host + apiPath
   */
  apiPath: '/api',
  /**
   * 默认请求配置（可选）
   * 请查看 [请求使用方法](https://github.com/dyb881/fetch-request) 中的请求配置
   * 一般情况下只会修改 timeout 和 headers
   */
  defaultConfig: IConfig,
  // 请求拦截器（可选）
  interceptorsRequest: (config: TConfig) => {
    // ------------ 发出请求前进行请求配置的编辑 ---------------- //
    // 一般情况下用于写入登录后的 token 到 headers
    // ------------ 发出请求前进行请求配置的编辑 ---------------- //
    return config;
  };
  // 响应拦截器（可选）
  interceptorsResponse: (res: any, config: TConfig) => {
    // ------------ 默认情况下已根据响应处理配置完成判断并生成 ---------------- //
    // res.error // 错误状态码
    // res.errorText // 错误提示
    // res.ok // 请求状态
    // ------------ 默认情况下已根据响应处理配置完成判断并生成 ---------------- //
    // 统一错误信息弹窗
    res.ok || msg(res.errorText);
    return res;
  };
}
```

响应处理配置

```typescript
/**
 * 状态码 key 代表读取时所用的 key
 */
statusCodeKeys = ['code', 'status'];
// 相当于以下代码获取响应结果的 code
code = res.code || res.status;

/**
 * 成功状态码，主要用排除法去得到错误请求
 */
successCodes = [0, '0'];
if (successCodes.includes(code)) {
  // 请求成功
} else {
  // 请求失败
  res.error = code; // 最终的错误状态码会写入 error

  /**
   * 获取错误提示
   */
  messageKeys = ['msg', 'message'];
  // 相当于以下代码获取响应结果的错误提示信息
  res.errorText = res.msg || res.message;
}

// 当得到错误信息的时候，代表接口请求失败了
res.ok = !res.errorText;

// 所以做接口请求处理时一般使用 res.ok 判断
res = await get();
if (res.ok) {
}
```

</details>

<details>
<summary>统一封装接口到 apis 文件夹内管理</summary>

统一管理你的接口，让你可以灵活处理接口的更新、缓存，甚至实现接口关联请求<br>
让接口的使用更加语义化<br>

```typescript
import { get, post, put, patch, del, upload } from 'common';
import qs from 'qs';

/**
 * 订单
 * 你们应该遇到过这种后端，时不时就跳出来修改一下返回数据结构或请求的方式
 * 以下的写法没有统一，就是为了让接口业务代码上使用的时候达成统一，也可以减少请求的参数
 */
export const order = {
  getList: ({ pageSize, pageNum, ...data }: any) => {
    // 从容面对各种奇葩，即使接口百般修改，你的业务代码都雷打不动
    return get(`/order/query?${qs.stringify(pageSize, pageNum)}`, data, '查询订单列表');
  },
  getList: (data: any) => {
    const res = await get('/order/list', data, '查询订单列表');
    if (res.ok) {
      res.data = res.data.map(i => ({
        label: i.name,
        value: i.id,
      }));
    }
    return res;
  },
  // http 开头的会忽略 baseUrl 的拼接
  add: (data: any) => post('http://127.0.0.1/order/install', data, '添加订单'),
  create: (data: any) => post('/order/install', data, '创建订单'),
  edit: (data: any) => put('/order/update', data, '编辑订单'),
  del: (id: any) => del(`/order/delete/${id}`, {}, '删除订单'),
  /**
   * 能省就省
   * bad details({ id })
   * good details(id)
   */
  details: (id: any) => get(`/order/details`, { id }, '订单详情'),
};
```

使用时

```typescript
import { order } from 'apis';

const getList = async () => {
  const res = await order.getList(data);
  if (res.ok) {
    res.data;
  }
};
```

</details>

## 路由

使用 react-router-dom + react-transition-group 封装，加入了跳转动画，正常情况下都是使用淡入淡出<br>
可以直接使用 react-router-dom 的各种 API

<details>
<summary>创建页面</summary>

在 pages 下创建页面文件，pages/home/index.tsx，默认情况下使用全局样式类 page<br>
会以绝对定位填满当前父元素，纵向 flex 布局，并可滚动<br>

```typescript
import React from 'react';

export default () => {
  return <div className="page">Home</div>;
};
```

在 configs/routers 文件内 的 routers 路由地址配置变量上加上你创建的页面

```typescript
/**
 * 路由地址配置
 */
export const routers: TRouters = [
  {
    to: '/home', // 路由地址与 react-router-dom 配置规则一致
    path: 'home', // 会执行 require('pages/home').default 引用默认导出组件
    // 其他更多参数
    title: '首页', // 在这里我定义了一个标题，用于路由监听时使用
  },
];
```

进行路由选项配置，在路由的设置上总有各种需求

```typescript
/**
 * 路由选项
 */
export const routersOptions: TRoutersOptions = {
  app: false, // 启用app模拟跳转，该模式无法识别浏览器的返回动作，请谨慎使用
  transition: true, // 开启跳转动画，页面淡入淡出
  type: 'hash', // 使用路由类型 HashRouter ｜ BrowserRouter
  // 路由监听，既页面变动时执行监听
  listen: ({ title }) => {
    // 把当前路由的配置中的 title 取出用于设置页面标题
    stores.view.setTitle(title || defaultTitle); // 这是状态管理的一个默认子状态
  },
};
```

</details>

<details>
<summary>使用路由</summary>

路由配置完成后会生成两个组件，分成两个组件主要是为了更加灵活的使用<br>
Router 其实就是 react-router-dom 中的 HashRouter ｜ BrowserRouter，根据路由选项配置 type 配置生成<br>
在 Router 内的组件才能正常使用 react-router-dom 的 api，如 withRouter<br>
Pages routers 路由配置集合生成的路由组件，可以理解为页面集合体，会生成当前路由匹配的组件<br>
一般情况下会直接在 src/App.tsx 文件内直接使用路由组件<br>

```typescript
import React from 'react';
import { Router, Pages } from 'common/routers'; // 直接引用 common 会导致循环引用，build 后运行报错

/**
 * 默认使用方法
 */
const App = () => (
  <Router>
    <Pages />
  </Router>
);

/**
 * Pages 外层添加布局
 * 以及在相邻处添加浮窗
 */
const App = () => (
  <Router>
    <Layout>
      <Pages />
    </Layout>
    <FloatingWindow />
  </Router>
);
```

</details>

## 状态

状态树示意图<br>

```
+--------+
| Stores | 主状态
+--------+
    |   +------+
    +-->+ View | 视图子状态
    |   +------+
    |   +------+
    +-->+ User | 用户子状态
    |   +------+
    |   +------------+
    +-->+ 自定义子状态 |
        +------------+
```

状态关联组件示意图<br>
Componen 执行 stores 中的 action 更新状态<br>
状态更新后会直接重新 render 组件（这里指的是使用了被更新的状态值的组件）<br>

```
    主状态
  +--------+把主状态封装到联合器
  | Stores +-----------------+
  ++-----+-+                 |
   |     ^                   |
   |     |                   |
   |     |                   v
   |     +              +----+----+
   |   action           | Combine | 联合器
   +     +              +----+----+
render   |                   |
   +     |                   |
   v     |                   |
  ++-----+---+               |
  | Componen +<--------------+
  +----------+ 使用联合器把状态和组件关联起来，并把 sotres 注入到组件
      组件
```

先使用 [mobx](https://cn.mobx.js.org) 定一个状态集合，也就是状态树，主状态下有多个子状态

<details>
<summary>主状态，集合子状态和初始化处理</summary>

```typescript
import Test from './test';

/**
 * 全局状态管理
 */
export default class Stores {
  // 初始化子状态
  test = new Test();

  /**
   * 状态初始化
   */
  constructor() {
    // 执行各种初始化操作
    this.test.add(); // 默认先执行一次 add
  }
}
```

</details>

<details>
<summary>定义一个简单值子状态，更多的 API 请查看 mobx 官方文档</summary>

```typescript
import { observable, action } from 'mobx';

export default class Test {
  // 定义监听值，值变动时会让使用该值的组件刷新
  @observable number = 0;
  // 定义动作，只有动作函数内才能编辑监听值
  @action add = () => {
    this.number++;
  };
}
```

</details>

<details>
<summary>使用关联器把状态和组件进行关联</summary>

直接使用

```typescript
import React from 'react';
import { combine, Combine } from 'common';

/**
 * 关联组件后 props 会自动注入 stores
 * 直接获取使用即可
 * 一下案例使用了 view 的 number，那么 number 更新时，该组件会重新渲染
 */
export default combine(({ stores }) => {
  return (
    <div>
      <div>{stores.view.number}</div>
      <button onClick={stores.view.add}>add</button>
    </div>
  );
});

/**
 * 如果是类组件，请使用装饰器
 */
@Combine
export default class extends React.Component {
  render() {
    return <div>{this.props.stores.view.number}</div>;
  }
}
```

自定义 props (typescript)

```typescript
import React from 'react';
import { combine } from 'common';

// 定义props类型
type TProps = {
  code?: string;
};

export default combine<TProps>(({ stores, code }) => {
  return (
    <div>
      <div>{stores.view.number}</div>
      <button onClick={stores.view.add}>add</button>
    </div>
  );
});
```

使用装饰器 (typescript)

```typescript
import React from 'react';
import { Combine, TStoresProps } from 'common';

// 定义props类型
type TProps = TStoresProps & {
  code?: string;
};

@Combine
export default class extends React.Component<TProps> {
  render() {
    const { stores, code } = this.props;
    return <div>{stores.view.number}</div>;
  }
}
```

直接使用 stores，这的话，组件不会跟随 number 的变动进行变动

```typescript
import React from 'react';
import { stores } from 'common';

export default () => {
  return (
    <div>
      <div>{stores.view.number}</div>
      <button onClick={stores.view.add}>add</button>
    </div>
  );
};
```

</details>
