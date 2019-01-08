import { MonoTypeOperatorFunction, SubscribableOrPromise } from '../types';
export declare function debounce<T>(durationSelector: (value: T) => SubscribableOrPromise<any>): MonoTypeOperatorFunction<T>;
