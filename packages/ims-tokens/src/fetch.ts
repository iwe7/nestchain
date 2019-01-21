import { InjectionToken } from 'ims-core';
export interface Fetch {
  (input: RequestInfo, init?: RequestInit): Promise<Response>;
}
export const Fetch = new InjectionToken<Fetch>('Fetch');
