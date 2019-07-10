import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

(async () => {
  let RenderApp = App;
  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    // 添加热更新
    const { hot } = await import('react-hot-loader/root');
    RenderApp = hot(App);
  }
  ReactDOM.render(<RenderApp />, document.getElementById('root'));
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
