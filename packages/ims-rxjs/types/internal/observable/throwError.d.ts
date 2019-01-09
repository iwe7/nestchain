import { Observable } from '../Observable';
import { SchedulerLike } from '../types';
export declare function throwError(error: any, scheduler?: SchedulerLike): Observable<never>;
