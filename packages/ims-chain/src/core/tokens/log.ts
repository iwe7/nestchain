import { InjectionToken } from 'ims-core';
export interface Log {
  (msg: any): void;
}
export const Log = new InjectionToken<Log>('Log');
export const LogErr = new InjectionToken<Log>('LogErr');
