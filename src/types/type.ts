/**
 * 必填
 */
export type TRequired<T extends object> = {
  [K in keyof T] -?: T[K];
}

/**
 * 非必填
 */
export type TNotRequired<T extends object> = {
  [K in keyof T] +?: T[K];
}