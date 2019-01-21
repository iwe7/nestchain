import { InjectionToken } from 'ims-core';
export interface Start {
  (): Promise<void>;
}
export const Start = new InjectionToken<Start>('Start');
