export abstract class Key {
  get [Symbol.toStringTag]() /* : string */ {
    return `[Key ${this.toString()}]`;
  }
  abstract toString(encoding?: string): string;
  abstract toBuffer(): Buffer;
  abstract clean(): void;
  abstract less(key: Key): boolean;
  abstract reverse(): Key;
  abstract namespaces(): string[];
  abstract baseNamespace(): string;
  abstract list(): string[];
  abstract type(): string;
  abstract name(): string;
  abstract instance(s: string): Key;
  abstract path(): Key;
  abstract parent(): Key;
  abstract child(key: Key): Key;
  abstract isAncestorOf(other: Key): boolean;
  abstract isDecendantOf(other: Key): boolean;
  abstract isTopLevel(): boolean;
}

export abstract class KeyFactory {
  abstract withNamespaces(list: string[]): Key;
  abstract random(): Key;
  abstract create(str: string, d?: boolean): Key;
}
