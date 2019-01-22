import { InjectionToken } from './di/injection_token';
import { Injector } from './di/injector';
export interface AppInitialization {
    index: number;
    (injector: Injector): Promise<void>;
}
export declare const AppInitialization: InjectionToken<AppInitialization[]>;
export interface ErrorHandler {
    (e: Error): void;
}
export declare const ErrorHandler: InjectionToken<ErrorHandler>;
export interface AppStartup {
    (): Promise<void>;
}
export declare const AppStartup: InjectionToken<AppStartup>;
export interface AppConfig {
    mode?: 'development' | 'production' | 'none';
    name?: string;
    version?: string;
    target?: 'ali' | 'android' | 'baidu' | 'electron' | 'h5' | 'ios' | 'weixin' | 'wxapp';
    source?: string;
}
export declare const AppConfig: InjectionToken<AppConfig[]>;
