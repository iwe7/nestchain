export abstract class DisjointSet<T> {
  abstract makeSet(itemValue: T): DisjointSet<T>;
  abstract find(itemValue: T): string;
  abstract union(valueA: T, value: T): DisjointSet<T>;
  abstract inSameSet(valueA: T, valueB: T): boolean;
}

export abstract class DisjointSetItem<T> {
  abstract getKey(): T;
  abstract getRoot(): DisjointSetItem<T>;
  abstract isRoot(): boolean;
  abstract getRank(): number;
  abstract getChildren(): DisjointSetItem<T>[];
  abstract setParent(
    parentItem: DisjointSetItem<T>,
    forceSettingParentChild: boolean,
  ): DisjointSetItem<T>;
  abstract addChild(childItem: DisjointSetItem<T>): DisjointSetItem<T>;
}
