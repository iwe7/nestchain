export const Type = Function;

export interface Type<T> extends Function {
  new (...args: any[]): T;
}
export type ObjectType<T> = { new (): T } | Function;
export interface ObjectLiteral {
  [key: string]: any;
}
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export function isType<T = any>(v: any): v is Type<T> {
  return typeof v === "function";
}

export type Mutable<T extends { [x: string]: any }, K extends string> = {
  [P in K]: T[P]
};

export type IInjector<T = any> = Type<T>[] | { [key: string]: Type<T> };
