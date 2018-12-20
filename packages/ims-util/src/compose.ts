export function compose(...args: any[]) {
  if (args.length === 0) {
    return dir => dir;
  }
  return args.reduce(
    (acc, curr) => {
      return target => curr(acc(target));
    },
    dir => dir
  );
}
