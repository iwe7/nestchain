export function compose(...args: any[]) {
  if (args.length === 0) {
    return dir => dir;
  }
  return args.reduce(
    (acc: any, curr: any) => {
      return (target: any) => curr(acc(target));
    },
    (dir: any) => dir,
  );
}
