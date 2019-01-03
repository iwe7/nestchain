import { stringify } from './stringify';

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
