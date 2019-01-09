import { SchedulerAction, SchedulerLike } from '../types';
import { Observable } from '../Observable';
export declare function range(start?: number, count?: number, scheduler?: SchedulerLike): Observable<number>;
export declare function dispatch(this: SchedulerAction<any>, state: any): void;
