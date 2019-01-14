import { uniq, keys, dissoc, equals } from 'ramda';
import { getType } from './lang';
import { isNullOrUndefined, isObject, isArray, isString } from 'util';
export function createMerge(isSame: (a, b) => boolean) {
  return function merge<T = any>(...sources: T[]) {
    if (sources.length === 1) {
      return sources[0];
    }
    return sources.reduce((acc, curr) => mergeHelper(acc, curr, isSame), {});
  };
}

export default createMerge((a, b) => equals(a, b));

function mergeHelper(a, b, isSame) {
  if (a === b) {
    return b;
  }
  const typeA = getType(a);
  switch (typeA) {
    case 'array':
      return mergeArray(a, b, isSame);
    case 'object':
      return mergeObject(a, b, isSame);
    case 'undefined':
      return b;
    case 'null':
      return b;
    default:
      if (a === b) {
        return b;
      }
      return mergeDefault(a, b, isSame);
  }
}
function mergeArray(a: any[], b: any, isSame) {
  const bType = getType(b);
  switch (bType) {
    case 'array':
      // 对比a和b的每一个项目，查看项目的键值是否有相等的
      const rowLength = a.length;
      const colLength = b.length;
      for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < colLength; j++) {
          const equalKeys = getEqualKey(a[i], b[j], isSame);
          const itema = a[i];
          const itemb = b[j];
          if (isString(itema) && isString(itemb)) {
            if (itema === itemb) {
            } else if (itema.startsWith(itemb)) {
              a[i] = itema;
              delete b[j];
              break;
            } else if (itemb.startsWith(itema)) {
              a[i] = itemb;
              delete b[j];
              break;
            }
          }
          if (equalKeys.length > 0) {
            const result = mergeHelper(itema, itemb, isSame);
            a[i] = result;
            delete b[j];
            break;
          }
        }
      }
      a = a.filter(res => check(res));
      b = b.filter(res => check(res));
      return uniq(a.concat(b));
    case 'null':
    case 'undefined':
      return a;
    default:
      return [...a, b];
  }
}
function mergeObject(a: object, b: any, isSame) {
  const bType = getType(b);
  switch (bType) {
    case 'array':
      return uniq([a, ...b]);
    case 'object':
      let result = {};
      const allKeys = uniq(keys(a).concat(keys(b as object)));
      if (allKeys.length > 0) {
        for (let i = 0; i < allKeys.length; i++) {
          const key: string = allKeys[i];
          const _keys = key + 's';
          // a[key] b[keys] `${key}s`
          if (a[key] && b[_keys]) {
            a[_keys] = [a[key]];
            a = dissoc(key, a);
          }
          if (b[key] && a[_keys]) {
            a = dissoc(_keys, a);
            result = dissoc(_keys, a);
          }
          const source = a[key];
          const target = b[key];
          if (!isNullOrUndefined(source) || !isNullOrUndefined(target)) {
            const res = mergeHelper(source, target, isSame);
            result[key] = res;
          }
        }
      }
      return result;
    default:
      return b;
  }
}

function check(a) {
  if (isNullOrUndefined(a)) return false;
  if (isObject(a) || isArray(a)) {
    return keys(a).length > 0;
  }
  return true;
}
function getEqualKey(a, b, isSame): any[] {
  try {
    const key = uniq(keys(a).concat(keys(b)));
    return key.filter(key => {
      try {
        const res = isSame([key, toString(a[key])], [key, toString(b[key])]);
        return res;
      } catch (e) {
        return false;
      }
    });
  } catch (e) {
    return [];
  }
}

function toString(a) {
  const t = getType(a);
  switch (t) {
    case 'null':
    case 'undefined':
      return false;
    case 'string':
      return a;
    case 'number':
      return `${a}`;
    case 'boolean':
      return `${a}`;
    case 'object':
      return `[object ${keys(a)
        .map(key => `${key as string}:${toString(a[key])}`)
        .join('\n')}]`;
    default:
      return a.toString();
  }
}

function mergeDefault(a: string | number | RegExp | boolean, b: any, isSame) {
  const bType = getType(b);
  switch (bType) {
    case 'array':
      return uniq([a, ...b]);
    case 'null':
    case 'undefined':
      return a;
    case 'string':
      if ((b as string).startsWith(a as string)) {
        return b;
      }
      if ((a as string).startsWith(b as string)) {
        return a;
      }
      return b;
    default:
      return b;
  }
}
