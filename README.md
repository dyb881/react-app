# react-app

create-react-app + react-app-rewired 进行二次配置：按需加载、less-loader、启用 eslint 配置、特殊自定义配置

## 用途

给 create-react-app 做出一个更完善的配置功能，对于 src 内的代码不做出任何建议

## 用法

```
git clone https://github.com/dyb881/react-app [项目名称]
```

## 拓展功能

除了 create-react-app --typescript 已有的功能外，主要拓展了以下功能：

- prettier 格式化配置
- homepage 打包路径设置
- tsconfig.json ts 编译配置
- antd antd-mobile lodash 三个常用依赖的按需加载
- less 文件加载
- eslint 可二次配置
- 可自定义 webpack 配置
  - 默认在生产模式中配置了代码压缩
- 添加 postcss 插件
  - 添加 postcss-pxtorem（注！非默认，需手动清除注释）
- index.html 默认添加：移动端禁止缩放、收藏栏图标、手机号码识别禁止、等相关属性设置

## 搭建过程

虽然以下配置过程都是用 npm，但是实际使用时，推荐 yarn

### 环境初始化

由于可兼容 js/jsx/ts/tsx 开发，并同步支持 eslint 检测<br>
创建时直接使用 ts 环境即可

```
npx create-react-app react-app --typescript
```

### package.json 追加配置

```
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

### tsconfig.json 配置

相关配置自行查阅<br>
需要特别注意的是 baseUrl 设置为 src 后，可使用非相对路径来导入你的外部依赖<br>
如 import 'App.css' 时，会先在 src 文件夹内检索是否有对应文件或文件夹，找不到才会去 node_modules 寻找外部依赖

```
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

### 二次拓展配置（no eject）

为了不 eject，导致脚手架无法升级，采用 react-app-rewired 二次拓展配置<br>
customize-cra 是基于 react-app-rewired 核型，提供了一组实用工具用于定制配置<br>
[完整配置 config-overrides.js](https://github.com/dyb881/react-app/blob/master/config-overrides.js)

#### install 所需依赖

```
npm i react-app-rewired customize-cra
```

#### 修改 package.json 文件

```
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
}
```

#### 创建 config-overrides.js

```
const { override } = require('customize-cra');

module.exports = override();
```

#### 按需加载

目前使用到该功能的依赖，一般为：antd、antd-mobile、lodash<br>
所以这里会默认依赖这三个，只要在项目内未 import，是不会参与打包的，所以不必有过多的顾虑<br>
babel-plugin-import 则是适用于 babel 的模块化导入插件

```
npm i antd antd-mobile lodash @types/lodash babel-plugin-import
```

#### 按需加载 配置

```
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  // 按需加载
  fixBabelImports('antd', { libraryDirectory: 'es', style: true }),
  fixBabelImports('antd-mobile', { libraryDirectory: 'es', style: true }),
  fixBabelImports('lodash', { libraryDirectory: '' })
);
```

#### 安装 less 和 less-loader

```
npm i less less-loader
```

#### less-loader

```
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  // 添加 less-loader
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {}, // 全局 less 变量，会覆盖项目内同名变量，可用于主题定制
  })
);
```

#### less 在 ts 中使用 CSS Modules

虽然 create-react-app 中的样式文件只要带上 module 就可以使用 CSS Modules<br>
但是需要在声明文件中添加 declare module，才能够被 ts 文件识别<br>
在 /src/react-app-env.d.ts 中添加

```
declare module '*.module.less' {
  const classes: {
    [key: string]: string;
  };
  export default classes;
}
```

#### 二次配置 eslint

在实际开发中，因为不得已的情况，需要自定义部分 eslint 规则限制的时候，添加如下配置<br>

```
const { override, useEslintRc } = require('customize-cra');

module.exports = override(
  // 允许二次配置 eslint
  useEslintRc()
);
```

在 package.json 中配置 eslint

```
{
  "eslintConfig": {
    "extends": "react-app",
    "rules": {}
  },
}
```

#### 自定义配置

customize-cra 提供的工具十分有限，这时候就需要更加灵活的自定义配置<br>
webpack-merge 是针对 webpack 设计的 merge 工具<br>

```
npm i webpack-merge
```

```
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

#### 代码压缩

生产模式需要关闭 map 的输出，删除所有的 `console` 语句

```
npm i webpack-parallel-uglify-plugin
```

```
const Merge = require('webpack-merge');
const { override } = require('customize-cra');

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = override(
  config => {
    // 自定义配置
    config = Merge(config, {});

    if (process.env.NODE_ENV === 'production') {
      // 生产模式下的配置
      config = Merge(config, {
        optimization: {
          minimizer: [
            // 多进程压缩
            new ParallelUglifyPlugin({
              // 缓存压缩后的结果
              cacheDir: '.cache/',
              uglifyJS: {
                output: {
                  // 最紧凑的输出
                  beautify: false,
                  // 删除所有的注释
                  comments: false,
                },
                compress: {
                  // 删除所有的 `console` 语句，可以兼容ie浏览器
                  drop_console: true,
                  // 内嵌定义了但是只用到一次的变量
                  collapse_vars: true,
                  // 提取出出现多次但是没有定义成变量去引用的静态值
                  reduce_vars: true,
                },
              },
            }),
          ],
        },
      });
    } else {
      // 开发模式下的配置
      config = Merge(config, {});
    }

    // 返回更改后的配置
    return config;
  }
);
```

#### 添加 postcss 插件（自行根据实际情况加入）

addPostcssPlugins 必须放在 addLessLoader 或样式相关的配置后面

```
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

### index.html 文件的属性设置

主要是设置：移动端禁止缩放、收藏栏图标、手机号码识别禁止、等相关属性设置<br>
更多详情，请查看文件[/public/index.html](https://github.com/dyb881/react-app/blob/master/public/index.html)

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
- [webpack-parallel-uglify-plugin](https://github.com/gdborton/webpack-parallel-uglify-plugin)
