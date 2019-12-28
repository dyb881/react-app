import { TRouters, TRoutersOptions, stores } from 'common';

/**
 * 默认标题
 */
const defaultTitle = '项目名';

/**
 * 路由地址配置
 */
export const routers: TRouters = [
  { to: '/', path: 'home', title: '首页' },
  { to: '/user', path: 'user' },
];

/**
 * 路由选项配置
 */
export const routersOptions: TRoutersOptions = {
  transition: true,
  type: 'hash',
  listen: ({ title }) => {
    stores.view.setTitle(title || defaultTitle);
  },
};
