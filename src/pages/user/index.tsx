import React from 'react';
import { Link } from 'react-router-dom';

export default class extends React.Component {
  render() {
    return (
      <div className="fill" style={{ backgroundColor: '#f00' }}>
        页面 <Link to="/home">go Home</Link>
      </div>
    );
  }
}
