# react-app

create-react-app + react-app-rewired 进行二次配置：按需加载、less-loader、启用 eslint 配置、特殊自定义配置<br>
如果需要更具体的业务模版，可以跳转至 [模版生成器](https://github.com/dyb881/create-react-app)

## 使用方法

```
git clone https://github.com/dyb881/react-app [项目名称]
cd [项目名称]
npm i // 安装依赖
npm start // 开发模式
npm run build // 打包生产代码
npm run mock // 启动模拟数据服务
npm run serve // 启动快捷服务
```

## 拓展功能

除了 create-react-app --typescript 已有的功能外，做出一个更完善的配置功能，以及一些基础准备：

- prettier 格式化配置（实际使用需要在IDE上安装prettier）
- homepage 打包路径设置（默认为相对路径）
- tsconfig.json ts 编译配置（追加装饰器和迭代器支持，以及遇到未使用变量报错）
- antd antd-mobile lodash 三个常用依赖的按需加载
- less 文件加载，以及主题色设置（主题色可参考 config-overrides.js 文件）
- eslint 可二次配置（需要在 package.json 中配置）
- 可自定义 webpack 配置
  - 默认在生产模式中配置了代码压缩
- 添加 postcss 插件
  - 添加 postcss-pxtorem（注！非默认，需手动清除注释）
- index.html 默认添加：移动端禁止缩放、收藏栏图标、手机号码识别禁止、等相关属性设置
- 开发环境下，热更新（即 start 后，保存文件会导致对应组件自动刷新更改，而不刷新整个页面，保留当前状态）
- 基础样式准备（normalize.css 样式初始化，App.less 小量样式的初定义，以及一些常用类的定义，实际使用 css module 的话，可以不理会这些类）
- 路由准备，并设置过度动画（使用个人封装的路由组件 [@dyb881/router](https://github.com/dyb881/router)，若有特殊需求，可自行使用 react-router-dom 根据配置注册路由）
- 请求配置，以及默认请求器（使用个人封装的请求器 [@dyb881/fetch-request](https://github.com/dyb881/fetch-request)，若有特殊需求，自行创建请求器，尽量保持请求器的一致导出，如 get、post、put 等）
- 模拟数据服务（快捷启用一个 模拟数据接口服务，具体注册方法 可参考 [@dyb881/mock-server](https://github.com/dyb881/mock-server)）
- 快捷服务启动（默认指向，打包后的文件夹 build）

## 目录结构

- src - 源代码，开发项目过程中，一般只会动这里的代码
  - api - 请求相关，可直接导出请求函数，以及封装后的接口
    - request.ts - 配置导出请求方法
    - mock-server.js - 模拟数据服务接口注册
    - index.ts - 封装并导出请求接口
  - components - 全局组件，会被页面复用的组件
  - config - 全局配置
    - request.ts - 请求配置
    - routers.ts - 路由配置
  - images - 图片资源
  - pages - 项目页面 - 开发中，以页面为单位的文件夹都存放于此
  - types - ts 类型定义，以及引用第三方库类型声明
  - utils - 工具库
  - App.less - 全局样式定义
  - App.tsx - 项目入口，主要用于状态的注入，和路由定义
  - react-app-env.d.ts - 全局声明

## 搭建过程

虽然以下配置过程都是用 npm，但是实际使用时，推荐 yarn

### 环境初始化

由于可兼容 js/jsx/ts/tsx 开发，并同步支持 eslint 检测<br>
如 /src/pages/home/index.tsx 和 /src/pages/user/index.jsx 这两个文件均可正常编译使用<br>
创建时直接使用 ts 环境即可

```
npx create-react-app react-app --typescript
```

<details>
<summary>package.json 追加配置</summary>

```javascript
{
  "prettier": { // 代码格式化 prettier 的配置，自行查阅如何在编辑工具上安装和使用 prettier
    "printWidth": 120,
    "singleQuote": true,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "parser": "babylon",
    "semi": true,
    "requirePragma": false
  },
  "homepage": "./" // 打包后资源引用路径
}
```

</details>

<details>
<summary>tsconfig.json 配置</summary>

相关配置自行查阅<br>
需要特别注意的是 baseUrl 设置为 src 后，可使用非相对路径来导入你的外部依赖<br>
如 import 'App.css' 时，会先在 src 文件夹内检索是否有对应文件或文件夹，找不到才会去 node_modules 寻找外部依赖

```javascript
{
  "compilerOptions": {
    "baseUrl": "src",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "experimentalDecorators": true,
    "downlevelIteration": true
  },
  "include": ["src"]
}
```

</details>

<details>
<summary>添加快捷服务启动</summary>

安装依赖

```
npm i serve
```

在 package.json 添加一行命令

```javascript
{
  "scripts": {
    ...,
    "serve": "serve -s build"
  },
}
```

使用时

```
npm run build
npm run serve
```

</details>

### 二次拓展配置（no eject）

为了不 eject，导致脚手架无法升级，采用 react-app-rewired 二次拓展配置<br>
customize-cra 是基于 react-app-rewired 核型，提供了一组实用工具用于定制配置<br>
[完整配置 config-overrides.js](https://github.com/dyb881/react-app/blob/master/config-overrides.js)

#### install 所需依赖

```
npm i react-app-rewired customize-cra
```

<details>
<summary>修改 package.json 文件</summary>

```javascript
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
}
```

</details>

<details>
<summary>创建 config-overrides.js</summary>

```javascript
const { override } = require('customize-cra');

module.exports = override();
```

</details>

<details>
<summary>按需加载</summary>

目前使用到该功能的依赖，一般为：antd、antd-mobile、lodash<br>
所以这里会默认依赖这三个，只要在项目内未 import，是不会参与打包的，所以不必有过多的顾虑<br>
babel-plugin-import 则是适用于 babel 的模块化导入插件

```
npm i antd antd-mobile lodash @types/lodash babel-plugin-import
```

config-overrides.js 配置

```javascript
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  // 按需加载
  fixBabelImports('antd', { libraryDirectory: 'es', style: true }),
  fixBabelImports('antd-mobile', { libraryDirectory: 'es', style: true }),
  fixBabelImports('lodash', { libraryDirectory: '' })
);
```

</details>

<details>
<summary>less 配置</summary>

安装

```
npm i less less-loader
```

添加 less-loader

```javascript
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  // 添加 less-loader
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {}, // 全局 less 变量，会覆盖项目内同名变量，可用于主题定制
  })
);
```

less-loader 配置主题色变量

```javascript
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  // 添加 less-loader
  addLessLoader({
    javascriptEnabled: true,
    // 全局 less 变量，会覆盖项目内同名变量，可用于主题定制
    modifyVars: {
      // 常用色
      '@ra-primary': '#1890ff', // 全局主色
      '@ra-success': '#52c41a', // 成功色
      '@ra-warning': ' #faad14', // 警告色
      '@ra-error': '#f5222d', // 错误色
      '@ra-font-size': '14px', // 主字号
      '@ra-color': 'rgba(0, 0, 0, 0.85)', // 主文本色
      '@ra-color-secondary': 'rgba(0, 0, 0, .45)', // 次文本色
      '@ra-disabled-color': 'rgba(0, 0, 0, .25)', // 失效色
      '@ra-disabled-color-back': 'rgba(0, 0, 0, .05)', // 失效背景色
      '@ra-border-color': '#eeeeee', // 边框色
      '@ra-border-color-dark': '#cccccc', // 边框色-深色
      '@ra-background': '#f1f1f1', // 背景色
      // 别名
      '@ra-p': '#1890ff', // 全局主色
      '@ra-s': '#52c41a', // 成功色
      '@ra-w': ' #faad14', // 警告色
      '@ra-e': '#f5222d', // 错误色
      '@ra-fs': '14px', // 主字号
      '@ra-c': 'rgba(0, 0, 0, 0.85)', // 主文本色
      '@ra-cs': 'rgba(0, 0, 0, .45)', // 次文本色
      '@ra-dc': 'rgba(0, 0, 0, .25)', // 失效色
      '@ra-dcb': 'rgba(0, 0, 0, .05)', // 失效背景色
      '@ra-bc': '#eeeeee', // 边框色
      '@ra-bcd': '#cccccc', // 边框色-深色
      '@ra-b': '#f1f1f1', // 背景色
    },
  })
);
```

less 在 ts 中使用 CSS Modules<br>
虽然 create-react-app 中的样式文件只要带上 module 就可以使用 CSS Modules<br>
但是需要在声明文件中添加 declare module，才能够被 ts 文件识别<br>
在 /src/react-app-env.d.ts 中添加

```javascript
declare module '*.module.less' {
  const classes: {
    [key: string]: string;
  };
  export default classes;
}
```

</details>

<details>
<summary>二次配置 eslint</summary>

在实际开发中，因为不得已的情况，需要自定义部分 eslint 规则限制的时候，添加如下配置<br>

```javascript
const { override, useEslintRc } = require('customize-cra');

module.exports = override(
  // 允许二次配置 eslint
  useEslintRc()
);
```

在 package.json 中配置 eslint

```javascript
{
  "eslintConfig": {
    "extends": "react-app",
    "rules": {
      // 新 eslint
    }
  },
}
```

</details>

<details>
<summary>自定义配置</summary>

customize-cra 提供的工具十分有限，这时候就需要更加灵活的自定义配置<br>
webpack-merge 是针对 webpack 设计的 merge 工具<br>

```
npm i webpack-merge
```

```javascript
const Merge = require('webpack-merge');
const { override } = require('customize-cra');

module.exports = override(
  config => {
    // 自定义配置
    config = Merge(config, {});

    if (process.env.NODE_ENV === 'production') {
      // 生产模式下的配置
      config = Merge(config, {});
    } else {
      // 开发模式下的配置
      config = Merge(config, {});
    }

    // 返回更改后的配置
    return config;
  }
);
```

</details>

<details>
<summary>添加 postcss 插件（自行根据实际情况加入）</summary>

addPostcssPlugins 必须放在 addLessLoader 或样式相关的配置后面

```javascript
const { override, addPostcssPlugins } = require('customize-cra');

module.exports = override(
  // 添加 postcss 插件
  addPostcssPlugins([
    // 添加 postcss-pxtorem
    require('postcss-pxtorem')({
      rootValue: 100,
      propList: ['*'],
    }),
  ])
);
```

</details>

### index.html 文件的属性设置

主要是设置：移动端禁止缩放、收藏栏图标、手机号码识别禁止、等相关属性设置<br>
更多详情，请查看文件[/public/index.html](https://github.com/dyb881/react-app/blob/master/public/index.html)

### 源码（/src）内做出一些默认设置

<details>
<summary>添加热更新</summary>

安装热更新插件

```
npm i react-hot-loader
```

/src/index.tsx

```javascript
ReactDOM.render(<App />, document.getElementById('root'));
```

改为

```javascript
(async () => {
  let RenderApp = App;
  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    // 添加热更新
    const { hot } = await import('react-hot-loader/root');
    RenderApp = hot(App);
  }
  ReactDOM.render(<RenderApp />, document.getElementById('root'));
})();
```

</details>

<details>
<summary>基础样式准备</summary>

在 /src/App.tsx 中引用 normalize.css 和 /src/App.less 全局样式<br>
normalize.css 在默认的 HTML 元素样式上提供了跨浏览器的高度一致性<br>

```javascript
import 'normalize.css';
import 'App.less';
```

</details>

<details>
<summary>路由准备</summary>

在 /src/config/routers.ts 中配置页面路由<br>
路由使用 [@dyb881/router](https://github.com/dyb881/router) 组件进行注册<br>
自带过度动画，强制使用一级路由

</details>

<details>
<summary>请求配置，以及默认请求器</summary>

在 /src/configs/request.ts 中配置请求相关信息<br>
默认使用 [@dyb881/fetch-request](https://github.com/dyb881/fetch-request) 请求器，自带控制台打印信息。<br>
请求器可以在 /src/api/request.ts 自行替换或封装，只需要遵守同样的导出规则即可<br>

先在 /src/api/index.ts 封装请求

```javascript
import { post } from './request';

export const user = {
  login: (data: any) => post('/login', data, '登录'),
};

```

然后在其他地方或页面中使用时

```javascript
import { user } from 'api';

user.login({});
```

</details>

<details>
<summary>模拟数据服务</summary>

安装模拟数据服务插件

```
npm i @dyb881/mock-server
```

创建 /src/api/mock-server.js

```javascript
const mockServer = require('@dyb881/mock-server').default;
const ip = require('ip');

console.log('模拟数据环境：', `http://localhost:3000/?host=http://${ip.address()}`);

const tableInfo = {
  id: '@id',
  Batch: '@id',
  Description: '@ctitle(50)',
};

// 数据统一返回处理
mockServer(data => ({
  code: 0,
  msg: '模拟数据',
  data,
}))
  .get('/api/getTableList', req => {
    const { pageSize = 10, pageNum = 1 } = req.query;
    return {
      [`list|${pageSize}`]: [tableInfo],
      total: 100,
      pageNum,
    };
  })
  .get('/api/getTableInfo', tableInfo)
  .delay(300, 1000) // 延迟时间
  .init(); // 启动服务
```

在 package.json 添加一行命令

```javascript
{
  "scripts": {
    ...,
    "mock": "node src/api/mock-server.js"
  },
}
```

使用时

```
npm run mock
```

</details>

## 知识准备

环境准备好后，你需要知道的东西还有很多<br>
以下知识点不需要追求完全精通，但是需要大致了解<br>

- web 基础 - [MDN](https://developer.mozilla.org/zh-CN/)，[W3C](http://www.w3school.com.cn/)
- ES Next - [JavaScript 完整手册](https://juejin.im/post/5bff57fee51d45021a167991)
- TypeScript(可选，直接使用 js/jsx 文件开发亦可) - [官方文档](https://www.tslang.cn/docs/handbook/basic-types.html)
- React - [入门教程](http://www.ruanyifeng.com/blog/2015/03/react.html)
- 路由 react-router-dom - [官方文档](https://reacttraining.com/react-router/web/guides/quick-start)，[中文文档](https://www.jianshu.com/p/b117b437dc5a)
- 预处理 less/scss/sass - [less 文档](https://www.html.cn/doc/less/)，[scss/sass 文档](http://sass.bootcss.com/docs/sass-reference)，选一即可。
- 模块化 CSS Modules - [CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)
- 状态管理 Mobx/Redux 二选一，大型项目推荐采用 Redux，中小型项目推荐采用 mobx 降低开发成本
  - [Mobx 中文文档](https://cn.mobx.js.org)
  - [Redux 中文文档](http://cn.redux.js.org)
    - [redux-saga 中文文档](http://leonshi.com/redux-saga-in-chinese/docs/api/index.html)
- UI 组件 ant-design
  - [PC 端](https://ant.design/docs/react/introduce-cn)
  - [移动端](https://mobile.ant.design/docs/react/introduce-cn)
- 包管理，选一即可
  - yarn [中文文档](https://yarnpkg.com/zh-Hant)
  - npm [菜鸟教程](https://www.runoob.com/nodejs/nodejs-npm.html)
- 打包工具
  - webpack [中文文档](https://www.webpackjs.com)

## 致谢

感谢现有的相关项目:

- [create-react-app](https://github.com/facebook/create-react-app)
- [react-app-rewired](https://github.com/timarney/react-app-rewired)
- [customize-cra](https://github.com/arackaf/customize-cra)
- [webpack-merge](https://github.com/survivejs/webpack-merge)
- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
- [antd](https://ant.design/docs/react/introduce-cn)
- [antd-mobile](https://mobile.ant.design/docs/react/introduce-cn)
- [lodash](https://www.lodashjs.com/docs/latest)
- [less](http://lesscss.org)
- [less-loader](https://webpack.docschina.org/loaders/less-loader)
- [react-hot-loader](https://github.com/gaearon/react-hot-loader)
- [normalize.css](https://github.com/necolas/normalize.css)
