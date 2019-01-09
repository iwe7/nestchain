import { Observable } from '../Observable';
import { Unsubscribable, ObservableInput } from '../types';
export declare function using<T>(resourceFactory: () => Unsubscribable | void, observableFactory: (resource: Unsubscribable | void) => ObservableInput<T> | void): Observable<T>;
