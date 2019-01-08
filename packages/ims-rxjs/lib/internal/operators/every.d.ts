import { Observable } from '../Observable';
import { OperatorFunction } from '../types';
export declare function every<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, boolean>;
