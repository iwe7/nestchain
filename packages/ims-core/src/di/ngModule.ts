import {
  makeDecorator,
  TypeDecorator,
  getMetadata,
  isClassMetadata,
} from 'ims-decorator';
import {
  Provider,
  StaticProvider,
  isTypeProvider,
  isClassProvider,
} from './provider';
import { Type, isType } from '../type';
import { Injector } from './injector';
import { createProxyType } from './proxy';
import { Observable, of } from 'ims-rxjs';
import { isArray } from 'ims-util';
export interface ModuleWithProviders<T = any> {
  ngModule: Type<T>;
  providers?: Provider[];
}
export function isModuleWithProviders<T = any>(
  val: any,
): val is ModuleWithProviders<T> {
  return val.ngModule;
}
export interface NgModule {
  providers?: Provider[];
  imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
}
export interface NgModuleDecorator {
  (obj?: NgModule): TypeDecorator;
  new (obj?: NgModule): NgModule;
}
export const NgModuleMetadataKey = 'NgModuleMetadataKey';
export const NgModule: NgModuleDecorator = makeDecorator(
  NgModuleMetadataKey,
  'visitNgModule',
);
export type ImsModule = NgModule;
export const ImsModule: NgModuleDecorator = NgModule;

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

export function createNgModuleFactory(
  ngModuleType: Type<any>,
  injector: Injector,
): NgModuleFactory<any> {
  return new NgModuleFactory_(ngModuleType, injector);
}
export class NgModuleFactory_<T> extends NgModuleFactory<T> {
  get moduleType(): Type<T> {
    return this._moduleType;
  }
  private _moduleType: Type<T>;
  constructor(private type: Type<any>, public _injector?: Injector) {
    super();
    this._moduleType = createProxyType(type);
  }
  create(parentInjector: Injector | null): NgModuleRef<T> {
    let instance = new this.moduleType();
    let staticProviders: StaticProvider[] = getNgModuleStaticProvider(
      this.type,
    );
    let injector = Injector.create(staticProviders, parentInjector);
    return new NgModuleRef_(injector, instance);
  }
}

export function getNgModuleStaticProvider(type: Type<any>) {
  let meta = getMetadata(type);
  let staticProviders: StaticProvider[] = [];
  let staticProviderMap: Map<StaticProvider, StaticProvider> = new Map();
  meta.forEach(it => {
    if (isClassMetadata<NgModule>(it)) {
      if (it.metadataKey === NgModuleMetadataKey) {
        let { providers, imports } = it.metadataDef;
        imports &&
          imports.map(imt => {
            if (isType(imt)) {
              getNgModuleStaticProvider(imt).forEach((it: StaticProvider) => {
                if (!isArray(it)) {
                  staticProviderMap.set(it, it);
                }
              });
            }
            if (isModuleWithProviders(imt)) {
              imt.providers.forEach(provide => {
                let staticProvider = providerToStaticProvider(provide);
                if (!isArray(staticProvider)) {
                  staticProviderMap.set(staticProvider, staticProvider);
                }
              });
            }
          });

        /**
         * providers
         */
        providers &&
          providers.forEach(provide => {
            let staticProvider = providerToStaticProvider(provide);
            if (!isArray(staticProvider)) {
              staticProviderMap.set(staticProvider, staticProvider);
            }
          });
      }
    }
  });
  staticProviderMap.forEach(provide => {
    staticProviders.push(provide);
  });
  return staticProviders;
}

export function providerToStaticProvider(provider: Provider): StaticProvider {
  if (isTypeProvider(provider)) {
    return {
      provide: provider,
      useClass: createProxyType(provider),
      deps: [],
    };
  }
  if (isClassProvider(provider)) {
    return {
      provide: provider.provide,
      useClass: createProxyType(provider.useClass),
      deps: [],
      multi: provider.multi,
    };
  }
  return provider;
}
export class NgModuleRef_<T> extends NgModuleRef<T> {
  get injector(): Injector {
    return this._injector;
  }
  get instance(): T {
    return this._instance;
  }
  constructor(private _injector: Injector, private _instance: T) {
    super();
  }
  destroy(): void {}
  onDestroy(callback: () => void): void {}
}
// todo
export function compileNgModuleFactory<M>(
  injector: Injector,
  moduleType: Type<M>,
): Observable<NgModuleFactory<M>> {
  return of(createNgModuleFactory(moduleType, injector));
}
