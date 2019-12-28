import { observable, action } from 'mobx';

/**
 * 视图
 */
export default class View {
  /**
   * 页面标题
   */
  @observable title: string = window.document.title;
  @action setTitle = (title: string) => {
    window.document.title = this.title = title;
  };
}
