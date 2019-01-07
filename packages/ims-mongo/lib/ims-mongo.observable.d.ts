import { Observable, Subscriber, TeardownLogic, PartialObserver } from 'rxjs';
export declare class ImsMongoObservable<T> extends Observable<T> {
    _subscribe(subscriber: Subscriber<any>): TeardownLogic;
}
export declare class ImsMongoSubscriber<T> extends Subscriber<T> {
    constructor(destination: PartialObserver<any>);
}
