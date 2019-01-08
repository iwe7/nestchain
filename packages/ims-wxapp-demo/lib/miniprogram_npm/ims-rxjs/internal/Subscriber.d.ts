import { Observer, PartialObserver } from './types';
import { Subscription } from './Subscription';
export declare class Subscriber<T> extends Subscription implements Observer<T> {
    static create<T>(next?: (x?: T) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T>;
    syncErrorValue: any;
    syncErrorThrown: boolean;
    syncErrorThrowable: boolean;
    protected isStopped: boolean;
    protected destination: PartialObserver<any> | Subscriber<any>;
    constructor(destinationOrNext?: PartialObserver<any> | ((value: T) => void), error?: (e?: any) => void, complete?: () => void);
    next(value?: T): void;
    error(err?: any): void;
    complete(): void;
    unsubscribe(): void;
    protected _next(value: T): void;
    protected _error(err: any): void;
    protected _complete(): void;
    _unsubscribeAndRecycle(): Subscriber<T>;
}
export declare class SafeSubscriber<T> extends Subscriber<T> {
    private _parentSubscriber;
    private _context;
    constructor(_parentSubscriber: Subscriber<T>, observerOrNext?: PartialObserver<T> | ((value: T) => void), error?: (e?: any) => void, complete?: () => void);
    next(value?: T): void;
    error(err?: any): void;
    complete(): void;
    private __tryOrUnsub;
    private __tryOrSetError;
    _unsubscribe(): void;
}
