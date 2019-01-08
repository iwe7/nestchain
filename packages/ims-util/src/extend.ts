import { Type } from './type';
export function extend<T, U>(target: Type<T>, source1: Type<U>): Type<T & U>;
export function extend<T, U, V>(
  target: Type<T>,
  source1: Type<U>,
  source2: Type<V>,
): Type<T & U & V>;
export function extend<T, U, V, W>(
  target: Type<T>,
  source1: Type<U>,
  source2: Type<V>,
  source3: Type<W>,
): Type<T & U & V & W>;
export function extend<T, U, V, W, X>(
  target: Type<T>,
  source1: Type<U>,
  source2: Type<V>,
  source3: Type<W>,
  source4: Type<W>,
): Type<T & U & V & W & X>;

export function extend<T, U, V, W, X, Y>(
  target: Type<T>,
  source1: Type<U>,
  source2: Type<V>,
  source3: Type<W>,
  source4: Type<W>,
  source5: Type<W>,
): Type<T & U & V & W & X & Y>;

export function extend<T, U, V, W, X, Y, Z>(
  target: Type<T>,
  source1: Type<U>,
  source2: Type<V>,
  source3: Type<W>,
  source4: Type<W>,
  source5: Type<W>,
  source6: Type<W>,
): Type<T & U & V & W & X & Y & Z>;

export function extend(target: Type<any>, ...sources: Type<any>[]): Type<any> {
  return sources.reduce((acc, target) => {
    if (!acc) return target;
    return mixin(acc, target);
  }, target);
}

export function mixin<U, V>(Target: Type<any>, Super: Type<any>): Type<U & V> {
  let target: any = (function(_target, _super) {
    const symbol = Symbol.for(`@${_target.name}/@${_super.name}`);
    class Mixin extends Super {
      get [symbol]() {
        return true;
      }
      constructor(...args: any[]) {
        super(...args);
        _target.call(this, ...args);
      }
    }
    // 静态方法
    let _static: any = _target;
    while (Reflect.has(_static, 'name') && _static.name !== '') {
      let names = Object.getOwnPropertyNames(_static).filter(
        key => !['name', 'length', 'prototype'].includes(key),
      );
      for (let i of names) {
        Mixin[i] = _static[i];
      }
      _static = Reflect.getPrototypeOf(_static);
    }

    // 覆盖方法
    for (let i in _target.prototype) {
      Reflect.defineProperty(Mixin.prototype, i, _target.prototype[i]);
    }
    // 纠正reame
    Reflect.defineProperty(Mixin, 'name', {
      get() {
        return _target.name;
      },
    });
    return Mixin;
  })(Target, Super);
  return target;
}
