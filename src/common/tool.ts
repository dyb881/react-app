import React from 'react';
import { TOptions } from './types';

/**
 * 转为选项值
 * ['v1','v2'] => [{value: 1, label: 'v1'}, {value: 2, label: 'v2'}]
 */
export const toOptions = (options: TOptions) => {
  const isArray = Array.isArray(options);
  return Object.keys(options).map((k) => {
    const option = (options as any)[k];
    if (typeof option === 'object') return option;
    return { label: option, value: isArray ? +k : k };
  });
};

/**
 * 判断是否有效 react 组件
 */
export const isElement = (e: any): e is JSX.Element => {
  return React.isValidElement(e);
};

/**
 * 仿 class state 的 hooks
 * 新状态会合并到原状态
 */
export const useStates = <T extends object>(defaultStates: T) => {
  const reducer = (states: T, newStates: Partial<T> & { [key: string]: any }) => ({ ...states, ...newStates });
  const [states, setStates] = React.useReducer(reducer, defaultStates);
  return { states, setStates };
};
