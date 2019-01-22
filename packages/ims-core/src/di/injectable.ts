import { makeDecorator, MetadataFactory, ClassMetadata } from '../decorator';
import { Type } from '../type';
import {
  ValueSansProvider,
  StaticClassSansProvider,
  ExistingSansProvider,
  ConstructorSansProvider,
  FactorySansProvider,
  ClassSansProvider,
} from './provider';

import { InjectionToken } from './injection_token';
import { LifeSubject } from '../decorator';
import { Injector } from './injector';

type InjectableProvider =
  | ValueSansProvider
  | ExistingSansProvider
  | StaticClassSansProvider
  | ConstructorSansProvider
  | FactorySansProvider
  | ClassSansProvider;

export class InjectableFactory extends MetadataFactory {
  type(life: LifeSubject, def: ClassMetadata<InjectableOptions>): any {
    let type = def.target;
    if (def && def.metadataDef && def.metadataDef.providedIn === 'root') {
      let opts = def.metadataDef;
      let provider;
      if (
        (opts as ValueSansProvider).useValue ||
        (opts as ClassSansProvider).useClass ||
        (opts as FactorySansProvider).useFactory ||
        (opts as ExistingSansProvider).useExisting ||
        (opts as StaticClassSansProvider).useClass
      ) {
        provider = {
          provide: type,
          deps: [],
          ...opts,
        };
      } else {
        provider = {
          provide: type,
          useClass: type,
          deps: (opts as ConstructorSansProvider).deps || [],
        };
      }
      Injector.top.set([provider]);
    }
    return type;
  }
}

export type InjectableOptions = {
  providedIn: Type<any> | 'root' | null;
} & InjectableProvider;

export const InjectableFactoryToken = new InjectionToken<MetadataFactory>(
  'InjectableFactoryToken',
);

export const Injectable = makeDecorator<InjectableOptions>(
  InjectableFactoryToken,
  dir => dir.metadataDef,
  new InjectableFactory(),
);
