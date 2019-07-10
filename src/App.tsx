import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Pages from 'pages';
import 'normalize.css';
import 'App.less';

/**
 * 状态以及路由注入
 */
export default () => (
  <Router>
    <Pages />
  </Router>
);

