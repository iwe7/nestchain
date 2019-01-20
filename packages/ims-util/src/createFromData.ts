const symbolNext = Symbol.for('ims symbol next');
const symbolComplete = Symbol.for('ims symbol complete');
const symbolError = Symbol.for('ims symbol error');
import { Symbol_observable } from 'ims-rxjs';
import { LifeSubject } from './life';

export function handlerObservable(p: PropertyKey, life: LifeSubject) {
  if (p === Symbol_observable) return () => life;
  if (p === symbolComplete) return () => life.complete();
  if (p === symbolNext) return (data: any) => life.next(data);
  if (p === symbolError) return (err: any) => life.error(err);
}

export function toFrom(val: any, path: PropertyKey = '') {
  return new ObservableData(path, val).getValue();
}

export class ObservableData {
  constructor(
    public _path: any,
    public value: any,
    public parent: ObservableData = undefined,
  ) {}

  getValue() {
    let value = this.value;
    if (value === undefined || value === null) {
      return value;
    }
    if (typeof value !== 'object') {
      return value;
    }
    let life: LifeSubject;
    if (value[Symbol_observable]) {
      life = value[Symbol_observable]();
    } else {
      life = new LifeSubject();
    }
    return new Proxy(value, {
      get: (target: any, p: PropertyKey, receiver: any) => {
        let observable = handlerObservable(p, life);
        if (observable) return observable;
        let res = Reflect.get(target, p, receiver);
        return this.createChild(p, res).getValue();
      },
      set: (target: any, p: PropertyKey, value: any, receiver: any) => {
        let old: any;
        if (Reflect.has(target, p)) {
          old = Reflect.get(target, p);
          life.next({
            type: 'update',
            state: 'end',
            payload: {
              path: this.getPath(),
              old,
              value,
            },
          });
        }
        return Reflect.set(target, p, value, receiver);
      },
      defineProperty(
        target: any,
        p: PropertyKey,
        attributes: PropertyDescriptor,
      ) {
        if (Reflect.has(target, p)) {
        } else {
          life.next({
            type: 'add',
            state: 'end',
            payload: {
              path: this.getPath(),
              target,
              p,
              attributes,
            },
          });
        }
        return Reflect.defineProperty(target, p, attributes);
      },
      deleteProperty(target: any, p: PropertyKey) {
        life.next({
          type: 'delete',
          state: 'end',
          payload: {
            path: this.getPath(),
            target,
            p,
          },
        });
        return Reflect.deleteProperty(target, p);
      },
    });
  }

  getPath(): any[] {
    let res = [];
    if (this._path && this._path !== '') {
      res.push(this._path);
    }
    if (this.parent) {
      res = res.concat(...this.parent.getPath().reverse());
    }
    return res.reverse();
  }

  createChild(path: any, value: any) {
    return new ObservableData(path, value, this);
  }
}
