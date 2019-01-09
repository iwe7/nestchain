import { Observable } from '../Observable';
import { Operator } from '../Operator';
import { Subscriber } from '../Subscriber';
import { TeardownLogic } from '../types';
import { OuterSubscriber } from '../OuterSubscriber';
import { InnerSubscriber } from '../InnerSubscriber';
export declare function race<T>(observables: Array<Observable<T>>): Observable<T>;
export declare function race<T>(observables: Array<Observable<any>>): Observable<T>;
export declare function race<T>(...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;
export declare class RaceOperator<T> implements Operator<T, T> {
    call(subscriber: Subscriber<T>, source: any): TeardownLogic;
}
export declare class RaceSubscriber<T> extends OuterSubscriber<T, T> {
    private hasFirst;
    private observables;
    private subscriptions;
    constructor(destination: Subscriber<T>);
    protected _next(observable: any): void;
    protected _complete(): void;
    notifyNext(outerValue: T, innerValue: T, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, T>): void;
}
