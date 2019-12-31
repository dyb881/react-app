import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.less';

export default () => {
  return (
    <div className={`page ${style.box}`}>
      Home <Link to="/user">go User</Link>
      {[...Array(20).keys()].map(i => (
        <input type="text" key={i} placeholder={`键盘弹出测试${i + 1}`} />
      ))}
    </div>
  );
};
