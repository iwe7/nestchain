import { Provider } from 'ims-core';
import * as tokens from '../../tokens/index';
export default [
  {
    provide: tokens.State,
    useFactory: async (fsm: tokens.FsmEvent) => {
      let s = fsm('uninitialized', {
        uninitialized: {
          init: 'initializing',
          initialized: 'stopped',
        },
        initializing: {
          initialized: 'stopped',
        },
        stopped: {
          start: 'starting',
        },
        starting: {
          started: 'running',
        },
        running: {
          stop: 'stopping',
        },
        stopping: {
          stopped: 'stopped',
        },
      });
      return {
        init(): void {
          s('init');
        },
        initialized(): void {
          s('initialized');
        },
        stop(): void {
          s('stop');
        },
        stopped(): void {
          s('stopped');
        },
        start(): void {
          s('start');
        },
        started(): void {
          s('started');
        },
        state(): string {
          return s._state;
        },
      } as tokens.State;
    },
    deps: [tokens.FsmEvent],
  },
] as Provider[];
