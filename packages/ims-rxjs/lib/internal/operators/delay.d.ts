import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function delay<T>(delay: number | Date, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
