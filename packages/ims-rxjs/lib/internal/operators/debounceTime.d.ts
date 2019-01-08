import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function debounceTime<T>(dueTime: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
