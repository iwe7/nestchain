import { Type } from '../type';
import { InjectionToken } from './injection_token';
import { InjectFlags, Injector } from './injector';
export declare function inject<T>(token: Type<T> | InjectionToken<T>): T;
export declare function inject<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags): T | null;
export declare function setCurrentInjector(injector: Injector): void;
export declare function injectInjectorOnly<T>(token: Type<T> | InjectionToken<T>): T;
export declare function injectInjectorOnly<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags): T | null;
export declare function injectRootLimpMode<T>(token: Type<T> | InjectionToken<T>, notFoundValue: T | undefined, flags: InjectFlags): T | null;
