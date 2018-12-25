import express = require('express');
import {
  fromEventPattern,
  Observable,
  Subscriber,
  TeardownLogic,
  PartialObserver,
  Subscription,
  Operator,
  Subject,
} from 'rxjs';

export class CanAddSourceObservable<T> extends Observable<T> {
  public _subscriber: CanAddSourceSubscriber<any>;
  public _sources: Set<Observable<any>> = new Set();
  static create() {
    return new CanAddSourceObservable();
  }
  lift<R>(operator: Operator<T, R>): CanAddSourceObservable<R> {
    let item = new CanAddSourceObservable<R>();
    item.operator = operator;
    item._sources = this._sources;
    item._subscriber = this._subscriber;
    return item;
  }
  // 添加乱七八糟的数据
  addSource(source: Observable<T>) {
    if (this._subscriber) {
      this._subscriber.addSource(source);
    }
    this._sources.add(source);
  }
  // 截取
  intercept() {}
  _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    if (!this._subscriber) {
      this._subscriber = new CanAddSourceSubscriber(subscriber, this._sources);
    }
    return this._subscriber;
  }
}

export class CanAddSourceSubscriber<T> extends Subscriber<T> {
  private subscription: Subscription = new Subscription();
  private subject: Subject<T> = new Subject();
  constructor(
    destination: PartialObserver<any>,
    private sources: Set<Observable<T>>,
  ) {
    super(destination);
    this.sources.forEach(soruce => {
      this.addSource(soruce);
    });
    this.subscription.add(this.subject.subscribe(res => this.next(res)));
  }
  addSource(source: Observable<T>) {
    this.subscription.add(
      source.subscribe(res => {
        this.subject.next(res);
      }),
    );
  }
  next(val: T) {
    this.destination.next(val);
  }
  complete() {
    this.subscription.unsubscribe();
    super.complete();
  }
  error(e: any) {
    this.subscription.unsubscribe();
    super.error(e);
  }
  unsubscribe() {
    this.subscription.unsubscribe();
    super.unsubscribe();
  }
}

let app = express();
// express可以看成一个由请求req,响应res组成的数据流
// 监听客户端发来的数据
let res = fromEventPattern((handler: any) => {
  /**
   * req请求
   * res响应
   * next下一个
   */
  app.all('*', handler);
});

let appSource = new CanAddSourceObservable();
appSource.addSource(res);
appSource.subscribe(res => console.log(res));
app.listen(80);
