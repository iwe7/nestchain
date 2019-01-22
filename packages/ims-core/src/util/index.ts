export function getClosureSafeProperty<T>(objWithPropertyToExtract: T): string {
  for (let key in objWithPropertyToExtract) {
    if (objWithPropertyToExtract[key] === (getClosureSafeProperty as any)) {
      return key;
    }
  }
  throw Error('Could not find renamed property on target object.');
}

export function stringify(token: any): string {
  if (typeof token === 'string') {
    return token;
  }
  if (token instanceof Array) {
    return '[' + token.map(stringify).join(', ') + ']';
  }
  if (token == null) {
    return '' + token;
  }
  if (token.overriddenName) {
    return `${token.overriddenName}`;
  }
  if (token.name) {
    return `${token.name}`;
  }
  const res = token.toString();
  if (res == null) {
    return '' + res;
  }
  const newLineIndex = res.indexOf('\n');
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

export function isFunction(val: any): val is Function {
  return typeof val === 'function';
}
export function isArray(val: any): val is Array<any> {
  return Array.isArray(val);
}

export function isPromise<T = any>(v: any): v is Promise<T> {
  return isFunction(v.then);
}

export function staticError(text: string, obj: any): Error {
  return new Error(formatError(text, obj));
}

const NEW_LINE = /\n/gm;
const NO_NEW_LINE = 'ɵ';

export function formatError(
  text: string,
  obj: any,
  source: string | null = null,
): string {
  text =
    text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE
      ? text.substr(2)
      : text;
  let context = stringify(obj);
  if (obj instanceof Array) {
    context = obj.map(stringify).join(' -> ');
  } else if (typeof obj === 'object') {
    let parts = <string[]>[];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        parts.push(
          key +
            ':' +
            (typeof value === 'string'
              ? JSON.stringify(value)
              : stringify(value)),
        );
      }
    }
    context = `{${parts.join(', ')}}`;
  }
  return `StaticInjectorError${
    source ? '(' + source + ')' : ''
  }[${context}]: ${text.replace(NEW_LINE, '\n  ')}`;
}
