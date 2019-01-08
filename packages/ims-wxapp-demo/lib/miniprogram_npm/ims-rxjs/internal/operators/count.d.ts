import { Observable } from '../Observable';
import { OperatorFunction } from '../types';
export declare function count<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): OperatorFunction<T, number>;
