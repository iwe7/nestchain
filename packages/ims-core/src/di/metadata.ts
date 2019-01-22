import {
  makeDecorator,
  MetadataFactory,
  ClassMetadata,
} from '../decorator/index';
import { InjectionToken } from './injection_token';
import { LifeSubject } from '../util';
import { Injector } from './injector';

export interface Inject {
  token: any;
}
export const InjectToken = new InjectionToken<MetadataFactory>('InjectToken');
export const Inject = makeDecorator<any>(
  InjectToken,
  def => {
    return {
      token: def.metadataDef,
    };
  },
  {
    type(life: LifeSubject, def: ClassMetadata<Inject>) {
      let token = def.metadataDef.token;
      let getProviders = async (injector: Injector) => {
        injector.get(token);
      };
    },
  },
);

export const OptionalToken = new InjectionToken<MetadataFactory>(
  'OptionalToken',
);
export const Optional = makeDecorator(OptionalToken);

export const SelfToken = new InjectionToken<MetadataFactory>('SelfToken');
export const Self = makeDecorator(SelfToken);

export const SkipSelfToken = new InjectionToken<MetadataFactory>('SkipSelf');
export const SkipSelf = makeDecorator(SelfToken);

export const HostToken = new InjectionToken<MetadataFactory>('HostToken');
export const Host = makeDecorator(SelfToken);
