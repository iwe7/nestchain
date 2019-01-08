import { Observable } from '../Observable';
import { OperatorFunction } from '../types';
export declare function windowWhen<T>(closingSelector: () => Observable<any>): OperatorFunction<T, Observable<T>>;
