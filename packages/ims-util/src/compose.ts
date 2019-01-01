export function compose(...args: any[]) {
  if (args.length === 0) {
    return dir => dir;
  }
  return args.reduce((acc: any, curr: any) => {
    acc = acc || defaultComposeFn;
    curr = curr || defaultComposeFn;
    return (target: any) => curr(acc(target));
  }, defaultComposeFn);
}
function defaultComposeFn(dir: any) {
  return dir;
}
