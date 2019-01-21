import { InjectionToken } from 'ims-core';
export interface Minimist {
  (args: string[]): { [key: string]: string | number | boolean } & {
    _: string[];
  };
}
export const Minimist = new InjectionToken<Minimist>('Minimist');
