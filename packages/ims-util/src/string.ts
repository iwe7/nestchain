export const toLowerCase = (str: string) => str.toLowerCase();

export const replaceTypeName = (type, replace) => {
  let className = type.name;
  className = toLowerCase(className).replace(toLowerCase(replace), '');
  return className;
};
export const toDashCase = (str: string) =>
  toLowerCase(
    str
      .replace(/([A-Z0-9])/g, g => ' ' + g[0])
      .trim()
      .replace(/ /g, '-'),
  );
export function camelCase(str: string, firstCapital: boolean = false): string {
  return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
    if (firstCapital === true && offset === 0) return p1;
    if (p2) return p2.toUpperCase();
    const p1Lower = p1.toLowerCase();
    return p1Lower;
  });
}
// 捕获型 ()
// 非捕获型 (?:)
// 正向前瞻型 (?=)
// 反向前瞻型 (?!)
export function snakeCase(str: string) {
  return str
    .replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, function(
      substring: string,
      $1,
      $2,
      $3,
      $4,
      offset,
      ...args: any[]
    ) {
      return `${checkString($1)}_${checkString($3)}${checkString(
        $2,
      )}${checkString($4)}`;
    })
    .toLowerCase();
}

export function checkString(str: string, _: string = '') {
  return str ? str : _;
}

export function titleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1),
  );
}

export function abbreviate(str: string, abbrLettersCount: number = 1): string {
  const words = str
    .replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2')
    .split(' ');
  return words.reduce((res, word) => {
    res += word.substr(0, abbrLettersCount);
    return res;
  }, '');
}

export const dashToPascalCase = (str: string) =>
  toLowerCase(str)
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');

export const toTitleCase = titleCase;
export const captializeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const toLTitleCase = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1);
