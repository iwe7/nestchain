import { Observable } from '../Observable';
import { OperatorFunction } from '../types';
export declare function window<T>(windowBoundaries: Observable<any>): OperatorFunction<T, Observable<T>>;
