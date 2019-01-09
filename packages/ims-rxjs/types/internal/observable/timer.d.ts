import { Observable } from '../Observable';
import { SchedulerLike } from '../types';
export declare function timer(dueTime?: number | Date, periodOrScheduler?: number | SchedulerLike, scheduler?: SchedulerLike): Observable<number>;
