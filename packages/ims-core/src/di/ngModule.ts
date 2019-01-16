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
import { Observable, of, from, forkJoin } from 'ims-rxjs';
import { isArray } from 'ims-util';
import { concatMap } from 'ims-rxjs/operators';
export interface ModuleWithProviders<T = any> {
  ngModule: Type<T>;
  providers?: Provider[];
}
export function isModuleWithProviders<T = any>(
  val: any,
): val is ModuleWithProviders<T> {
  return val.ngModule;
}
export type NgModuleImportType =
  | Type<any>
  | ModuleWithProviders<{}>
  | NgModuleImport
  | any[];
export interface NgModuleImports {
  (): Promise<Array<NgModuleImportType>>;
}
export interface NgModuleImport {
  (): Promise<NgModuleImportType>;
}
export interface NgModule {
  providers?: Provider[];
  imports?: Array<NgModuleImportType> | NgModuleImports;
  controllers?: any[];
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
  abstract get type(): Type<T>;
  abstract get moduleType(): Type<T>;
  abstract create(): Promise<NgModuleRef<T>>;
}

export function createNgModuleFactory(
  ngModuleType: Type<any>,
  injector: Injector,
): NgModuleFactory<any> {
  let ngModuleFactory = new NgModuleFactory_(ngModuleType, injector);
  injector.set([
    {
      provide: NgModuleFactory,
      useValue: ngModuleFactory,
    },
  ]);
  return ngModuleFactory;
}
export class NgModuleFactory_<T> extends NgModuleFactory<T> {
  get moduleType(): Type<T> {
    return this._moduleType;
  }
  private _moduleType: Type<T>;
  constructor(public type: Type<any>, public _injector?: Injector) {
    super();
    this._moduleType = createProxyType(type);
  }
  async create(): Promise<NgModuleRef<T>> {
    let instance = new this.moduleType();
    let staticProviders: StaticProvider[] = await getNgModuleStaticProvider(
      this.type,
    );
    await this._injector.set(staticProviders);
    let ref = new NgModuleRef_(this._injector, instance);
    this._injector.set([
      {
        provide: NgModuleRef,
        useValue: ref,
      },
    ]);
    return ref;
  }
}

export async function getNgModuleStaticProvider(
  type: Type<any>,
): Promise<StaticProvider[]> {
  let meta = getMetadata(type);
  let staticProviders: StaticProvider[] = [];
  let staticProviderMap: Map<StaticProvider, StaticProvider> = new Map();
  let obs = [];
  meta.forEach(it => {
    if (isClassMetadata<NgModule>(it)) {
      if (it.metadataKey === NgModuleMetadataKey) {
        let { providers, imports } = it.metadataDef;
        const handlerImport = async (it: NgModuleImportType) => {
          if (isType(it)) {
            let statics = await getNgModuleStaticProvider(it);
            statics.forEach((it: StaticProvider) => {
              if (!isArray(it)) {
                staticProviderMap.set(it, it);
              }
            });
          } else if (isModuleWithProviders(it)) {
            it.providers.forEach(provide => {
              let staticProvider = providerToStaticProvider(provide);
              if (!isArray(staticProvider)) {
                staticProviderMap.set(staticProvider, staticProvider);
              }
            });
          } else if (isNgModuleImport(it)) {
            let res = await it();
            handlerImport(res);
          }
        };
        const handlerImports = (
          imports: Array<NgModuleImportType>,
        ): Observable<any> => {
          if (imports.length > 0) {
            let obs = [];
            imports.forEach(it => {
              obs.push(from(handlerImport(it)));
            });
            return forkJoin(...obs);
          } else {
            return of(null);
          }
        };
        if (imports) {
          if (Array.isArray(imports)) {
            if (imports.length > 0) {
              obs.push(handlerImports(imports));
            }
          } else {
            let imps = from(imports());
            obs.push(imps.pipe(concatMap((res: any) => handlerImports(res))));
          }
        }
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
  if (obs.length > 0) {
    await forkJoin(...obs).toPromise();
  }
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
export async function compileNgModuleFactory<M>(
  injector: Injector,
  moduleType: Type<M>,
): Promise<NgModuleFactory<M>> {
  return createNgModuleFactory(moduleType, injector);
}

function isNgModuleImport(val: any): val is NgModuleImport {
  return typeof val === 'function';
}
