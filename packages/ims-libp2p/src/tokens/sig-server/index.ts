import { InjectionToken } from 'ims-core';
export interface SigServerInstance {}
export interface SigServerOptions {
  port: number;
  host: number;
}
export interface SigServer {
  (opt: SigServerOptions): SigServerInstance;
}
export const SigServer = new InjectionToken<SigServer>('SigServer');
