import { Notification } from '../Notification';
import { OperatorFunction } from '../types';
export declare function materialize<T>(): OperatorFunction<T, Notification<T>>;
