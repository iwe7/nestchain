import { OperatorFunction, SchedulerLike, Timestamp as TimestampInterface } from '../types';
export declare function timestamp<T>(scheduler?: SchedulerLike): OperatorFunction<T, Timestamp<T>>;
export declare class Timestamp<T> implements TimestampInterface<T> {
    value: T;
    timestamp: number;
    constructor(value: T, timestamp: number);
}
