import { Observable } from '../Observable';
import { SchedulerLike } from '../types';
export declare function interval(period?: number, scheduler?: SchedulerLike): Observable<number>;
