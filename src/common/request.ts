import FetchReques, { log } from '@dyb881/fetch-request';
import { requestConfig, statusCodeKeys, successCodes, messageKeys } from 'configs';

const { interceptorsRequest, interceptorsResponse, ...config } = requestConfig;

/**
 * 请求模块初始化并输出请求方法以及参数
 */
export const { baseURL, get, post, put, patch, del, upload } = new FetchReques({
  ...config,
  interceptorsRequest: config => {
    if (interceptorsRequest) config = interceptorsRequest(config);
    log.request(config);
    return config;
  },
  interceptorsResponse: (res, config) => {
    if (!res.errorText && config.responseType === 'json') {
      // 获取匹配的 code
      const code = statusCodeKeys.reduce((code, key) => res[key] ?? code, undefined);
      // 当 code 匹配成功状态码失败，既是请求失败
      if (!successCodes.includes(code!)) {
        res.error = code;
        // 获取错误提示信息
        res.errorText = messageKeys.reduce((msg, key) => res[key] || msg, '请求异常');
      }
    }
    res.ok = !res.errorText; // 请求结果状态 成功/失败
    if (interceptorsResponse) res = interceptorsResponse(res, config);
    log.response(res, config, res.ok);
    return res;
  },
});
