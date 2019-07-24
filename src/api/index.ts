import { post } from './request';

/**
 * 用户
 */
export const user = {
  login: (data: {
    username: string;
    password: string;
  }): Promise<{
    code: number;
    msg: string;
    data: {
      name: string;
      phone: number;
      age: number;
      [key: string]: any;
    };
  }> => post('/login', data, '登录'),
};
