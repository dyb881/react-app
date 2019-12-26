import React from 'react';
import { combine } from 'common';

export default combine(({ stores }) => {
  console.log('刷新');
  return (
    <div>
      <div>{stores.view.number}</div>
      <button onClick={stores.view.add}>add</button>
    </div>
  );
});
