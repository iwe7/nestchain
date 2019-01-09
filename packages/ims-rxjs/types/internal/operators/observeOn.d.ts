import { Operator } from '../Operator';
import { Subscriber } from '../Subscriber';
import { Notification } from '../Notification';
import { MonoTypeOperatorFunction, PartialObserver, SchedulerAction, SchedulerLike, TeardownLogic } from '../types';
export declare function observeOn<T>(scheduler: SchedulerLike, delay?: number): MonoTypeOperatorFunction<T>;
export declare class ObserveOnOperator<T> implements Operator<T, T> {
    private scheduler;
    private delay;
    constructor(scheduler: SchedulerLike, delay?: number);
    call(subscriber: Subscriber<T>, source: any): TeardownLogic;
}
export declare class ObserveOnSubscriber<T> extends Subscriber<T> {
    private scheduler;
    private delay;
    static dispatch(this: SchedulerAction<ObserveOnMessage>, arg: ObserveOnMessage): void;
    constructor(destination: Subscriber<T>, scheduler: SchedulerLike, delay?: number);
    private scheduleMessage;
    protected _next(value: T): void;
    protected _error(err: any): void;
    protected _complete(): void;
}
export declare class ObserveOnMessage {
    notification: Notification<any>;
    destination: PartialObserver<any>;
    constructor(notification: Notification<any>, destination: PartialObserver<any>);
}
