import React from 'react';
import { matchPath, HashRouter, HashRouterProps, BrowserRouter, BrowserRouterProps } from 'react-router-dom';
import { createHashHistory, createBrowserHistory } from 'history';
import { routers, routersOptions } from 'configs/routers';
import Routers from '@dyb881/router';
import '@dyb881/router/lib/style.css';

/**
 * 单个路由属性
 */
export type TRouter = {
  to: string; // 路由地址
  path: string; // 绑定组件路径，默认为 /src/pages 下的文件或文件夹
  [key: string]: any;
};

/**
 * 路由配置数组
 */
export type TRouters = TRouter[];

/**
 * 路由选项
 */
export type TRoutersOptions = {
  app?: boolean; // 是否打包成APP，既启用app模拟跳转
  transition?: boolean; // 开启跳转动画
  type: 'hash' | 'browser'; // 路由类型
  listen?: (router: TRouter) => void; // 路由监听
};

/**
 * 匹配路由响应监听
 */
const createMatch = (routers: TRouters) => (pathname: string, listen: TRoutersOptions['listen']) => {
  for (const router of routers) {
    if (matchPath(pathname, { path: router.to, exact: true }) && listen) {
      // 匹配并响应对应路由配置
      listen(router);
      break;
    }
  }
};

/**
 * 路由配置生成组件配置
 */
const createRouters = (routers: TRouters, { type, listen, ...routersProps }: TRoutersOptions) => {
  // 路由组件配置
  const routersConfig: { [key: string]: React.ComponentType<any> } = {};

  // 引用页面并写入路由
  routers.forEach(router => {
    routersConfig[router.to] = require('pages/' + router.path).default;
  });

  // 创建比较方法
  const match = createMatch(routers);
  // 创建路由
  const history = type === 'hash' ? createHashHistory() : createBrowserHistory();

  // 初次匹配
  match(history.location.pathname, listen);

  // 监听地址变动
  history.listen(({ pathname }) => {
    match(pathname, listen);
  });

  /**
   * 路由注入
   */
  const Router: React.FC<HashRouterProps & BrowserRouterProps> = props =>
    type === 'hash' ? <HashRouter {...props} /> : <BrowserRouter {...props} />;

  /**
   * 路由页面集合
   */
  const Pages: React.FC = () => <Routers routers={routersConfig} {...routersProps} />;

  return { Router, Pages };
};

/**
 * 路由配置生成
 */
export const { Router, Pages } = createRouters(routers, routersOptions);
