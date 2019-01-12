export abstract class HashTable<T> {
  abstract hash(key: string): number;
  abstract set(key: string, value: T): void;
  abstract delete(key: string): T;
  abstract get(key: string): T;
  abstract has(key: string): boolean;
  abstract getKeys(): string[];
}
