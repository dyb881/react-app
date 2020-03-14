import React, { useEffect } from 'react';
import { matchPath, HashRouter, HashRouterProps, BrowserRouter, BrowserRouterProps } from 'react-router-dom';
import { createHashHistory, createBrowserHistory } from 'history';
import { routers, routersOptions } from './config';
import Routers from '@dyb881/router';
import '@dyb881/router/lib/style.css';
export * from './config';

/**
 * 单个路由属性
 */
export type TRouter = {
  to: string; // 路由地址
  path?: string; // 绑定组件路径，默认为 /src/pages 下的文件或文件夹
  component?: React.ComponentType<any>; // 绑定组件，优先度低于 path
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
 * 路由组件
 */
const routersComponents: { [key: string]: React.ComponentType<any> } = {};

// 引用页面并写入路由
routers.forEach(({ to, path, component }) => {
  if (path) routersComponents[to] = require('pages/' + path).default;
  else if (component) routersComponents[to] = component;
});

const { type, listen, ...routersProps } = routersOptions;

/**
 * 路由类型
 */
export const history = type === 'hash' ? createHashHistory() : createBrowserHistory();

/**
 * 匹配路由响应监听
 */
const match = (pathname = history.location.pathname) => {
  for (const router of routers) {
    if (matchPath(pathname, { path: router.to, exact: true })) {
      listen?.(router); // 匹配并响应对应路由配置
      break;
    }
  }
};

/**
 * 路由页面集合
 */
export const Pages: React.FC = () => <Routers routers={routersComponents} {...routersProps} />;

/**
 * 路由注入
 */
export const Router: React.FC<HashRouterProps & BrowserRouterProps> = props => {
  useEffect(() => {
    if (!listen) return;
    match(); // 初次匹配
    history.listen(({ pathname }) => match(pathname)); // 监听地址变动
  }, []);

  return type === 'hash' ? <HashRouter {...props} /> : <BrowserRouter {...props} />;
};
