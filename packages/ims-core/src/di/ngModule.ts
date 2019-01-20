import {
  makeDecorator,
  MetadataFactory,
  ClassMetadata,
  MetadataDef,
} from '../decorator';
import {
  Provider,
  StaticProvider,
  isTypeProvider,
  isClassProvider,
} from './provider';
import { Type, isType } from '../type';
import { of, from, forkJoin } from 'ims-rxjs';
import { isArray, LifeSubject } from 'ims-util';
import { concatMap } from 'ims-rxjs/operators';
import { InjectionToken } from './injection_token';
import { ImsFactory, symbolGetProviders, symbolGetFactory } from './ims';
import { Injector } from './injector';

export class NgModuleMetadataFactory extends MetadataFactory {
  staticProviderMap: Map<StaticProvider, StaticProvider>;
  type(life: LifeSubject, def: ClassMetadata<NgModule>) {
    let { imports, providers } = def.metadataDef;
    let type = def.target;
    let obs = [];
    let staticProviderMap = (this.staticProviderMap = new Map());
    let getProviders = async (injector: Injector) => {
      if (imports) {
        if (Array.isArray(imports)) {
          if (imports.length > 0) {
            obs.push(this.handlerImports(imports));
          }
        } else {
          let imps = from(imports());
          obs.push(
            imps.pipe(concatMap((res: any) => this.handlerImports(res))),
          );
        }
      }
      if (providers) {
        providers.forEach(provide => {
          let staticProvider = providerToStaticProvider(provide);
          if (!isArray(staticProvider)) {
            staticProviderMap.set(staticProvider, staticProvider);
          }
        });
      }
      if (obs.length > 0) {
        await forkJoin(...obs).toPromise();
      }
      let staticProviders = [];
      staticProviderMap.forEach(provide => {
        staticProviders.push(provide);
      });
      return staticProviders;
    };
    let factory = () => new ImsFactory(type, getProviders);
    return new Proxy(type, {
      get(target: any, p: PropertyKey, receiver: any) {
        if (p === symbolGetProviders) return getProviders;
        if (p === symbolGetFactory) return factory;
        return Reflect.get(target, p, receiver);
      },
    });
  }

  private async handlerImport(it: NgModuleImportType) {
    if (isNgModuleImport(it)) {
      let res = await it();
      await this.handlerImport(res);
    } else if (isType(it)) {
      let providerFactory = it[symbolGetProviders];
      let statics = await providerFactory();
      statics.forEach((it: StaticProvider) => {
        if (!isArray(it)) {
          this.staticProviderMap.set(it, it);
        }
      });
    } else if (isModuleWithProviders(it)) {
      it.providers.forEach(provide => {
        let staticProvider = providerToStaticProvider(provide);
        if (!isArray(staticProvider)) {
          this.staticProviderMap.set(staticProvider, staticProvider);
        }
      });
    }
  }
  private handlerImports(imports: Array<NgModuleImportType>) {
    if (imports.length > 0) {
      let obs = [];
      imports.forEach(it => {
        obs.push(from(this.handlerImport(it)));
      });
      return forkJoin(...obs);
    } else {
      return of(null);
    }
  }
}

export function providerToStaticProvider(provider: Provider): StaticProvider {
  if (isTypeProvider(provider)) {
    return {
      provide: provider,
      useClass: provider,
      deps: [],
    };
  }
  if (isClassProvider(provider)) {
    return {
      provide: provider.provide,
      useClass: provider.useClass,
      deps: [],
      multi: provider.multi,
    };
  }
  return provider as any;
}

function isNgModuleImport(val: any): val is NgModuleImport {
  return typeof val === 'function' && !val[symbolGetProviders];
}

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
export const NgModuleToken = new InjectionToken<MetadataFactory>(
  'NgModuleToken',
);
export const NgModule = makeDecorator<NgModule>(
  NgModuleToken,
  (def: MetadataDef<NgModule>) => {
    return {
      imports: [],
      controllers: [],
      providers: [],
      ...def.metadataDef,
    };
  },
  new NgModuleMetadataFactory(),
);
export const ImsModule = NgModule;
