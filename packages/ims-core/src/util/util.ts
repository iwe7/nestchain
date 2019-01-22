import { LifeSubject } from './life';
import { Symbol_observable } from 'ims-rxjs';
import { handlerObservable } from './type';

export function getClosureSafeProperty<T>(objWithPropertyToExtract: T): string {
  for (let key in objWithPropertyToExtract) {
    if (objWithPropertyToExtract[key] === (getClosureSafeProperty as any)) {
      return key;
    }
  }
  throw Error('Could not find renamed property on target object.');
}

export function stringify(token: any): string {
  if (typeof token === 'string') {
    return token;
  }
  if (token instanceof Array) {
    return '[' + token.map(stringify).join(', ') + ']';
  }
  if (token == null) {
    return '' + token;
  }
  if (token.overriddenName) {
    return `${token.overriddenName}`;
  }
  if (token.name) {
    return `${token.name}`;
  }
  const res = token.toString();
  if (res == null) {
    return '' + res;
  }
  const newLineIndex = res.indexOf('\n');
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

export function isFunction(val: any): val is Function {
  return typeof val === 'function';
}
export function isNumber(val: any): val is number {
  return typeof val === 'number';
}
export function isUndefined(val: any): val is undefined {
  return val === undefined;
}
export function isArray(val: any): val is Array<any> {
  return Array.isArray(val);
}

export function isPromise<T = any>(v: any): v is Promise<T> {
  return isFunction(v.then);
}

export function staticError(text: string, obj: any): Error {
  return new Error(formatError(text, obj));
}

const NEW_LINE = /\n/gm;
const NO_NEW_LINE = 'ɵ';

export function formatError(
  text: string,
  obj: any,
  source: string | null = null,
): string {
  text =
    text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE
      ? text.substr(2)
      : text;
  let context = stringify(obj);
  if (obj instanceof Array) {
    context = obj.map(stringify).join(' -> ');
  } else if (typeof obj === 'object') {
    let parts = <string[]>[];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        parts.push(
          key +
            ':' +
            (typeof value === 'string'
              ? JSON.stringify(value)
              : stringify(value)),
        );
      }
    }
    context = `{${parts.join(', ')}}`;
  }
  return `StaticInjectorError${
    source ? '(' + source + ')' : ''
  }[${context}]: ${text.replace(NEW_LINE, '\n  ')}`;
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
