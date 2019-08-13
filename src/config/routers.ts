/*
 * 路由绑定组件路径
 * 默认为 /src/pages 下的文件或文件夹
 */
const routersPaths: {
  // 路由地址：绑定组件路径
  [path: string]: string;
} = {
  '/': 'home',
  '/user': 'user',
};

/**
 * 路由配置
 */
const routers = Object.keys(routersPaths).reduce(
  (routers, path) => {
    const page = require('pages/' + routersPaths[path]).default;
    routers[path] = page;
    return routers;
  },
  {} as {
    [key: string]: React.ComponentType<any>;
  }
);

export default routers;
