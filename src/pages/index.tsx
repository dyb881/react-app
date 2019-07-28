import React from 'react';
import routers from 'config/routers';
import Router from '@dyb881/router';
import '@dyb881/router/lib/style.css';

/**
 * 全局布局以及路由注册
 */
export default () => <Router routers={routers} />;
