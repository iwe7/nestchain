import { InjectionToken } from './di/injection_token';

export const AppName = new InjectionToken<string>('AppName');
export const AppStatus = new InjectionToken<string>('AppStatus');

export const AppRoot = new InjectionToken<string>('AppRoot');
export const SourceRoot = new InjectionToken<string>('SourceRoot');
export const PlatformName = new InjectionToken<string>('PlatformName');
export const AppTitle = new InjectionToken<string>('AppTitle');
export const DevOpen = new InjectionToken<boolean>('DevOpen');

export const AppConfig = new InjectionToken<any>('AppConfig');
export const DevPort = new InjectionToken<any>('DevPort');
export const DevWatch = new InjectionToken<boolean>('DevWatch');
