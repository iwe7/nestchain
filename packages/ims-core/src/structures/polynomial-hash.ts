export abstract class SimplePolynomialHash {
  abstract hash(word: string): number;
  abstract roll(prevHash: number, prevWord: string, newWord: string): number;
}

export abstract class PolynomialHash extends SimplePolynomialHash {
  abstract charToNumber(char: string): number;
}
