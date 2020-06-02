import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.less';

export default () => {
  return (
    <div className={`page ${style.page}`}>
      Home <Link to="/user">go User</Link>
    </div>
  );
};
