import { Type } from 'ims-core';
import { assign } from './assign';
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
  return extend2(target)(...sources.reverse());
}

function extend2(target: Type<any>) {
  return (...sources: Type<any>[]): Type<any> => {
    let targetPrototype = target.prototype;
    // 继承
    (function() {
      // 创建一个干净的实例
      function beget() {
        function F() {
          sources.map(source => source.call(this));
        }
        // sources处理
        assign(F.prototype, targetPrototype);
        assign(F.prototype, ...sources.map(source => source.prototype));
        return new F();
      }
      let prototype = beget();
      prototype.constructor = target;
      // 继承
      target.prototype = prototype;
      // 原来的方法
      assign(target.prototype, targetPrototype);
    })();
    return target as any;
  };
}
