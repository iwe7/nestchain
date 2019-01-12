export abstract class SetsFactory {
  abstract cartesianProduct<T>(setA: T[], setB: T[]): [T, T][];
  abstract combinationSum(candidates: number[], target: number): number[][];
  abstract combineWithRepetitions<T>(
    comboOptions: T[],
    comboLength: number,
  ): T[];
  abstract combineWithoutRepetitions<T>(
    comboOptions: T[],
    comboLength: number,
  ): T[];
  abstract fisherYates<T>(originalArray: T[]): T[];

  abstract longestCommonSubsequence(set1: string[], set2: string[]): string[];
  abstract dpLongestIncreasingSubsequence(sequence: number[]): number;
  abstract bfMaximumSubarray(inputArray: number[]): number[];
  abstract dpMaximumSubarray(inputArray: number[]): number[];
  abstract permutateWithRepetitions<T>(
    permutationOptions: T[],
    permutationLength: number,
  ): T[];
  abstract permutateWithoutRepetitions<T>(permutationOptions: T[]): T[];
  abstract btPowerSet<T>(originalSet: T[]): T[][];
  abstract powerSet<T>(originalSet: T[]): T[][];
  abstract shortestCommonSupersequence(set1: string[], set2: string[]): string[];
}

export abstract class Knapsack {
  abstract sortPossibleItemsByWeight(): KnapsackItem[];
  abstract sortPossibleItemsByValue(): KnapsackItem[];
  abstract sortPossibleItemsByValuePerWeightRatio(): void;
  abstract solveZeroOneKnapsackProblem(): void;
  abstract solveUnboundedKnapsackProblem(): void;
  abstract get totalValue(): number;
  abstract get totalWeight(): number;
}

export abstract class KnapsackItem {
  abstract get totalValue(): number;
  abstract get totalWeight(): number;
  abstract get valuePerWeightRatio(): number;
  abstract toString(): string;
}
