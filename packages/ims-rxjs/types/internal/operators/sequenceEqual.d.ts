import { Operator } from '../Operator';
import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { Observer, OperatorFunction } from '../types';
export declare function sequenceEqual<T>(compareTo: Observable<T>, comparor?: (a: T, b: T) => boolean): OperatorFunction<T, boolean>;
export declare class SequenceEqualOperator<T> implements Operator<T, boolean> {
    private compareTo;
    private comparor;
    constructor(compareTo: Observable<T>, comparor: (a: T, b: T) => boolean);
    call(subscriber: Subscriber<boolean>, source: any): any;
}
export declare class SequenceEqualSubscriber<T, R> extends Subscriber<T> {
    private compareTo;
    private comparor;
    private _a;
    private _b;
    private _oneComplete;
    constructor(destination: Observer<R>, compareTo: Observable<T>, comparor: (a: T, b: T) => boolean);
    protected _next(value: T): void;
    _complete(): void;
    checkValues(): void;
    emit(value: boolean): void;
    nextB(value: T): void;
    completeB(): void;
}
