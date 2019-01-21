import { InjectionToken } from 'ims-core';
interface WordwrapParams {
  start?: number;
  stop?: number;
  mode?: 'hard' | 'soft';
}
interface WordwrapResult {
  (str: string): string;
}
interface WordwrapFunction {
  (stop: number): WordwrapResult;
  (param?: WordwrapParams): WordwrapResult;
  (start: number, param?: WordwrapParams): WordwrapResult;
  (start: number, stop?: number, param?: WordwrapParams): WordwrapResult;
}
export interface Wordwrap extends WordwrapFunction {
  soft: WordwrapFunction;
  hard(start: number, stop: number): WordwrapResult;
}
export const Wordwrap = new InjectionToken<Wordwrap>('Wordwrap');
