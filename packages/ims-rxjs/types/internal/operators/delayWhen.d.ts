import { Observable } from '../Observable';
import { MonoTypeOperatorFunction } from '../types';
export declare function delayWhen<T>(delayDurationSelector: (value: T, index: number) => Observable<never>, subscriptionDelay?: Observable<any>): MonoTypeOperatorFunction<T>;
export declare function delayWhen<T>(delayDurationSelector: (value: T, index: number) => Observable<any>, subscriptionDelay?: Observable<any>): MonoTypeOperatorFunction<T>;
