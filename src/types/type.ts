/**
 * 必填
 */
export type TRequired<T extends object> = {
  [K in keyof T]-?: T[K];
};

/**
 * 非必填
 */
export type TNotRequired<T extends object> = {
  [K in keyof T]+?: T[K];
};

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
export type TInputNotRequired<T = any> = TNotRequired<TInput<T>>;