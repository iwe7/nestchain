import { bootstrap, ExpressConfig } from 'ims-platform-node';

/**
 * 优胜略汰
 * 尽自己所能，抢夺资源
 */

/**
 * 每个节点是一个神经元
 * 神经元通过突触与其他神经元相连接
 * 请求是电信号
 */
export class Cell {
  host: string;
  port: number;

  /**
   * 找朋友
   */
  discover() {}

  /**
   * 被找到
   */
  onDiscover() {}

  /**
   * 启动广播
   */
  bootstrap() {}
}
export class CellFactory {
  create() {
    return new Cell();
  }
}

bootstrap({
  providers: [
    {
      provide: ExpressConfig,
      useValue: {
        host: '127.0.0.1',
        port: 3008,
      },
    },
  ],
}).then(res => {
  console.log(res);
});
