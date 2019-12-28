import React from 'react';
import { Link } from 'react-router-dom';
import { combine } from 'common';
import style from './style.module.less';

export default combine(({ stores }) => {
  return (
    <div className={style.box}>
      Home <Link to="/user">go User</Link>
      <div>{stores.view.number}</div>
      <button onClick={stores.view.add}>add</button>
    </div>
  );
});
