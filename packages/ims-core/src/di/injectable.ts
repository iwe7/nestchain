import {
  makeDecorator,
  TypeDecorator,
  MetadataDef,
  isClassMetadata,
} from 'ims-decorator';
import { Type } from '../type';
import {
  ValueSansProvider,
  StaticClassSansProvider,
  ExistingSansProvider,
  ConstructorSansProvider,
  FactorySansProvider,
  ClassSansProvider,
} from './provider';
import { Injector } from './injector';
import { createProxyType } from './proxy';
export type InjectableProvider =
  | ValueSansProvider
  | ExistingSansProvider
  | StaticClassSansProvider
  | ConstructorSansProvider
  | FactorySansProvider
  | ClassSansProvider;
export interface InjectableDecorator {
  (): TypeDecorator;
  (
    options?: { providedIn: Type<any> | 'root' | null } & InjectableProvider,
  ): TypeDecorator;
  new (): Injectable;
  new (
    options?: { providedIn: Type<any> | 'root' | null } & InjectableProvider,
  ): Injectable;
}

export interface Injectable {
  providedIn?: Type<any> | 'root' | null;
}
export const Injectable: InjectableDecorator = makeDecorator(
  'Injectable',
  'visitInjectable',
  dir => dir,
  (
    type: Type<any>,
    meta: MetadataDef<
      { providedIn: Type<any> | 'root' | null } & InjectableProvider
    >,
  ) => {
    let options = meta.metadataDef;
    if (isClassMetadata(meta)) {
      if (options.providedIn === 'root') {
        let { providedIn, ...opts } = options;
        if (
          (opts as ValueSansProvider).useValue ||
          (opts as ClassSansProvider).useClass ||
          (opts as FactorySansProvider).useFactory ||
          (opts as ExistingSansProvider).useExisting ||
          (opts as StaticClassSansProvider).useClass
        ) {
          Injector.top.set([
            {
              provide: type,
              deps: [],
              ...opts,
            },
          ]);
        } else {
          Injector.top.set([
            {
              provide: type,
              useClass: createProxyType(type),
              deps: (opts as ConstructorSansProvider).deps || [],
            },
          ]);
        }
      }
    }
  },
);
