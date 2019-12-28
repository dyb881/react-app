import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      Home <Link to="/user">go User</Link>
    </div>
  );
};
