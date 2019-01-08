import { SchedulerLike, SchedulerAction } from '../types';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
import { Observable } from '../Observable';
export interface DispatchArg<T> {
    source: Observable<T>;
    subscriber: Subscriber<T>;
}
export declare class SubscribeOnObservable<T> extends Observable<T> {
    source: Observable<T>;
    private delayTime;
    private scheduler;
    static create<T>(source: Observable<T>, delay?: number, scheduler?: SchedulerLike): Observable<T>;
    static dispatch<T>(this: SchedulerAction<T>, arg: DispatchArg<T>): Subscription;
    constructor(source: Observable<T>, delayTime?: number, scheduler?: SchedulerLike);
    _subscribe(subscriber: Subscriber<T>): Subscription;
}