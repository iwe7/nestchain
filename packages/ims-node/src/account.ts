/**
 * 公众号核心类
 */
export abstract class ImsAccount {
  /**
   * 创建平台特定的公众号操作对象
   */
  static create(accountId: string) {}
}
