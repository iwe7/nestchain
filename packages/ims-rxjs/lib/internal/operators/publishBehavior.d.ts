import { Observable } from '../Observable';
import { ConnectableObservable } from '../observable/ConnectableObservable';
import { UnaryFunction } from '../types';
export declare function publishBehavior<T>(value: T): UnaryFunction<Observable<T>, ConnectableObservable<T>>;
