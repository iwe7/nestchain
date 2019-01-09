import { Observable } from '../Observable';
import { MonoTypeOperatorFunction } from '../types';
export declare function takeUntil<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T>;
