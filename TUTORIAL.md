# react-app 使用教程

## 前言

不需要觉得 ts 会增加工作量，框架原有的 ts 类型定义是为了开发中配置的和组件使用的准确度。<br>
在业务开发过程中可以直接创建 js/jsx 文件进行开发，与 ts 文件之间可相互引用。（不建议，ts 不香么？）<br>

## 默认提供开发使用的变量和函数或组件

<details>
<summary>import {} from 'config' 引用</summary>

- isProduction - 是否生产环境，默认判断是否 https 可自行变更，所有判断环境的地方都应该引用该值
- params - 链接参数，http://localhost?val=1 => params = {val: 1}
- host - 接口服务地址，会根据 isProduction 自行变动，需要配置对应的生产和测试地址，测试环境下链接参数 params.host 可强制变更 host
- routers - 路由配置

</details>

<details>
<summary>import {} from 'common' 引用</summary>

- 请求
  - baseURL - 请求器路由前缀，但是 http 开头的请求地址会忽略该前缀，一般情况下会在请求器内自动调用，无需引用
  - get, post, put, patch, del, upload - 请求器，[使用方法](https://github.com/dyb881/fetch-request)
- 路由
  - TRouter - 单个路由属性
  - TRouters - 路由配置数组
  - TRoutersOptions - 路由选项配置
  - Router - 路由注入组件，根据路由选项判断使用路由类型（hash | browser）
  - Pages - 路由页面集合组件，根据路由配置数组生成，根据路由选项配置跳转动画属性
- 状态
  - stores - 全局状态树的实例，在非组件调用的情况下直接引用
  - combine - 让函数组件和状态进行关联，并在组件的 props 注入 stores
  - TStoresProps - 类组件使用的 props
  - Combine - 让类组件和状态进行关联的装饰器，类组件的 props 需要 继承或联合 TStoresProps

</details>

## 接口请求

### 第一步需要完成接口请求配置，均在 configs/request 文件下完成

请求器会自行引用当前文件内的配置进行初始化，控制台请求日志和响应结果处理已默认完成

<details>
<summary>configs/request 配置</summary>

IConfig 请查看 [请求使用方法](https://github.com/dyb881/fetch-request) 中的请求配置

```javascript
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

```javascript
// 状态码 key 代表读取时所用的 key
statusCodeKeys = ['code', 'status']
// 相当于以下代码获取响应结果的 code
code = res.code || res.status;

// 成功状态码，主要用排除法去得到错误请求
successCodes = [0, '0']
if(successCodes.includes(code)) {
  // 请求成功
} else {
  // 请求失败
  res.error = code; // 最终的错误状态码会写入 error

  // 获取错误提示
  messageKeys = ['msg', 'message'];
  // 相当于以下代码获取响应结果的错误提示信息
  res.errorText = res.msg || res.message;
}

// 当得到错误信息的时候，代表接口请求失败了
res.ok = !res.errorText;

// 所以做接口请求处理时一般使用 res.ok 判断
res = await get();
if(res.ok) {
}
```

</details>

<details>
<summary>统一封装接口到 apis 文件夹内管理</summary>

统一管理你的接口，让你可以灵活处理接口的更新、缓存，甚至实现接口关联请求<br>
让接口的使用更加语义化<br>

```javascript
import { post } from 'common';

/**
 * 用户
 */
export const user = {
  login: (data: any) => post('/login', data, '登录'),
};

export const order = {
  getList:
  add:
  edit:
  del:
  details:
}
```

</details>