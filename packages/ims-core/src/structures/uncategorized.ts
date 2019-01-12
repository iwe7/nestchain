import { Stack } from './stack';

export abstract class Uncategorized {
  abstract hanoiTower<T>(
    numberOfDiscs: number,
    moveCallback: (disc: number, fromPole: number[], toPole: number) => any,
    fromPole: Stack<T>,
    withPole: Stack<T>,
    toPole: Stack<T>,
  ): void;

  abstract backtrackingJumpGame(
    numbers: number[],
    startIndex: number,
    currentJumps: number[],
  ): boolean;
  abstract dpBottomUpJumpGame(numbers: number[]): boolean;
  abstract dpTopDownJumpGame(
    numbers: number[],
    startIndex: number,
    currentJumps: number[],
    cellsGoodness: boolean[],
  ): boolean;
  abstract greedyJumpGame(numbers: number[]): boolean;

  abstract knightTour(chessboardSize: number): number[][];

  abstract nQueens(queensCount: number): QueenPosition[][];
  abstract nQueensBitwise(boardSize: number): number;

  abstract bfRainTerraces(terraces: number[]): number;
  abstract dpRainTerraces(terraces: number[]): number;

  abstract squareMatrixRotation<T>(originalMatrix: T[][]): T[][];

  abstract btUniquePaths(
    width: number,
    height: number,
    steps: number[][],
    uniqueSteps: number,
  ): number;
  abstract dpUniquePaths(width: number, height: number): number;
  abstract uniquePaths(width: number, height: number): number;
}

export abstract class QueenPosition {
  rowIndex: number;
  columnIndex: number;
  abstract get leftDiagonal(): number;
  abstract get rightDiagonal(): number;
  abstract toString(): string;
}
