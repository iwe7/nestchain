import { OperatorFunction, SubscribableOrPromise } from '../types';
export declare function bufferToggle<T, O>(openings: SubscribableOrPromise<O>, closingSelector: (value: O) => SubscribableOrPromise<any>): OperatorFunction<T, T[]>;
