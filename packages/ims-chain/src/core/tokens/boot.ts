import { InjectionToken } from 'ims-core';

export interface BootToken {
  (): Promise<void>;
}
export const BootToken = new InjectionToken<BootToken>('BootToken');
