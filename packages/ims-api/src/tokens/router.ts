import { InjectionToken, Injector } from 'ims-core';
export interface AppRoutes {
  path: string;
  method: 'get' | 'post';
  action: (
    injector: Injector,
  ) => Promise<{ instance: any; propertyKey: string }>;
}
export const AppRoutes = new InjectionToken<AppRoutes[]>('AppRoutes');
