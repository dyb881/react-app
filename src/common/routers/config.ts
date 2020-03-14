import { TRouters, TRoutersOptions } from './';
import { stores } from '../stores';

/**
 * 默认标题
 */
export const defaultTitle = '项目名';

/**
 * 路由地址配置
 * 绑定组件路径 path，默认为 /src/pages 下的文件或文件夹
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
