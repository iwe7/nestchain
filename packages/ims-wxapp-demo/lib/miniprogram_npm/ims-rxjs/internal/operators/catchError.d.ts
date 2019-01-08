import { Observable } from '../Observable';
import { ObservableInput, OperatorFunction, MonoTypeOperatorFunction } from '../types';
export declare function catchError<T>(selector: (err: any, caught: Observable<T>) => never): MonoTypeOperatorFunction<T>;
export declare function catchError<T, R>(selector: (err: any, caught: Observable<T>) => ObservableInput<R>): OperatorFunction<T, T | R>;
