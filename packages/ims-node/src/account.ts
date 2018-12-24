/**
 * 公众号核心类
 */
export abstract class ImsAccount {
  readonly accountId: string;
  constructor(accountId: string) {
    this.accountId = accountId;
  }
  /**
   * 创建平台特定的公众号操作对象
   */
  static create(accountId: string) {}
}

/**
 * 模块组件基类
 */
export abstract class ImsBase {}
/**
 * 模块规则及自定义配置
 */
export abstract class ImsModule extends ImsBase {}
/**
 * 模块计划任务
 */
export abstract class ImsModuleCron extends ImsBase {}
/**
 * 模块插件
 */
export abstract class ImsModuleHook extends ImsBase {}
/**
 * 模块手机端
 */
export abstract class ImsModuleMobile extends ImsBase {}
export abstract class ImsModulePhoneapp extends ImsBase {}
/**
 * 模块消息处理器
 */
export abstract class ImsModuleProcessor extends ImsBase {}
/**
 * 模块订阅器
 */
export abstract class ImsModuleReceiver extends ImsBase {}
/**
 * 模块微站
 */
export abstract class ImsModuleSite extends ImsBase {}
/**
 * 模块系统首页
 */
export abstract class ImsModuleSystemWelcome extends ImsBase {}
/**
 * 模块小程序
 */
export abstract class ImsModuleWxapp extends ImsBase {}
