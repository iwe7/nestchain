import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function subscribeOn<T>(scheduler: SchedulerLike, delay?: number): MonoTypeOperatorFunction<T>;
