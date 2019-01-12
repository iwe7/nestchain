export abstract class BloomFilter<T> {
  abstract insert(item: T): void;
  abstract mayContain(item: T): boolean;
  abstract createStore(
    size: number,
  ): { getValue: (index: number) => T; setValue: (index: number) => void };
  abstract hash1(item: T): number;
  abstract hash2(item: T): number;
  abstract hash3(item: T): number;
  abstract getHashValues(item: T): number[];
}
