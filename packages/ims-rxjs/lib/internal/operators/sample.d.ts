import { Observable } from '../Observable';
import { MonoTypeOperatorFunction } from '../types';
export declare function sample<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T>;
