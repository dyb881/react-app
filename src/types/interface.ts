/**
 * 输入文本框
 */
export interface IInput<V = any> {
  value?: V;
  onChange?: (value: V) => void;
}
