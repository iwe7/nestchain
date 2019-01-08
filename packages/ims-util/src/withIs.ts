import { Type } from './type';
export interface IWithIs {
  className: string;
  symbolName: string;
}
export function withIs<T>(
  Class: Type<any>,
  symbolName: string,
): Type<T> & {
  is(obj: any): boolean;
} {
  const symbol = Symbol.for(symbolName);
  let Target: any = class extends Class {
    get [symbol]() {
      return true;
    }
    get [Symbol.toStringTag]() {
      return Class.name;
    }
    static is(obj: any) {
      return !!(obj && obj[symbol]);
    }
  };
  return Target;
}
