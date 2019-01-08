import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function auditTime<T>(duration: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
