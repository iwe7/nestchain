export interface LooperNext {
  (): void;
}
export function looper(fn: (next?: LooperNext) => void) {
  let active = false,
    called = false;
  return function next() {
    called = true;
    if (!active) {
      active = true;
      while (called) {
        called = false;
        fn(next);
      }
      active = false;
    }
  };
}
