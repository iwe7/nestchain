import { MonoTypeOperatorFunction, SubscribableOrPromise } from '../types';
export declare function audit<T>(durationSelector: (value: T) => SubscribableOrPromise<any>): MonoTypeOperatorFunction<T>;
