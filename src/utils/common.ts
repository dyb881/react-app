import { once } from 'lodash';

/**
 * 插入样式
 */
export const installLink = (href: string) =>
  new Promise((r) => {
    const script = document.createElement('link');
    script.rel = 'Stylesheet';
    script.href = href;
    script.onload = () => r();
    document.body.appendChild(script);
  });

/**
 * 插入脚本
 */
export const installScript = (src: string) =>
  new Promise((r) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => r();
    document.body.appendChild(script);
  });

/**
 * 单次限制
 */
export const installLinkOne = (href: string) => once(() => installLink(href));
export const installScriptOne = (src: string) => once(() => installScript(src));

/**
 * 读取cookies
 */
export const getCookie = (name: string) => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  let arr = document.cookie.match(reg);
  return arr ? decodeURI(arr[2]) : null;
};

/**
 * 批量读取cookies
 */
export const getCookies = (names: string[]) =>
  names.reduce((o: string[], i) => {
    o[o.length] = getCookie(i)!;
    return o;
  }, []);

/**
 * 写入 cookie
 * expiredays 过期时间/ms
 */
export const setCookie = (name: string, value: string, expiredays = 0, domain?: string) => {
  var exdate = new Date();
  exdate.setTime(+exdate + expiredays);
  document.cookie = `${name}=${escape(value)}${expiredays ? `;expires=${(exdate as any).toGMTString()}` : ''}${
    domain ? `;path=/;domain=${domain}` : ''
  }`;
};

/**
 * 批量写入 cookies
 */
export const setCookies = (data: any, expiredays = 0, domain?: string) => {
  Object.keys(data).forEach((name) => {
    setCookie(name, data[name], expiredays, domain);
  });
};
