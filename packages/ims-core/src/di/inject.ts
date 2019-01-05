import { Type } from '../type';
import { InjectionToken } from './injection_token';
import { InjectFlags, Injector } from './injector';
import { InjectableDef, getInjectableDef } from './defs';
import { stringify } from 'ims-util';
let _injectImplementation:
  | (<T>(token: Type<T> | InjectionToken<T>, flags: InjectFlags) => T | null)
  | undefined;

export function inject<T>(token: Type<T> | InjectionToken<T>): T;
export function inject<T>(
  token: Type<T> | InjectionToken<T>,
  flags?: InjectFlags,
): T | null;
export function inject<T>(
  token: Type<T> | InjectionToken<T>,
  flags = InjectFlags.Default,
): T | null {
  return (_injectImplementation || injectInjectorOnly)(token, flags);
}
let _currentInjector: Injector | undefined | null = undefined;

export function injectInjectorOnly<T>(token: Type<T> | InjectionToken<T>): T;
export function injectInjectorOnly<T>(
  token: Type<T> | InjectionToken<T>,
  flags?: InjectFlags,
): T | null;
export function injectInjectorOnly<T>(
  token: Type<T> | InjectionToken<T>,
  flags = InjectFlags.Default,
): T | null {
  if (_currentInjector === undefined) {
    throw new Error(`inject() must be called from an injection context`);
  } else if (_currentInjector === null) {
    return injectRootLimpMode(token, undefined, flags);
  } else {
    return _currentInjector.get(
      token,
      flags & InjectFlags.Optional ? null : undefined,
      flags,
    );
  }
}

export function injectRootLimpMode<T>(
  token: Type<T> | InjectionToken<T>,
  notFoundValue: T | undefined,
  flags: InjectFlags,
): T | null {
  const injectableDef: InjectableDef<T> | null = getInjectableDef(token);
  if (injectableDef && injectableDef.providedIn == 'root') {
    return injectableDef.value === undefined
      ? (injectableDef.value = injectableDef.factory())
      : injectableDef.value;
  }
  if (flags & InjectFlags.Optional) return null;
  if (notFoundValue !== undefined) return notFoundValue;
  throw new Error(`Injector: NOT_FOUND [${stringify(token)}]`);
}
