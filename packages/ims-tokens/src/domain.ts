import { InjectionToken } from 'ims-core';
export interface Domain {
  create(): Domain;
}
export const Domain = new InjectionToken('domain');
