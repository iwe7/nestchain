import { Observable } from '../Observable';
import { SubscribableOrPromise } from '../types';
export declare function iif<T, F>(condition: () => boolean, trueResult?: SubscribableOrPromise<T>, falseResult?: SubscribableOrPromise<F>): Observable<T | F>;
