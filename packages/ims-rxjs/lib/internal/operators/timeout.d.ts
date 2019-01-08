import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function timeout<T>(due: number | Date, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
