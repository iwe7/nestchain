import { ObservableInput, OperatorFunction } from '../types';
export declare function switchMapTo<R>(observable: ObservableInput<R>): OperatorFunction<any, R>;
export declare function switchMapTo<T, R>(observable: ObservableInput<R>, resultSelector: undefined): OperatorFunction<T, R>;
export declare function switchMapTo<T, I, R>(observable: ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, R>;
