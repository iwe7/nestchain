import { Observable } from '../Observable';
import { MonoTypeOperatorFunction } from '../types';
export declare function single<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): MonoTypeOperatorFunction<T>;
