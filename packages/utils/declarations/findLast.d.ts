export {};

declare global {
  interface Array<T> {
    findLast<S extends T>(
      predicate: (value: T, index: number, array: T[]) => value is S,
      thisArg?: any,
    ): S | undefined;
    findLast(
      predicate: (value: T, index: number, array: T[]) => unknown,
      thisArg?: any,
    ): T | undefined;
    findLastIndex(
      predicate: (value: T, index: number, array: T[]) => unknown,
      thisArg?: any,
    ): number;
  }
}
