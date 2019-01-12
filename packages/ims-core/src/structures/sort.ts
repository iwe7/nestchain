import { Comparator } from './comparator';

export abstract class SortFactory {
  abstract initSortingCallbacks(
    originalCallbacks: SortCallbacks,
  ): SortCallbacks;
}

export interface SortCallbacks {
  compareCallback?: Function;
  visitingCallback?: Function;
}

export abstract class Sort<T> {
  callbacks: SortCallbacks;
  comparator: Comparator<T>;
  abstract sort(...args: any[]): T[];
}

export abstract class BubbleSort<T> extends Sort<T> {}
export abstract class CountingSort<T> extends Sort<T> {}
export abstract class InsertionSort<T> extends Sort<T> {}
export abstract class MergeSort<T> extends Sort<T> {}
export abstract class QuickSort<T> extends Sort<T> {}
export abstract class QuickSortInPlace<T> extends Sort<T> {}
export abstract class RadixSort<T> extends Sort<T> {}
export abstract class SelectionSort<T> extends Sort<T> {}
export abstract class ShellSort<T> extends Sort<T> {}
