import { Observable } from '../Observable';
import { OperatorFunction } from '../types';
export declare function windowCount<T>(windowSize: number, startWindowEvery?: number): OperatorFunction<T, Observable<T>>;
