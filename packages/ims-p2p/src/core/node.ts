import { Subject } from 'ims-rxjs';

export class Node extends Subject<any> {
  constructor() {
    super();
  }
  /**
   * 其他节点链接本节点
   */
  connect() {}
  /**
   * 娶她节点取消链接本节点
   */
  disconnect() {}
  /**
   * 发现节点
   */
  discovery() {}
  /**
   * 开始
   */
  start() {}
  /**
   * 结束
   */
  stop() {}
}
