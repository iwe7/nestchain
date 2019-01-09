import { Observable } from '../Observable';
import { MonoTypeOperatorFunction } from '../types';
export declare function skipUntil<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T>;
