export class ImsDb {
  /**
   * 连接指定的路径的主机
   */
  connect(address: string) {}
  /**
   * 提供操作者的身份;
   */
  as(item: { secret: string; address: string }) {}
  /**
   * 切换表的所有者（即后续操作的上下文），默认表的所有者为操作者
   * @param address
   */
  use(address: string) {}
  /**
   * 设置是否使用严格模式，默认为非严格模式；在严格模式下，语句共识通过的条件是期望的快照HASH与预期一致
   * @param restrict
   */
  setRestrict(restrict: boolean) {}

  submit() {}
  /**
   * 创建用户,返回账户信息
   */
  generateAddress() {}

  /**
   * 为创建的用户转账
   * @param accountId
   * @param count
   */
  pay(accountId: string, count: number) {}

  /**
   * 表操作
   */
  createTable() {}

  renameTable() {}

  dropTable() {}

  /**
   * 数据操作
   */

  insert() {}

  update() {}

  delete() {}

  /**
   * 数据查询
   */
  get() {}

  limit() {}

  order() {}

  withFields() {}

  /**
   * 权限管理
   */
  grant() {}

  /**
   * 事务相关
   */
  beginTran() {}
  assert() {}
  commit() {}

  /**
   * 区块信息
   */
  getLedger() {}
  getLedgerVersion() {}
  getTransactions() {}
  getTransaction() {}

  /**
   * 事件订阅
   */
  subscribeTable() {}
  unsubcribeTable() {}
  subscribeTx() {}
  unsubscribeTx() {}

  /**
   * 运算符
   */
}
