import { Subject } from './Subject';
import { Subscriber } from './Subscriber';
import { Subscription } from './Subscription';
export declare class BehaviorSubject<T> extends Subject<T> {
    private _value;
    constructor(_value: T);
    readonly value: T;
    _subscribe(subscriber: Subscriber<T>): Subscription;
    getValue(): T;
    next(value: T): void;
}
