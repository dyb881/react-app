/**
 * 路由导出
 * 路由地址：绑定组件路径。默认为 /src/pages 下的文件或文件夹
 */
const routers: any = {
  '/': 'home',
  '/user': 'user',
};

/**
 * 遍历并 require 页面
 */
Object.keys(routers).forEach(i => {
  routers[i] = require('pages/' + routers[i]).default;
});

export default routers;
