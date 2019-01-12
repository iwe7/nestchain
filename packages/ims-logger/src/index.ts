import {
  Logger,
  NgModule,
  JsonObject,
  LogLevel,
  LoggerFactory,
  AppName,
  Inject,
  Optional,
  Injector,
} from 'ims-core';
import {
  Subject,
  Operator,
  Observable,
  Subscription,
  PartialObserver,
} from 'ims-rxjs';
export interface LoggerMetadata extends JsonObject {
  name: string;
  path: string[];
}
export interface LogEntry extends LoggerMetadata {
  level: LogLevel;
  message: string;
  timestamp: number;
}
export class LoggerImpl<T> extends Logger {
  protected readonly _subject: Subject<LogEntry> = new Subject<LogEntry>();
  protected _metadata: LoggerMetadata;
  private _obs: Observable<LogEntry>;
  protected get _observable() {
    return this._obs;
  }
  protected set _observable(v: Observable<LogEntry>) {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    this._obs = v;
    if (this.parent) {
      this._subscription = this.subscribe(
        (value: any) => {
          if (this.parent) {
            this.parent._subject.next(value);
          }
        },
        (error: Error) => {
          if (this.parent) {
            this.parent._subject.error(error);
          }
        },
        () => {
          if (this._subscription) {
            this._subscription.unsubscribe();
          }
          this._subscription = null;
        },
      );
    }
  }
  private _subscription: Subscription | null;
  constructor(public name: string, public parent: LoggerImpl<T>) {
    super();
    const path: string[] = [];
    let p = parent;
    while (p) {
      path.push(p.name);
      p = p.parent;
    }
    this._metadata = { name, path };
    this._observable = this._subject.asObservable();
    if (this.parent && this.parent._subject) {
      // When the parent completes, complete us as well.
      this.parent._subject.subscribe(undefined, undefined, () =>
        this.complete(),
      );
    }
  }
  complete() {
    this._subject.complete();
  }
  createChild(name: string): LoggerImpl<T> {
    return new LoggerImpl<T>(name, this);
  }
  log(level: LogLevel, message: string, metadata?: JsonObject): void {
    const entry: LogEntry = Object.assign({}, this._metadata, metadata, {
      level,
      message,
      timestamp: +Date.now(),
    });
    this._subject.next(entry);
  }
  debug(message: string, metadata?: JsonObject): void {
    return this.log('debug', message, metadata);
  }
  info(message: string, metadata?: JsonObject): void {
    return this.log('info', message, metadata);
  }
  warn(message: string, metadata?: JsonObject): void {
    return this.log('warn', message, metadata);
  }
  error(message: string, metadata?: JsonObject): void {
    return this.log('error', message, metadata);
  }
  fatal(message: string, metadata?: JsonObject): void {
    return this.log('fatal', message, metadata);
  }
  lift<R>(operator: Operator<LogEntry, R>): Observable<R> {
    return this._observable.lift(operator);
  }

  subscribe(): Subscription;
  subscribe(observer: PartialObserver<LogEntry>): Subscription;
  subscribe(
    next?: (value: LogEntry) => void,
    error?: (error: Error) => void,
    complete?: () => void,
  ): Subscription;
  subscribe(
    _observerOrNext?: PartialObserver<LogEntry> | ((value: LogEntry) => void),
    _error?: (error: Error) => void,
    _complete?: () => void,
  ): Subscription {
    return this._observable.subscribe.apply(this._observable, arguments);
  }
  forEach(
    next: (value: T) => void,
    PromiseCtor?: typeof Promise,
  ): Promise<void> {
    return this._observable.forEach(next as any, PromiseCtor);
  }
}

export class LoggerFactoryImpl extends LoggerFactory {
  create(name: string) {
    return new LoggerImpl(name, null);
  }

  createChild(parent: Logger, name: string) {
    return parent.createChild(name);
  }
}

@NgModule({
  providers: [
    {
      provide: Logger,
      useFactory: (injector: Injector) => {
        let name = injector.get(AppName, 'ims.logger');
        return new LoggerImpl(name, null);
      },
      deps: [Injector],
    },
    {
      provide: LoggerFactory,
      useClass: LoggerFactoryImpl,
      deps: [],
    },
  ],
})
export class LoggerModule {}
