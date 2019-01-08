import { Observable } from '../Observable';
import { SchedulerLike } from '../types';
export declare type ConditionFunc<S> = (state: S) => boolean;
export declare type IterateFunc<S> = (state: S) => S;
export declare type ResultFunc<S, T> = (state: S) => T;
export interface GenerateBaseOptions<S> {
    initialState: S;
    condition?: ConditionFunc<S>;
    iterate: IterateFunc<S>;
    scheduler?: SchedulerLike;
}
export interface GenerateOptions<T, S> extends GenerateBaseOptions<S> {
    resultSelector: ResultFunc<S, T>;
}
export declare function generate<T, S>(initialState: S, condition: ConditionFunc<S>, iterate: IterateFunc<S>, resultSelector: ResultFunc<S, T>, scheduler?: SchedulerLike): Observable<T>;
export declare function generate<S>(initialState: S, condition: ConditionFunc<S>, iterate: IterateFunc<S>, scheduler?: SchedulerLike): Observable<S>;
export declare function generate<S>(options: GenerateBaseOptions<S>): Observable<S>;
export declare function generate<T, S>(options: GenerateOptions<T, S>): Observable<T>;
