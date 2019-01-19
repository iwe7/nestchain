import { Type } from '../type';
import { InjectionToken } from './injection_token';
import { InjectFlags, Injector } from './injector';
import { InjectableDef, getInjectableDef } from './defs';
import { stringify, isPromise } from 'ims-util';
let _injectImplementation:
  | (<T>(token: Type<T> | InjectionToken<T>, flags: InjectFlags) => T | null)
  | undefined;

export function inject<T>(token: Type<T> | InjectionToken<T>): Promise<T>;
export function inject<T>(
  token: Type<T> | InjectionToken<T>,
  flags?: InjectFlags,
): Promise<T | null>;
export async function inject<T>(
  token: Type<T> | InjectionToken<T>,
  flags = InjectFlags.Default,
): Promise<T | null> {
  return (_injectImplementation || (await injectInjectorOnly))(token, flags);
}
let _currentInjector: Injector | undefined | null = undefined;

export function setCurrentInjector(injector: Injector) {
  _currentInjector = injector;
}

export function getCurrentInjector() {
  return _currentInjector;
}

export function injectInjectorOnly<T>(
  token: Type<T> | InjectionToken<T>,
): Promise<T>;
export function injectInjectorOnly<T>(
  token: Type<T> | InjectionToken<T>,
  flags?: InjectFlags,
): Promise<T | null>;
export async function injectInjectorOnly<T>(
  token: Type<T> | InjectionToken<T>,
  flags = InjectFlags.Default,
): Promise<T | null> {
  if (_currentInjector === undefined) {
    throw new Error(`inject() must be called from an injection context`);
  } else if (_currentInjector === null) {
    return await injectRootLimpMode(token, undefined, flags);
  } else {
    return await _currentInjector.get(
      token,
      flags & InjectFlags.Optional ? null : undefined,
      flags,
    );
  }
}

export async function injectRootLimpMode<T>(
  token: Type<T> | InjectionToken<T>,
  notFoundValue: T | undefined,
  flags: InjectFlags,
): Promise<T | null> {
  const injectableDef: InjectableDef<T> | null = getInjectableDef(token);
  if (injectableDef && injectableDef.providedIn == 'root') {
    const get = async () => {
      let value = injectableDef.factory();
      if (isPromise(value)) {
        return await value;
      } else {
        return value;
      }
    };

    return injectableDef.value === undefined
      ? (injectableDef.value = await get())
      : injectableDef.value;
  }
  if (flags & InjectFlags.Optional) return null;
  if (notFoundValue !== undefined) return notFoundValue;
  throw new Error(`Injector: NOT_FOUND [${stringify(token)}]`);
}
