export abstract class LinkedList<T> {
  abstract prepend(value: T): LinkedList<T>;
  abstract append(value: T): LinkedList<T>;
  abstract delete(value: T): LinkedListNode<T>;
  abstract find(opt: {
    value: T;
    callback: (val: T) => boolean;
  }): LinkedListNode<T>;
  abstract deleteTail(): LinkedListNode<T>;
  abstract deleteHead(): LinkedListNode<T>;
  abstract fromArray(values: T[]): LinkedList<T>;
  abstract toArray(): LinkedListNode<T>[];
  abstract toString(callback: (val: T) => string): string;
  abstract reverse(): LinkedList<T>;
}
export abstract class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T>;
  abstract toString(callback: (val: T) => string): string;
}

export abstract class LinkedListFactory {
  abstract create<T>(): LinkedList<T>;
  abstract traversal<T>(
    linkedList: LinkedList<T>,
    callback: (val: T) => any,
  ): void;
  abstract reverseTraversal<T>(
    linkedList: LinkedList<T>,
    callback: (val: T) => any,
  ): void;
}
