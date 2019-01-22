export const Type = Function;
export interface Type<T extends Object> extends Function {
  new (...args: any[]): T;
}
export function isType<T = any>(v: any): v is Type<T> {
  return typeof v === 'function';
}
export interface MapLike<T> {
  [index: string]: T;
}
