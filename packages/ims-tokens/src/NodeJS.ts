import { InjectionToken } from 'ims-core';
export interface NodeJs {
  Module: NodeJS.Module;
  Immediate: NodeJS.Immediate;
  EventEmitter: NodeJS.EventEmitter;
  Timeout: NodeJS.Timeout;
}
export const NodeJs = new InjectionToken<NodeJs>('NodeJs');
/**
 * global
 */
export const Process = new InjectionToken<NodeJS.Process>('Process');
export const Global = new InjectionToken<NodeJS.Global>('Global');
export const Console = new InjectionToken<Console>('Console');

export const Filename = new InjectionToken<string>('Filename');
export const Dirname = new InjectionToken<string>('Dirname');

export const Require = new InjectionToken<NodeRequire>('Require');
export const Module = new InjectionToken<NodeModule>('Module');
export const Exports = new InjectionToken<any>('Exports');
