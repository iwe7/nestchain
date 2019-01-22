import { InjectionToken } from './di/injection_token';

/**
 * AppInitialization 应用初始化时运行
 */

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

/**
 * other
 */
export const AppName = new InjectionToken<string>('AppName');
export const AppStatus = new InjectionToken<string>('AppStatus');

export const AppRoot = new InjectionToken<string>('AppRoot');
export const SourceRoot = new InjectionToken<string>('SourceRoot');
export const PlatformName = new InjectionToken<string>('PlatformName');
export const AppTitle = new InjectionToken<string>('AppTitle');
export const DevOpen = new InjectionToken<boolean>('DevOpen');

export const DevPort = new InjectionToken<any>('DevPort');
export const DevWatch = new InjectionToken<boolean>('DevWatch');
