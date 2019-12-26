import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Page } from 'common/routers';
import 'common/style'; // 默认全局样式

/**
 * Router 用于注册基础路由
 * Page 配置路由所生成的页面
 */
const App = () => (
  <React.StrictMode>
    <Router>
      <Page />
    </Router>
  </React.StrictMode>
);

// 热更新
export default process.env.NODE_ENV === 'development' ? hot(App) : App;
