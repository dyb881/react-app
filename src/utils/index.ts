/**
 * 暂停
 */
export const sleep = (outTime: number) => new Promise(r => setTimeout(r, outTime));

/**
 * 根据键值列表获取一个新的对象
 */
export const getKeysData = (data: any, keys: any[]) =>
  keys.reduce((v: any, r: any) => {
    v[r] = data[r];
    return v;
  }, {});
