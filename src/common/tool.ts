/**
 * 转为选项值
 * ['v1','v2'] => [{value: 1, label: 'v1'}, {value: 2, label: 'v2'}]
 */
export const toOptions = (options: any[] | any) =>
  Object.keys(options).map((k: any) =>
    typeof options[k] === 'object' ? options[k] : { label: options[k], value: +k || +k === 0 ? +k : k }
  );
