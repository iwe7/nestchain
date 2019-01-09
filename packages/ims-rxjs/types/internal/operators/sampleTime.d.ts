import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function sampleTime<T>(period: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
