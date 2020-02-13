import { observable, action } from 'mobx';

/**
 * 视图
 */
export default class View {
  /**
   * 页面标题
   */
  @observable title = window.document.title;
  @action setTitle = (title: string) => {
    window.document.title = this.title = title;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.onload = () => setTimeout(iframe.remove, 0);
    document.body.removeChild(iframe);
  };
}
