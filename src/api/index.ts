import { post } from './request';

/**
 * 用户
 */
export const user = {
  login: (data: any) => post('/login', data, '登录'),
};
