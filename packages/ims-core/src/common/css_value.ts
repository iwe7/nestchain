interface CSSValue {
  type: string;
  string: string;
  unit?: string;
  value?: number;
}

export abstract class CssValueParse {
  abstract parse(cssValue: string): Array<CSSValue>;
}
