import { InjectionToken } from 'ims-core';
export interface State {
  init(): void;
  initialized(): void;
  stop(): void;
  stopped(): void;
  start(): void;
  started(): void;
  state(): string;
}
export const State = new InjectionToken<State>('State');
