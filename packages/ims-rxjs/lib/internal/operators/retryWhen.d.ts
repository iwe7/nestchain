import { Observable } from '../Observable';
import { MonoTypeOperatorFunction } from '../types';
export declare function retryWhen<T>(notifier: (errors: Observable<any>) => Observable<any>): MonoTypeOperatorFunction<T>;
