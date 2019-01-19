export { Type, isType, symbolInit } from 'ims-util';

export interface MapLike<T> {
  [index: string]: T;
}
