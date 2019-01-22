import { MonoTypeOperatorFunction, SubscribableOrPromise } from '../types';
export interface ThrottleConfig {
    leading?: boolean;
    trailing?: boolean;
}
export declare const defaultThrottleConfig: ThrottleConfig;
export declare function throttle<T>(durationSelector: (value: T) => SubscribableOrPromise<any>, config?: ThrottleConfig): MonoTypeOperatorFunction<T>;
