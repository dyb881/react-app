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
