import {
  makeDecorator,
  TypeDecorator,
  getMetadata,
  isClassMetadata,
} from 'ims-decorator';
import { Provider, StaticProvider } from './provider';
import { Type, isType } from '../type';
import { Injector } from './injector';
import { createProxyType } from './proxy';
import { Observable, of } from 'rxjs';
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

function getNgModuleStaticProvider(type: Type<any>) {
  let meta = getMetadata(type);
  let staticProviders: StaticProvider[] = [];
  meta.forEach(it => {
    if (isClassMetadata<NgModule>(it)) {
      if (it.metadataKey === NgModuleMetadataKey) {
        let { providers, imports } = it.metadataDef;
        /**
         * providers
         */
        providers &&
          providers.forEach(provide => {
            if (isType(provide)) {
              staticProviders.push({
                provide,
                useClass: createProxyType(provide),
                deps: [],
              });
            } else {
              staticProviders.push(provide);
            }
          });
        imports &&
          imports.map(imt => {
            if (isType(imt)) {
              getNgModuleStaticProvider(imt).forEach(it =>
                staticProviders.push(it),
              );
            }
            if (isModuleWithProviders(imt)) {
              imt.providers.forEach(provide => {
                if (isType(provide)) {
                  staticProviders.push({
                    provide,
                    useClass: createProxyType(provide),
                    deps: [],
                  });
                } else {
                  staticProviders.push(provide);
                }
              });
            }
          });
      }
    }
  });
  return staticProviders;
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
