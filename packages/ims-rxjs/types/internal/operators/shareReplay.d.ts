import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function shareReplay<T>(bufferSize?: number, windowTime?: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
