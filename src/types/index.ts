import { RouteComponentProps } from 'react-router-dom';

/**
 * 路由组件
 */
export interface IRoute<P = {}> extends RouteComponentProps<P> {}

/**
 * 输入文本框
 */
export interface IInput<V = any> {
  value?: V;
  onChange?: (value: V) => void;
}
