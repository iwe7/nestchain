import { Operator } from '../Operator';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
import { OuterSubscriber } from '../OuterSubscriber';
import { InnerSubscriber } from '../InnerSubscriber';
import { ObservableInput, OperatorFunction } from '../types';
export declare function mergeScan<T, R>(accumulator: (acc: R, value: T) => ObservableInput<R>, seed: R, concurrent?: number): OperatorFunction<T, R>;
export declare class MergeScanOperator<T, R> implements Operator<T, R> {
    private accumulator;
    private seed;
    private concurrent;
    constructor(accumulator: (acc: R, value: T) => ObservableInput<R>, seed: R, concurrent: number);
    call(subscriber: Subscriber<R>, source: any): any;
}
export declare class MergeScanSubscriber<T, R> extends OuterSubscriber<T, R> {
    private accumulator;
    private acc;
    private concurrent;
    private hasValue;
    private hasCompleted;
    private buffer;
    private active;
    protected index: number;
    constructor(destination: Subscriber<R>, accumulator: (acc: R, value: T) => ObservableInput<R>, acc: R, concurrent: number);
    protected _next(value: any): void;
    private _innerSub;
    protected _complete(): void;
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
    notifyComplete(innerSub: Subscription): void;
}
