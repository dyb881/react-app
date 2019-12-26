import { observable, action, when } from 'mobx';

/**
 * 用户
 */
export default class User {
  /**
   * 是否登录
   */
  @observable isLogin: boolean = false;

  /**
   * 登陆状态监听
   */
  @action onLogin = (bind: boolean | (() => void)) => {
    if (typeof bind === 'boolean') {
      this.isLogin = bind;
    } else {
      when(() => this.isLogin, bind);
    }
  };
}
