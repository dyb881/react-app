import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="fill" style={{ backgroundColor: '#f00' }}>
      页面 <Link to="/">go Home</Link>
    </div>
  );
};
