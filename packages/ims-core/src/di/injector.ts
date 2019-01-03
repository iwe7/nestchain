import { stringify } from 'ims-util';
import { Type } from '../type';
import { InjectionToken } from './injection_token';
const _THROW_IF_NOT_FOUND = new Object();
export enum InjectFlags {
  Default = 0b0000,
  Host = 0b0001,
  Self = 0b0010,
  SkipSelf = 0b0100,
  Optional = 0b1000,
}
export class NullInjector implements Injector {
  get(token: any, notFoundValue: any = _THROW_IF_NOT_FOUND): any {
    if (notFoundValue === _THROW_IF_NOT_FOUND) {
      throw new Error(
        `NullInjectorError: No provider for ${stringify(token)}!`,
      );
    }
    return notFoundValue;
  }
}
export abstract class Injector {
  static THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
  static NULL: Injector = new NullInjector();
  abstract get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags,
  ): T;
  abstract get(token: any, notFoundValue?: any): any;
  static create(providers: StaticProvider[], parent?: Injector): Injector;
  static create(options: {
    providers: StaticProvider[];
    parent?: Injector;
    name?: string;
  }): Injector;
  static create(
    options:
      | StaticProvider[]
      | { providers: StaticProvider[]; parent?: Injector; name?: string },
    parent?: Injector,
  ): Injector {
    if (Array.isArray(options)) {
      return new StaticInjector(options, parent);
    } else {
      return new StaticInjector(
        options.providers,
        options.parent,
        options.name || null,
      );
    }
  }
  static ngInjectableDef = defineInjectable({
    providedIn: 'any' as any,
    factory: () => inject(INJECTOR),
  });
  static __NG_ELEMENT_ID__: () => Injector = () => SWITCH_INJECTOR_FACTORY();
}
