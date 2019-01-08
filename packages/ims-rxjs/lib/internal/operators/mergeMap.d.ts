import { Operator } from '../Operator';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
import { OuterSubscriber } from '../OuterSubscriber';
import { InnerSubscriber } from '../InnerSubscriber';
import { ObservableInput, OperatorFunction } from '../types';
export declare function mergeMap<T, R>(project: (value: T, index: number) => ObservableInput<R>, concurrent?: number): OperatorFunction<T, R>;
export declare function mergeMap<T, R>(project: (value: T, index: number) => ObservableInput<R>, resultSelector: undefined, concurrent?: number): OperatorFunction<T, R>;
export declare function mergeMap<T, I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R, concurrent?: number): OperatorFunction<T, R>;
export declare class MergeMapOperator<T, R> implements Operator<T, R> {
    private project;
    private concurrent;
    constructor(project: (value: T, index: number) => ObservableInput<R>, concurrent?: number);
    call(observer: Subscriber<R>, source: any): any;
}
export declare class MergeMapSubscriber<T, R> extends OuterSubscriber<T, R> {
    private project;
    private concurrent;
    private hasCompleted;
    private buffer;
    private active;
    protected index: number;
    constructor(destination: Subscriber<R>, project: (value: T, index: number) => ObservableInput<R>, concurrent?: number);
    protected _next(value: T): void;
    protected _tryNext(value: T): void;
    private _innerSub;
    protected _complete(): void;
    notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
    notifyComplete(innerSub: Subscription): void;
}
