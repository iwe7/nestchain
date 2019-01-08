import { Observable } from '../Observable';
import { OperatorFunction } from '../types';
export declare function buffer<T>(closingNotifier: Observable<any>): OperatorFunction<T, T[]>;
