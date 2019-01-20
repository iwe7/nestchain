export class ImsIpfs {
  // todo remove any
  _repo: any;
  constructor() {
    // 启动ipfs
    this.boot();
  }
  /**
   * 启动
   */
  async boot() {
    // 打开repo
    let repoOpened = await this._repo.open();
    if (repoOpened) {
      await this.init();
      await this.onInit();
      await this.start();
      await this.onStart();
    }
  }

  /**
   * 初始化
   */
  async init() {}

  /**
   * 初始化时
   */
  async onInit() {}

  /**
   * 开始
   */
  async start() {}

  /**
   * 开始时
   */
  async onStart() {}

  /**
   * 停止
   */
  async stop() {}
}
