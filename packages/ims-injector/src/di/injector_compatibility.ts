import { Type } from 'ims-core';
import { stringify } from 'ims-util';
import { InjectableDef, getInjectableDef } from './defs';
import { InjectionToken } from './injection_token';
import { Injector } from './injector';
import {
  OptionalMetadataKey,
  SkipSelfMetadataKey,
  SelfMetadataKey,
  InjectMetadataKey,
} from './metadata';
import { MetadataDef } from 'ims-decorator';

export enum InjectFlags {
  Default = 0b0000,
  Host = 0b0001,
  Self = 0b0010,
  SkipSelf = 0b0100,
  Optional = 0b1000,
}

let _currentInjector: Injector | undefined | null = Injector.create([]);

export function setCurrentInjector(
  injector: Injector | null | undefined,
): Injector | undefined | null {
  const former = _currentInjector;
  _currentInjector = injector;
  return former;
}

let _injectImplementation:
  | (<T>(token: Type<T> | InjectionToken<T>, flags: InjectFlags) => T | null)
  | undefined;

export function setInjectImplementation(
  impl:
    | (<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags) => T | null)
    | undefined,
):
  | (<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags) => T | null)
  | undefined {
  const previous = _injectImplementation;
  _injectImplementation = impl;
  return previous;
}

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

// {deps: [[new Optional(), Type]]}
export function injectArgs(
  types: (Type<any> | InjectionToken<any> | any[])[],
): any[] {
  const args: any[] = [];
  for (let i = 0; i < types.length; i++) {
    const arg = types[i];
    if (Array.isArray(arg)) {
      if (arg.length === 0) {
        throw new Error('Arguments array must have arguments.');
      }
      let type: Type<any> | undefined = undefined;
      let flags = InjectFlags.Default;
      for (let j = 0; j < arg.length; j++) {
        const meta: MetadataDef<any> = arg[j];
        if (meta.metadataDef === OptionalMetadataKey) {
          flags |= InjectFlags.Optional;
        } else if (meta.metadataDef === SkipSelfMetadataKey) {
          flags |= InjectFlags.SkipSelf;
        } else if (meta.metadataDef === SelfMetadataKey) {
          flags |= InjectFlags.Self;
        } else if (meta.metadataDef === InjectMetadataKey) {
        } else {
          type = meta as any;
        }
      }
      args.push(inject(type!, flags));
    } else {
      args.push(inject(arg));
    }
  }
  return args;
}
