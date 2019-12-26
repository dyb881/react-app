# react-app 开发环境配置

一个好的项目，应该有一个健全的开发环境。<br>
在开发过程中提供规范化限制以及高度拓展性。<br>

## 基础开发环境

使用官方脚手架 [create-react-app](https://github.com/facebook/create-react-app) 搭建主体，推荐使用 ts 模版，类型检查的代码更优美。<br>
实际上开发过程引用 js/jsx 的文件一样可以正常使用。<br>

```
npx create-react-app my-app --template typescript
```

## 拓展配置（拒绝 eject）

采用 [react-app-rewired](https://github.com/timarney/react-app-rewired/blob/master/README_zh.md) + [customize-cra](https://github.com/arackaf/customize-cra/blob/master/api.md) 进行二次配置<br>
[完整配置 config-overrides.js](https://github.com/dyb881/react-app/blob/master/config-overrides.js)

```
yarn add react-app-rewired customize-cra
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

babel-plugin-import 则是适用于 babel 的模块化导入插件<br>
目前使用到该功能的依赖，一般为：antd、antd-mobile、lodash<br>
在使用时自行安装依赖即可<br>

```
yarn add babel-plugin-import
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

```
yarn add less less-loader
```

config-overrides.js 配置

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

less 在 ts 中使用 CSS Modules<br>
虽然 create-react-app 中的样式文件只要带上 module 就可以使用 CSS Modules<br>
但是需要在声明文件中添加 declare module，才能够被 ts 文件识别<br>
在 /src/react-app-env.d.ts 中添加

```javascript
declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

</details>

<details>
<summary>二次配置 eslint</summary>

在实际开发中，因为不得已的情况，需要自定义部分 eslint 规则限制的时候，添加如下配置<br>

config-overrides.js 配置

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

customize-cra 提供的工具终究是有限的，这时候就需要更加灵活的自定义配置<br>
webpack-merge 是针对 webpack 设计的配置合并工具<br>

```
npm i webpack-merge
```

config-overrides.js 配置

```javascript
const Merge = require('webpack-merge');
const { override } = require('customize-cra');

module.exports = override(config => {
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
});
```

</details>

<details>
<summary>添加热更新</summary>

```
yarn add react-hot-loader @hot-loader/react-dom
```

/src/App.tsx

```javascript
import { hot } from 'react-hot-loader/root';

// 开发环境时导出热更新组件
export default process.env.NODE_ENV === 'development' ? hot(App) : App;
```

config-overrides.js 配置

```javascript
const Merge = require('webpack-merge');
const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
    // 编译热更新
    addBabelPlugin('react-hot-loader/babel'),
    config => {
        if (process.env.NODE_ENV === 'production') {
        } else {
            // 开发模式下的配置
            config = Merge(config, { resolve: { alias: { 'react-dom': '@hot-loader/react-dom' } } });
        }

        // 返回更改后的配置
        return config;
    }
);
```

</details>

<details>
<summary>tsconfig.json 配置</summary>

详情请查阅[配置说明](https://www.tslang.cn/docs/handbook/tsconfig-json.html)<br>
需要特别注意的是 baseUrl 设置为 src 后，可使用非相对路径来导入你的外部依赖<br>
如 import 'common' 时，会先在 src 文件夹内检索是否有对应文件或文件夹，找不到才会去 node_modules 寻找外部依赖<br>
详情请查看[模块解析](https://www.tslang.cn/docs/handbook/module-resolution.html)<br>

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
<summary>prettier 格式化配置</summary>

代码的格式化就和代码的规范化一样重要，大大提高了代码的可读性和可维护性<br>
推荐使用 prettier 格式化插件，是现有争议最小的格式化插件<br>
自行查阅如何在 ide 上安装和使用 prettier<br>

在 package.json 中追加配置，可覆盖插件的个性化配置，以项目配置为准

```javascript
{
  "prettier": {
    "printWidth": 120,
    "singleQuote": true,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "parser": "babylon",
    "semi": true,
    "requirePragma": false
  },
}
```

</details>

## index.html 文件的属性设置

主要是设置：移动端禁止缩放、收藏栏图标、手机号码识别禁止、等相关属性设置<br>
更多详情，请查看文件[/public/index.html](https://github.com/dyb881/react-app/blob/master/public/index.html)

## 拓展 scripts 命令行

我们可以使用 scripts 命令行和[环境变量](https://create-react-app.dev/docs/advanced-configuration)，更加灵活的进行开发<br>
推荐全局安装以下依赖

```
npm i -g source-map-explorer serve
```

```javascript
{
  "scripts": {
    ...,
    "start:https": "HTTPS=true yarn start", // 运行 https 的开发环境
    "build:test": "PUBLIC_URL=. yarn build", // 打包测试环境，一般情况下需要修改资源地址
    "build:production": "GENERATE_SOURCEMAP=false yarn build:test", // 在生产环境中一般不产生映射文件
    "analyze": "source-map-explorer 'build/static/js/*.js'", // 分析包的大小
    "serve": "serve -s build" // 运行静态文件服务器，并指向 build 文件夹
  },
}
```
