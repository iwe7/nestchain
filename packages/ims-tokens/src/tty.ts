import { InjectionToken } from 'ims-core';
export interface Tty {
  isatty(fd: number): boolean;
}
export const Tty = new InjectionToken<Tty>('tty');
