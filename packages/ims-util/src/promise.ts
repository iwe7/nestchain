export class ImsPromise<T> {
  get promise(): Promise<T> {
    return this._promise;
  }
  private resolve: (value?: T | PromiseLike<T>) => void;
  private reject: (reason?: any) => void;
  private _promise: Promise<T>;
  constructor() {
    this._promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  next(value?: T | PromiseLike<T>) {
    this.resolve(value);
  }
  error(reason?: any) {
    this.reject(reason);
  }
}
