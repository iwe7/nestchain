import { Observable, PartialObserver, Subscriber, TeardownLogic } from 'rxjs';
export function fromCallback<T>(
  addHandler: (opt: PartialObserver<T>) => any,
  removeHandler: (opt: PartialObserver<T>) => any,
  resultSelector?: (...args: any[]) => T,
) {
  return new FromCallbackObservable(addHandler, removeHandler, resultSelector);
}
export class FromCallbackObservable<T> extends Observable<T> {
  constructor(
    public addHandler: (opt: PartialObserver<T>) => any,
    public removeHandler: (opt: PartialObserver<T>) => any,
    public resultSelector: (...args: any[]) => T,
  ) {
    super();
  }
  _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    return new FromCallbackSubscriber(
      subscriber,
      this.addHandler,
      this.removeHandler,
      this.resultSelector,
    );
  }
}

export class FromCallbackSubscriber<T> extends Subscriber<T> {
  private fns: PartialObserver<T> = {
    next: this.next.bind(this),
    error: this.error.bind(this),
    complete: this.complete.bind(this),
  };
  constructor(
    destination: PartialObserver<any>,
    public addHandler: (opt: PartialObserver<T>) => any,
    public removeHandler: (opt: PartialObserver<T>) => any,
    public resultSelector: (...args: any[]) => T,
  ) {
    super(destination);
    this.addHandler(this.fns);
  }

  next(d: T) {
    this.destination.next(d);
  }

  error(e: Error) {
    this.removeHandler(this.fns);
    super.error();
  }

  complete() {
    this.removeHandler(this.fns);
    super.complete();
  }

  unsubscribe() {
    this.removeHandler(this.fns);
    super.unsubscribe();
  }
}
