import { Type } from 'ims-core';
import { defineInjectable } from './defs';

export class InjectionToken<T> {
  readonly ngMetadataName = 'InjectionToken';
  readonly ngInjectableDef: never | undefined;
  constructor(
    protected _desc: string,
    options?: {
      providedIn?: Type<any> | 'root' | null;
      factory: () => T;
    },
  ) {
    if (options !== undefined) {
      this.ngInjectableDef = defineInjectable({
        providedIn: options.providedIn || 'root',
        factory: options.factory,
      });
    } else {
      this.ngInjectableDef = undefined;
    }
  }
  toString(): string {
    return `InjectionToken ${this._desc}`;
  }
}

export interface InjectableDefToken<T> extends InjectionToken<T> {
  ngInjectableDef: never;
}
