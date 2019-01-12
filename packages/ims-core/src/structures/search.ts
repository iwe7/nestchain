export abstract class SearchFactory {
  abstract binarySearch<T>(
    sortedArray: T[],
    seekElement: T,
    comparatorCallback: (a: T, b: T) => -1 | 0 | 1,
  ): number;

  abstract interpolationSearch<T>(sortedArray: T[], seekElement: T): number;

  abstract jumpSearch<T>(
    sortedArray: T[],
    seekElement: T,
    comparatorCallback: (a: T, b: T) => -1 | 0 | 1,
  ): number;

  abstract linearSearch<T>(
    sortedArray: T[],
    seekElement: T,
    comparatorCallback: (a: T, b: T) => -1 | 0 | 1,
  ): number;
}
