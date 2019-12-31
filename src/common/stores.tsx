import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { configure } from 'mobx';
import { observer } from 'mobx-react';
import Stores from 'stores';

/**
 * 全局设置
 */
configure({
  enforceActions: 'observed', // 只有被定义为动作的方法才能修改监听值
  computedRequiresReaction: true, // 计算值内必须使用监听值
});

/**
 * 全局状态类型
 */
type TStores = { stores: Stores };

/**
 * 全局状态
 */
export const stores = new Stores();

/**
 * 状态联合到组件（函数组件）
 * 使用后状态变更时会刷新两次组件，build 后就不会有这情况了，可放心开发
 */
export const combine = <P extends object>(Component: React.FC<P & TStores>) => {
  // 生成观察者组件
  const Observer = observer(Component);
  // 注入全局状态
  const Combine: React.FC<P> = props => <Observer {...props} stores={stores} />;
  return Combine;
};

/**
 * 状态 Props
 */
export type TStoresProps = Partial<TStores>;

/**
 * 状态联合到组件（类装饰器）
 * 使用后状态变更时会刷新两次组件，build 后就不会有这情况了，可放心开发
 */
export const Combine = <P extends object>(Component: React.ComponentClass<P & TStoresProps>) => {
  // 生成观察者组件
  const Observer = observer(Component);
  // 注入全局状态
  class Combine extends React.Component<P> {
    render = () => <Observer {...this.props} stores={stores} />;
  }
  return Combine;
};

/**
 * 在原有基础上加入路由类型定义
 */
export const combinePage = <P extends object>(Component: React.FC<P & TStores & RouteComponentProps>) => {
  return combine(Component);
};
