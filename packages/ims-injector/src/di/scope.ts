import { InjectionToken } from './injection_token';
export const APP_ROOT = new InjectionToken<boolean>(
  'The presence of this token marks an injector as being the root injector.',
);
