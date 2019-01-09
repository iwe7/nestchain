import { Notification } from '../Notification';
import { OperatorFunction } from '../types';
export declare function dematerialize<T>(): OperatorFunction<Notification<T>, T>;
