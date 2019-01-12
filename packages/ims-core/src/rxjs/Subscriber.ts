import { Observer } from './types';
import { Subscription } from './Subscription';

export abstract class Subscriber<T> extends Subscription
  implements Observer<T> {
  abstract next(value?: T): void;
  abstract error(err?: any): void;
  abstract complete(): void;
  abstract unsubscribe(): void;
}

export abstract class SafeSubscriber<T> extends Subscriber<T> {}
