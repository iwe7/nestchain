import { Observable } from '../Observable';
import { OperatorFunction } from '../types';
export declare function windowToggle<T, O>(openings: Observable<O>, closingSelector: (openValue: O) => Observable<any>): OperatorFunction<T, Observable<T>>;
