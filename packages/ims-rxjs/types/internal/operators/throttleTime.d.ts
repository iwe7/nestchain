import { ThrottleConfig } from './throttle';
import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function throttleTime<T>(duration: number, scheduler?: SchedulerLike, config?: ThrottleConfig): MonoTypeOperatorFunction<T>;
