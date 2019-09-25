import FetchReques, { log } from '@dyb881/fetch-request';
import { config, successCode } from 'config/request';

/**
 * 请求模块初始化并输出请求方法以及参数
 */
export const { baseURL, get, post, put, patch, del, upload } = new FetchReques({
  ...config,
  interceptorsRequest: config => {
    log.request(config);
    return config;
  },
  interceptorsResponse: (res, config) => {
    if (!res.errorText && config.responseType === 'json' && !successCode.includes(res.code)) {
      res.error = res.code;
      res.errorText = res.msg || res.message || '请求异常';
    }
    res.ok = !res.errorText; // 请求结果状态 成功/失败
    log.response(res, config, res.ok);
    return res;
  },
});
