import { Observable } from '../Observable';
import { SubscribableOrPromise } from '../types';
export declare function defer<T>(observableFactory: () => SubscribableOrPromise<T> | void): Observable<T>;
