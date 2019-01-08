import { PartialObserver } from './types';
import { Observable } from './Observable';
export declare class Notification<T> {
    kind: string;
    value?: T;
    error?: any;
    hasValue: boolean;
    constructor(kind: string, value?: T, error?: any);
    observe(observer: PartialObserver<T>): any;
    do(next: (value: T) => void, error?: (err: any) => void, complete?: () => void): any;
    accept(nextOrObserver: PartialObserver<T> | ((value: T) => void), error?: (err: any) => void, complete?: () => void): any;
    toObservable(): Observable<T>;
    private static completeNotification;
    private static undefinedValueNotification;
    static createNext<T>(value: T): Notification<T>;
    static createError<T>(err?: any): Notification<T>;
    static createComplete(): Notification<any>;
}
