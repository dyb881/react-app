import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Pages from 'pages';
import 'normalize.css';
import 'App.less';

/**
 * 注入层
 */
export default () => (
  <Router>
    <Pages />
  </Router>
);

