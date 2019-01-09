import { Subject } from './Subject';
import { Observer } from './types';
import { Subscription } from './Subscription';
export declare class SubjectSubscription<T> extends Subscription {
    subject: Subject<T>;
    subscriber: Observer<T>;
    closed: boolean;
    constructor(subject: Subject<T>, subscriber: Observer<T>);
    unsubscribe(): void;
}
