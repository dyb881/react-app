import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Pages from 'pages';
import 'App.css'; // CSS Reset 以及默认类
import 'App.less'; // 默认类

/**
 * 状态以及路由注入
 */
export default () => (
  <React.StrictMode>
    <Router>
      <Pages />
    </Router>
  </React.StrictMode>
);
