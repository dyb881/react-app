/**
 * 路由绑定组件路径
 */
export type TRoutersConfig = {
  to: string; // 路由地址
  path: string; // 绑定组件路径，默认为 /src/pages 下的文件或文件夹
};

/**
 * 路由原始配置
 */
export const routersConfig: TRoutersConfig[] = [
  {
    to: '/',
    path: 'home',
  },
  {
    to: '/user',
    path: 'user',
  },
];

/**
 * 路由配置生成
 */
export const routers = routersConfig.reduce(
  (routers, router) => {
    const page = require('pages/' + router.path).default;
    routers[router.to] = page;
    return routers;
  },
  {} as {
    [key: string]: React.ComponentType<any>;
  }
);
