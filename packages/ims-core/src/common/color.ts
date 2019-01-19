export abstract class Color {
  public a: number;
  public r: number;
  public g: number;
  public b: number;
  public hex: string;
  public argb: number;
  public name: string;
  abstract equals(value: Color): boolean;
}

export abstract class ColorHelper {
  abstract equals(value1: Color, value2: Color): boolean;
  abstract isValid(value: any): boolean;
}
