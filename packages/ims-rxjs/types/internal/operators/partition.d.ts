import { Observable } from '../Observable';
import { UnaryFunction } from '../types';
export declare function partition<T>(predicate: (value: T, index: number) => boolean, thisArg?: any): UnaryFunction<Observable<T>, [Observable<T>, Observable<T>]>;
