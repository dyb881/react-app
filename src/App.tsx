import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Pages from 'pages';
import 'normalize.css';
import 'App.less';
import { user } from 'api';

user.login({});

/**
 * 状态以及路由注入
 */
export default () => (
  <Router>
    <Pages />
  </Router>
);
