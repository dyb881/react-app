import React from 'react';
import routers from 'configs/routers';
import Router from '@dyb881/router';
import '@dyb881/router/lib/style.css';

/**
 * 全局布局以及路由注册
 */
export default class extends React.Component {
  render() {
    return (
      <div className="fill">
        <Router routers={routers} transition />
      </div>
    );
  }
}
