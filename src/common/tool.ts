import React from 'react';

/**
 * 选项值
 */
export type TOption<T = any> = { value: T; label: React.ReactNode };

/**
 * 可被转为选项值
 */
export type TOptions<T = TOption> = T[] | (string | number)[] | object;

/**
 * 选项值 Props
 */
export type TOptionsProps<T = TOption> = {
  options?: TOptions<T>;
};

/**
 * 转为选项值
 * ['v1','v2'] => [{value: 1, label: 'v1'}, {value: 2, label: 'v2'}]
 */
export const toOptions = (options: TOptions) => {
  const isArray = Array.isArray(options);
  return Object.keys(options).map(k => {
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
export const useStates = <T extends any>(defaultStates: T) => {
  const reducer = (states: T, newStates: Partial<T> & { [key: string]: any }) => ({ ...states, ...newStates });
  const [states, dispatch] = React.useReducer(reducer, defaultStates);
  return { states, dispatch };
};
