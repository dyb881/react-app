import qs from 'qs';

const { search, protocol } = window.location;

/**
 * 是否生产环境
 */
export const isProduction = protocol === 'https:';

/**
 * 链接参数
 * http://localhost?val=1 => params = {val: 1}
 */
export const params = qs.parse(search.slice(1));
