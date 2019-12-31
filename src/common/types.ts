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