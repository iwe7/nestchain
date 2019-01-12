import { Subscription } from './Subscription';
import { OperatorFunction, PartialObserver, Subscribable } from './types';
import { Subscriber } from './Subscriber';
import { TeardownLogic } from './types';
import { Operator } from './Operator';

export abstract class Observable<T> implements Subscribable<T> {
  public _isScalar: boolean = false;
  source: Observable<any>;
  operator: Operator<any, T>;
  abstract lift<R>(operator: Operator<T, R>): Observable<R>;
  abstract subscribe(observer?: PartialObserver<T>): Subscription;
  abstract subscribe(
    next: null | undefined,
    error: null | undefined,
    complete: () => void,
  ): Subscription;
  abstract subscribe(
    next: null | undefined,
    error: (error: any) => void,
    complete?: () => void,
  ): Subscription;
  abstract subscribe(
    next: (value: T) => void,
    error: null | undefined,
    complete: () => void,
  ): Subscription;
  abstract subscribe(
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void,
  ): Subscription;
  abstract subscribe(
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void,
  ): Subscription;
  abstract forEach(
    next: (value: T) => void,
    promiseCtor?: PromiseConstructorLike,
  ): Promise<void>;
  abstract pipe(): Observable<T>;
  abstract pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
  abstract pipe<A, B>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
  ): Observable<B>;
  abstract pipe<A, B, C>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
  ): Observable<C>;
  abstract pipe<A, B, C, D>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
  ): Observable<D>;
  abstract pipe<A, B, C, D, E>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
  ): Observable<E>;
  abstract pipe<A, B, C, D, E, F>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
  ): Observable<F>;
  abstract pipe<A, B, C, D, E, F, G>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
  ): Observable<G>;
  abstract pipe<A, B, C, D, E, F, G, H>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>,
  ): Observable<H>;
  abstract pipe<A, B, C, D, E, F, G, H, I>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>,
    op9: OperatorFunction<H, I>,
  ): Observable<I>;
  abstract pipe<A, B, C, D, E, F, G, H, I>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>,
    op9: OperatorFunction<H, I>,
    ...operations: OperatorFunction<any, any>[]
  ): Observable<{}>;
  abstract pipe(...operations: OperatorFunction<any, any>[]): Observable<any>;
  abstract toPromise<T>(this: Observable<T>): Promise<T>;
  abstract toPromise<T>(
    this: Observable<T>,
    PromiseCtor: typeof Promise,
  ): Promise<T>;
  abstract toPromise<T>(
    this: Observable<T>,
    PromiseCtor: PromiseConstructorLike,
  ): Promise<T>;
  abstract toPromise(promiseCtor?: PromiseConstructorLike): Promise<T>;
}

export abstract class ObservableFactory {
  abstract create<T>(
    subscribe?: (subscriber: Subscriber<T>) => TeardownLogic,
  ): Observable<T>;
}
