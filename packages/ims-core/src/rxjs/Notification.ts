import { PartialObserver } from './types';
import { Observable } from './Observable';
export abstract class Notification<T> {
  hasValue: boolean;
  abstract observe(observer: PartialObserver<T>): any;
  abstract do(
    next: (value: T) => void,
    error?: (err: any) => void,
    complete?: () => void,
  ): any;
  abstract accept(
    nextOrObserver: PartialObserver<T> | ((value: T) => void),
    error?: (err: any) => void,
    complete?: () => void,
  ): any;
  abstract toObservable(): Observable<T>;
}
