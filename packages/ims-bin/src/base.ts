import { InjectionToken } from 'ims-core';
export abstract class ImsBinBase {
  abstract match(s: string, ...args: any[]): boolean;
  abstract run(): any;
}
export const ImsBinToken = new InjectionToken<ImsBinBase[]>('ImsBinToken');
