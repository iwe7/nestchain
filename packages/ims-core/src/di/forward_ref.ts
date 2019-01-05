import { Type } from '../type';
import { stringify, getClosureSafeProperty } from 'ims-util';

export interface ForwardRefFn {
  (): any;
}

const __forward_ref__ = getClosureSafeProperty({
  __forward_ref__: getClosureSafeProperty,
});

export function forwardRef(forwardRefFn: ForwardRefFn): Type<any> {
  (<any>forwardRefFn).__forward_ref__ = forwardRef;
  (<any>forwardRefFn).toString = function() {
    return stringify(this());
  };
  return <Type<any>>(<any>forwardRefFn);
}

export function resolveForwardRef<T>(type: T): T {
  const fn: any = type;
  if (
    typeof fn === 'function' &&
    fn.hasOwnProperty(__forward_ref__) &&
    fn.__forward_ref__ === forwardRef
  ) {
    return fn();
  } else {
    return type;
  }
}
