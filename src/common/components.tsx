import React from 'react';

export type THoistProps = {
  childrenKey?: number;
  [key: string]: any;
};

/**
 * 可把 children 中对应 key 的 child 的 props 提升到该组件
 * 直接把 props 透传进去 对应 child
 * 目前仅支持一级组件
 */
export const HoistProps: React.FC<THoistProps> = ({ childrenKey = 0, children, ...props }) => {
  const childs = React.Children.toArray(children);

  if (React.isValidElement(childs[childrenKey])) {
    childs[childrenKey] = React.cloneElement(childs[childrenKey] as JSX.Element, props);
  }

  return <>{childs}</>;
};
