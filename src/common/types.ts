import React from 'react';

/**
 * 输入文本框
 */
export type TInput<T = any> = {
  value: T;
  onChange(value: T): void;
};

/**
 * 输入文本框 - 非必填
 */
export type TInputNotRequired<T = any> = Partial<TInput<T>>;

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
 * 原生 HTML 标签属性
 */
export type THTMLAttr<T = HTMLElement> = React.HTMLAttributes<T>;

/**
 * 原生 HTML 标签 Props
 */
export type THTMLProps<T = HTMLElement> = React.FC<THTMLAttr<T>>;
