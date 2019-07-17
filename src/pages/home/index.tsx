import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.less';

export default class extends React.Component {
  render() {
    return (
      <div className={`fill ${style.box}`}>
        页面 <Link to="/user">go User</Link>
      </div>
    );
  }
}
