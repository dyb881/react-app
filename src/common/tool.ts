/**
 * 转为选项值
 */
export const toOptions = (options: any[] | any) =>
  Object.keys(options).map((k: any) =>
    typeof options[k] === 'object' ? options[k] : { label: options[k], value: +k || +k === 0 ? +k : k }
  );
