import { Observable, Subscriber, TeardownLogic, PartialObserver } from 'rxjs';
export class ImsMongoObservable<T> extends Observable<T> {
  _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    return new ImsMongoSubscriber(subscriber);
  }
}

export class ImsMongoSubscriber<T> extends Subscriber<T> {
  constructor(destination: PartialObserver<any>) {
    super(destination);
  }
}
