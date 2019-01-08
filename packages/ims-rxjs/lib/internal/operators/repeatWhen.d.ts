import { Observable } from '../Observable';
import { MonoTypeOperatorFunction } from '../types';
export declare function repeatWhen<T>(notifier: (notifications: Observable<any>) => Observable<any>): MonoTypeOperatorFunction<T>;
