import { makeDecorator, TypeDecorator } from 'ims-decorator';

interface LaunchData {
  /**打开小程序的路径 */
  path: string;
  /**打开小程序的query */
  query: object;
  /**打开小程序的场景值 */
  scene: number;
  shareTicket: string;
}

export interface App {
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时 会触发 onLaunch（全局只触发一次）
   */
  onLaunch?: (info: LaunchData) => void;
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动 或从后台进入前台显示 会触发 onShow
   */
  onShow?: (info: LaunchData) => void;
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台 会触发 onHide
   */
  onHide?: Function;
  /**
   * 错误监听函数
   * 当小程序发生脚本错误 或者 api 调用失败时 会触发 onError 并带上错误信息
   */
  onError?: Function;
  /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
  [others: string]: any;
}

export interface AppDecorator {
  (): TypeDecorator;
}

export const App: AppDecorator = makeDecorator('App', 'visitApp', dir => dir);
