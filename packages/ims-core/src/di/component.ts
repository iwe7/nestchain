import { makeDecorator, TypeDecorator } from 'ims-decorator';

export interface Component {
  /**组件的对外属性 是属性名到属性设置的映射表
   * 属性设置中可包含三个字段
   * type 表示属性类型
   * value 表示属性初始值
   * observer 表示属性值被更改时的响应函数
   */
  properties?: Object;
  /**组件的内部数据 和 properties 一同用于组件的模版渲染 */
  data?: Object;

  /**组件的方法 包括事件响应函数和任意的自定义方法 */
  methods?: {
    [others: string]: any;
  };
  /**类似于mixins和traits的组件间代码复用机制 */
  behaviors?: Array<string>;
  /**组件生命周期函数 在组件实例进入页面节点树时执行 注意此时不能调用 setData */
  created?: Function;
  /**组件生命周期函数 在组件实例进入页面节点树时执行 */
  attached?: Function;
  /**组件生命周期函数 在组件布局完成后执行 此时可以获取节点信息 */
  ready?: Function;
  /**组件生命周期函数 在组件实例被移动到节点树另一个位置时执行 */
  moved?: Function;
  /**组件生命周期函数 在组件实例被从页面节点树移除时执行 */
  detached?: Function;
  /**组件间关系定义 */
  relations?: Object;
  /**组件接受的外部样式类 */
  externalClasses?: Array<string>;
  /**一些组件选项 请参见文档其他部分的说明 */
  options?: Object;
  /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
  [others: string]: any;
}

export interface ComponentDecorator {
  (): TypeDecorator;
}

export const Component: ComponentDecorator = makeDecorator(
  'Component',
  'visitComponent',
  dir => dir,
);
