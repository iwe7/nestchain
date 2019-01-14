export function each(
  obj: any,
  iter: (val: any, key: string, obj?: any) => any,
) {
  for (let key in obj) {
    let value = obj[key];
    iter(value, key, obj);
  }
}
export function keys(obj: any): string[] {
  return Object.keys(obj).sort();
}
export function contains<T = any>(a: T[], v: T) {
  return ~a.indexOf(v);
}
export function union<T = any>(a: T[], b: T[]): T[] {
  return a.filter(v => {
    return contains(b, v);
  });
}
export function equal<T = any>(a: T[], b: T[]): boolean {
  if (a.length != b.length) return false;
  for (var i in a) if (b[i] !== a[i]) return false;
}

export function empty(v: any) {
  for (var k in v) return false;
  return true;
}

export function disunion(a: any[], b: any[]): any[] {
  return a
    .filter(function(v) {
      return !contains(b, v);
    })
    .concat(
      b.filter(function(v) {
        return !contains(a, v);
      }),
    )
    .sort();
}
