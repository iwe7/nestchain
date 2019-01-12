import { SubscriptionLike, TeardownLogic } from './types';
export abstract class Subscription implements SubscriptionLike {
  closed: boolean = false;
  abstract unsubscribe(): void;
  abstract add(teardown: TeardownLogic): Subscription;
  abstract remove(subscription: Subscription): void;
}

export abstract class Action<T> extends Subscription {
  abstract schedule(state?: T, delay?: number): Subscription;
}

export abstract class AsyncAction<T> extends Action<T> {
  abstract execute(state: T, delay: number): any;
}
