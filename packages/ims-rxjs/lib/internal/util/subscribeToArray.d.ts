import { Subscriber } from '../Subscriber';
export declare const subscribeToArray: <T>(array: ArrayLike<T>) => (subscriber: Subscriber<T>) => void;
