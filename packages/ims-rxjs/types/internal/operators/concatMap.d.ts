import { ObservableInput, OperatorFunction } from '../types';
export declare function concatMap<T, R>(project: (value: T, index: number) => ObservableInput<R>): OperatorFunction<T, R>;
export declare function concatMap<T, R>(project: (value: T, index: number) => ObservableInput<R>, resultSelector: undefined): OperatorFunction<T, R>;
export declare function concatMap<T, I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, R>;
