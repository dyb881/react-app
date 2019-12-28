# react-app

降低 react 开发门槛，并规范化开发，固定的路由配置和全局状态管理，形成一个整体的开发套路<br>
主要成员 create-react-app + typescript + react-router-dom + mobx<br>
如果觉得上一个版本更香的话，可跳转[v1 分支](https://github.com/dyb881/react-app/tree/v1)<br>

## 学习使用

- [react 的基础知识和常用包](https://github.com/dyb881/recommended)
- [环境配置](https://github.com/dyb881/react-app/blob/master/doc/SETTING.md)（可选）
- [使用教程](https://github.com/dyb881/react-app/blob/master/doc/TUTORIAL.md)

## 使用方法

```
yarn start // 运行开发环境
yarn build // 打包代码
yarn start:https // 运行 https 的开发环境
yarn build:test // 打包测试环境，一般情况下需要修改资源地址
yarn build:production // 打包不产生映射文件的代码
yarn analyze // 分析包的大小
yarn serve // 运行静态文件服务器，并指向 build 文件夹
```

## 环境说明

基础环境主要是在 npx create-react-app my-app --template typescript 的基础上追加了一些功能

- 热更新（即 start 后，保存文件会导致对应组件自动刷新更改，而不刷新整个页面，并保留全局状态）
- tsconfig.json ts 编译配置（追加装饰器和迭代器支持，以及遇到未使用变量报错）
- antd antd-mobile lodash 三个常用依赖的按需加载
- less 文件加载，以及主题色设置
- normalize.css 样式初始化
- index.html 默认添加：移动端禁止缩放、收藏栏图标、手机号码识别禁止、等相关属性设置
- prettier 格式化配置（实际使用需要在 IDE 上安装 prettier）
- eslint 可二次配置（需要在 package.json 中配置）
- 可自定义 webpack 配置
  - 默认在生产模式中 drop_console 删除 console 语句

## src 目录结构

开发项目过程中，一般只会在 src 文件夹下进行开发（未说明的文件一般情况下无需理会）

- apis - 所有接口统一在此封装
- common - 框架核心，该文件夹内的文件非必要情况下不需要更改，框架的工具和组件均由此导出
  - style - 全局样式，在 App.tsx 中会被单独引用
  - request - 请求器初始化生成
  - routers - 路由生成
  - stores - 状态初始化，状态关联函数和状态关联装饰器生成
- components - 业务组件封装（指会被多次使用或独立于页面外的组件，页面独有组件建议在页面文件夹内开发）
- configs - 全局配置，
  - common - 常用配置
  - request - 请求相关配置（主要在 common/request 中使用）
  - routers - 路由配置（主要在 common/routers 中使用）
- images - 项目存放图片的地方
- pages - 页面（一般情况下项目以页面为单位创建文件夹，然后在 configs/routers 中配置即可）
- stores - 状态树定义（主状态下有多个子状态，主状态的构造函数执行状态初始化）
- App.tsx - 页面入口，除了布局组件的插入，一般不会变动
- react-app-env.d.ts - 全局类型声明
