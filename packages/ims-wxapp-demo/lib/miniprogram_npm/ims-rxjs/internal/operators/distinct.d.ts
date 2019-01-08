import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { OuterSubscriber } from '../OuterSubscriber';
import { InnerSubscriber } from '../InnerSubscriber';
import { MonoTypeOperatorFunction } from '../types';
export declare function distinct<T, K>(keySelector?: (value: T) => K, flushes?: Observable<any>): MonoTypeOperatorFunction<T>;
export declare class DistinctSubscriber<T, K> extends OuterSubscriber<T, T> {
    private keySelector;
    private values;
    constructor(destination: Subscriber<T>, keySelector: (value: T) => K, flushes: Observable<any>);
    notifyNext(outerValue: T, innerValue: T, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, T>): void;
    notifyError(error: any, innerSub: InnerSubscriber<T, T>): void;
    protected _next(value: T): void;
    private _useKeySelector;
    private _finalizeNext;
}
