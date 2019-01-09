import { KeyFactory, Key } from 'ims-core';
export class KeyImpl extends Key {
  toString(encoding?: string): string;
  toBuffer(): Buffer;
  clean(): void;
  less(key: Key): boolean;
  reverse(): Key;
  namespaces(): string[];
  baseNamespace(): string;
  list(): string[];
  type(): string;
  name(): string;
  instance(s: string): Key;
  path(): Key;
  parent(): Key;
  child(key: Key): Key;
  isAncestorOf(other: Key): boolean;
  isDecendantOf(other: Key): boolean;
  isTopLevel(): boolean;
}
export class KeyFactoryImpl extends KeyFactory {
  withNamespaces(list: string[]): Key {
    return new KeyImpl();
  }
  random(): Key {
    return new KeyImpl();
  }
  create(str: string): Key {
    return new KeyImpl();
  }
}
