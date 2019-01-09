import { makeDecorator, TypeDecorator } from 'ims-decorator';
// #region interfaces
interface CallbackParam {
  /**接口调用成功的回调函数 */
  success?: (res?: any) => void;
  /**接口调用失败的回调函数 */
  fail?: (res?: any) => void;
  /**接口调用结束的回调函数(调用成功/失败都会执行) */
  complete?: Function;
}

interface CallbackWithErrMsgParam extends CallbackParam {
  success?: (res?: { /**成功：ok 错误：详细信息 */ errMsg: string }) => void;
}

/**自定以分享内容 */
interface PageShareData extends CallbackWithErrMsgParam {
  /**分享标题 默认 当前小程序名称 */
  title?: string;
  /**分享描述 默认 当前小程序名称 */
  desc?: string;
  /**分享路径 当前页面 path 必须是以 / 开头的完整路径 */
  path?: string;
  /**自定义图片路径 可以是本地文件路 代码包文件路径或者网络图片路径 支持PNG及JPG 不传入 imageUrl 则使用默认截图 */
  imageUrl?: string;
  success?: (res?: { errMsg: string; shareTickets?: Array<string> }) => void;
}

interface Target {
  /**组件的id */
  id: string;
  /**组件的类型 */
  tagName: string;
  /**组件上由`data-`开头的自定义属性组成的集合 */
  dataset: any;
}

export interface PageDecorator {
  (): TypeDecorator;
}

export const Page: PageDecorator = makeDecorator(
  'Page',
  'visitPage',
  dir => dir,
);

export class ImsPage {
  constructor() {}
  setData(data: any) {}
}

export interface Page {
  /**页面的初始数据 */
  data?: Object;
  /**生命周期函数--监听页面加载 */
  onLoad?: Function;
  /**生命周期函数--监听页面初次渲染完成 */
  onReady?: Function;
  /**生命周期函数--监听页面显示 */
  onShow?: Function;
  /**生命周期函数--监听页面隐藏 */
  onHide?: Function;
  /**生命周期函数--监听页面卸载 */
  onUnload?: Function;
  /**页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh?: Function;
  /**页面上拉触底事件的处理函数 */
  onReachBottom?: Function;
  /**
   * 设置该页面的分享信息
   * * 只有定义了此事件处理函数 右上角菜单才会显示“分享”按钮
   * * 用户点击分享按钮的时候会调用
   * * 此事件需要 return 一个 Object 用于自定以分享内容
   */
  onShareAppMessage?: (
    options?: { from: string; target: Target },
  ) => PageShareData;
  /**页面滚动触发事件的处理函数 */
  onPageScroll?: Function;

  /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
  [others: string]: any;
}
