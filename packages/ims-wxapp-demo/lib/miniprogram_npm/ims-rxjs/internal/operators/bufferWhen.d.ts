import { Observable } from '../Observable';
import { OperatorFunction } from '../types';
export declare function bufferWhen<T>(closingSelector: () => Observable<any>): OperatorFunction<T, T[]>;
