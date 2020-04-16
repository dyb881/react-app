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
