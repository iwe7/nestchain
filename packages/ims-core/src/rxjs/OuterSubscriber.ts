import { Subscriber } from './Subscriber';

export abstract class OuterSubscriber<T, R> extends Subscriber<T> {
  abstract notifyNext(
    outerValue: T,
    innerValue: R,
    outerIndex: number,
    innerIndex: number,
    innerSub: InnerSubscriber<T, R>,
  ): void;
  abstract notifyError(error: any, innerSub: InnerSubscriber<T, R>): void;
  abstract notifyComplete(innerSub: InnerSubscriber<T, R>): void;
}

export abstract class InnerSubscriber<T, R> extends Subscriber<R> {}
