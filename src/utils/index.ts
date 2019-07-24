/**
 * 暂停
 */
export const sleep = (outTime: number) => new Promise(r => setTimeout(r, outTime));

/**
 * 根据键值列表获取一个新的对象
 */
export const getKeysData = <T>(data: T, keys: (keyof T)[]) =>
  keys.reduce(
    (v, r) => {
      v[r] = data[r];
      return v;
    },
    {} as T
  );
