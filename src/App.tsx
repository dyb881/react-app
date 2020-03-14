import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Pages } from 'common';

/**
 * Router 用于注册基础路由
 * Pages 路由页面集合
 */
const App = () => (
  <Router>
    <Pages />
  </Router>
);

// 热更新
export default process.env.NODE_ENV === 'development' ? hot(App) : App;
