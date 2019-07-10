import React from 'react';
import { Link } from 'react-router-dom';

export default class extends React.Component {
  render() {
    return (
      <div className="fill" style={{ backgroundColor: '#ff0' }}>
        页面 <Link to="/user">go User</Link>
      </div>
    );
  }
}
