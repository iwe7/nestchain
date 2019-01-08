import { Observable } from '../Observable';
import { OperatorFunction } from '../types';
export declare function findIndex<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, number>;
