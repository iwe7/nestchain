import { InjectionToken } from './di/injection_token';
import { Injector } from './di/injector';

/**
 * AppInitialization 应用初始化时运行
 */

export interface AppInitialization {
  /**
   * index越大越重要，越靠前
   */
  index: number;
  (injector: Injector): Promise<void>;
}
export const AppInitialization = new InjectionToken<AppInitialization[]>(
  'AppInitialization',
);

/**
 * 错误处理
 */
export interface ErrorHandler {
  (e: Error): void;
}
export const ErrorHandler = new InjectionToken<ErrorHandler>('ErrorHandler');

/**
 * 应用启动
 */
export interface AppStartup {
  (): Promise<void>;
}
export const AppStartup = new InjectionToken<AppStartup>('AppStartup');

/**
 * dev模式
 */
export interface AppConfig {
  mode?: 'development' | 'production' | 'none';
  name?: string;
  version?: string;
  target?:
    | 'ali'
    | 'android'
    | 'baidu'
    | 'electron'
    | 'h5'
    | 'ios'
    | 'weixin'
    | 'wxapp';
  source?: string;
}
export const AppConfig = new InjectionToken<AppConfig[]>('AppConfig');
