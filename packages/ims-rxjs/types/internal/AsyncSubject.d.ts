import { Subject } from './Subject';
import { Subscriber } from './Subscriber';
import { Subscription } from './Subscription';
export declare class AsyncSubject<T> extends Subject<T> {
    private value;
    private hasNext;
    private hasCompleted;
    _subscribe(subscriber: Subscriber<any>): Subscription;
    next(value: T): void;
    error(error: any): void;
    complete(): void;
}
