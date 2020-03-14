import View from './view';
import User from './user';

/**
 * 全局状态管理
 */
export default class Stores {
  /**
   * 状态初始化
   */
  // constructor() {
  //   // 默认为登录状态
  //   this.user.onLogin(true);
  // }

  /**
   * 视图
   */
  view = new View();

  /**
   * 用户
   */
  user = new User();
}
