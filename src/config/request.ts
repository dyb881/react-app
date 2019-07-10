import qs from 'qs';

const { search, protocol } = window.location;

/**
 * 是否生产环境
 */
export const isProduction = protocol === 'https:';

/**
 * 链接参数
 */
export const params = qs.parse(search.slice(1));

/**
 * 成功状态码
 */
export const successCode = [0, 200, '0000', 1000, 1001, 1002, 1003, 1004, 1005];

/**
 * 请求配置
 */
export const config = {
  host: 'https://www.test.com', // 生产地址
  apiPath: '/api', // API地址基础目录
};

// 非生产环境下，使用测试地址，并可以手动指定 host
if (!isProduction) {
  config.host = params.host || 'http://www.test.com'; // 测试地址
}
