import { Observable, PartialObserver, Subscriber, TeardownLogic } from '../index';
export declare function fromCallback<T>(addHandler: (opt: PartialObserver<T>) => any, removeHandler?: (opt: PartialObserver<T>) => any, resultSelector?: (...args: any[]) => T): FromCallbackObservable<T>;
export declare class FromCallbackObservable<T> extends Observable<T> {
    addHandler: (opt: PartialObserver<T>) => any;
    removeHandler: (opt: PartialObserver<T>) => any;
    resultSelector: (...args: any[]) => T;
    constructor(addHandler: (opt: PartialObserver<T>) => any, removeHandler: (opt: PartialObserver<T>) => any, resultSelector: (...args: any[]) => T);
    _subscribe(subscriber: Subscriber<any>): TeardownLogic;
}
export declare class FromCallbackSubscriber<T> extends Subscriber<T> {
    addHandler: (opt: PartialObserver<T>) => any;
    removeHandler: (opt: PartialObserver<T>) => any;
    resultSelector: (...args: any[]) => T;
    private fns;
    constructor(destination: PartialObserver<any>, addHandler: (opt: PartialObserver<T>) => any, removeHandler: (opt: PartialObserver<T>) => any, resultSelector: (...args: any[]) => T);
    next(d: T): void;
    error(e: Error): void;
    complete(): void;
    unsubscribe(): void;
}
