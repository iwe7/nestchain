import { InjectionToken } from 'ims-core';
interface IFormatters {
  [formatter: string]: Function;
}
interface IDebugger {
  (formatter: any, ...args: any[]): void;
  enabled: boolean;
  log: Function;
  namespace: string;
  extend: (namespace: string, delimiter?: string) => IDebugger;
}
export interface Debug {
  (namespace: string): IDebugger;
  coerce: (val: any) => any;
  disable: () => void;
  enable: (namespaces: string) => void;
  enabled: (namespaces: string) => boolean;
  names: RegExp[];
  skips: RegExp[];
  formatters: IFormatters;
}
export const Debug = new InjectionToken<Debug>('Debug');
