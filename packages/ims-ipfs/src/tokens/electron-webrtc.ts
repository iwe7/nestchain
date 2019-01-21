import { InjectionToken } from 'ims-core';
export interface ElectronWebrtc {}
export const ElectronWebrtc = new InjectionToken<ElectronWebrtc>(
  'ElectronWebrtc',
);
