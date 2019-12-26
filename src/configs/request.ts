import { TFetchRequestConfig } from '@dyb881/fetch-request';
import { isProduction, params } from './common';

/**
 * 生产地址
 */
export let host = 'https://www.test.com';

// 非生产环境下，使用测试地址，并可以手动指定 host
if (!isProduction) {
  host = params.host || 'http://www.test.com'; // 测试地址
}

/**
 * 状态码 key
 * 返回结果中，用于匹配状态码的 key
 */
export const statusCodeKeys = ['code'];

/**
 * 成功状态码
 * 决定请求器响应结果 res.ok:boolean 返回的值
 */
export const successCodes = [0, '0', 200, '0000', 1000, 1001, 1002, 1003, 1004, 1005, 2000];

/**
 * 错误信息字段
 */
export const messageKeys = ['msg', 'message'];

/**
 * 请求参数配置
 */
export const requestConfig: TFetchRequestConfig = {
  host, // API 地址
  apiPath: '/api', // API 目录
};
