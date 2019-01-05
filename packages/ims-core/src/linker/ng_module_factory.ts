import { Injector } from '../di/injector';
import { Type } from '../type';

export abstract class NgModuleRef<T> {
  abstract get injector(): Injector;
  abstract get instance(): T;
  abstract destroy(): void;
  abstract onDestroy(callback: () => void): void;
}

export interface InternalNgModuleRef<T> extends NgModuleRef<T> {
  _bootstrapComponents: Type<any>[];
}

export abstract class NgModuleFactory<T> {
  abstract get moduleType(): Type<T>;
  abstract create(parentInjector: Injector | null): NgModuleRef<T>;
}
