export abstract class DoublyLinkedList<T> {
  abstract prepend(value: T): DoublyLinkedList<T>;
  abstract append(value: T): DoublyLinkedList<T>;
  abstract delete(value: T): DoublyLinkedListNode<T>;
  abstract find(opt: {
    value: T;
    callback: (value: T) => boolean;
  }): DoublyLinkedListNode<T>;
  abstract deleteTail(): DoublyLinkedListNode<T>;
  abstract deleteHead(): DoublyLinkedListNode<T>;
  abstract toArray(): DoublyLinkedListNode<T>[];
  abstract fromArray(values: T[]): DoublyLinkedList<T>;
  abstract toString(callback: (val: T) => string): string;
  abstract reverse(): DoublyLinkedList<T>;
}

export abstract class DoublyLinkedListNode<T> {
  value: T;
  next: DoublyLinkedListNode<T>;
  previous: DoublyLinkedListNode<T>;
  abstract toString(callback: (val: T) => string): string;
}
