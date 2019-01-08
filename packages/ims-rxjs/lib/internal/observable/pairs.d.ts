import { Observable } from '../Observable';
import { SchedulerAction, SchedulerLike } from '../types';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
export declare function pairs<T>(obj: Object, scheduler?: SchedulerLike): Observable<[string, T]>;
export declare function dispatch<T>(this: SchedulerAction<any>, state: {
    keys: string[];
    index: number;
    subscriber: Subscriber<[string, T]>;
    subscription: Subscription;
    obj: Object;
}): void;
