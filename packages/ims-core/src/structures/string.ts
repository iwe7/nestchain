export abstract class StringFactory {
  abstract hammingDistance(a: string, b: string): number;
  abstract knuthMorrisPratt(text: string, word: string): number;
  abstract levenshteinDistance(a: string, b: string): number;
  abstract longestCommonSubstring(string1: string, string2: string): string;
  abstract rabinKarp(text: string, word: string): number;
  abstract regularExpressionMatching(str: string, pattern: string): boolean;
  abstract zAlgorithm(text: string, word: string): number[];
}
