import * as decorator from '../decorator/index';
import { InjectionToken } from './injection_token';
import { LifeSubject } from '../util';
import { Injector } from './injector';

export interface Inject {
  token: any;
}
export const InjectToken = new InjectionToken<decorator.MetadataFactory>(
  'InjectToken',
);
export const Inject = decorator.makeDecorator<any>(
  InjectToken,
  def => {
    return {
      token: def.metadataDef,
    };
  },
  {
    type(life: LifeSubject, def: decorator.ClassMetadata<Inject>) {
      let token = def.metadataDef.token;
      let getProviders = async (injector: Injector) => {
        injector.get(token);
      };
    },
  },
);

export const OptionalToken = new InjectionToken<decorator.MetadataFactory>(
  'OptionalToken',
);
export const Optional = decorator.makeDecorator(OptionalToken);

export const SelfToken = new InjectionToken<decorator.MetadataFactory>(
  'SelfToken',
);
export const Self = decorator.makeDecorator(SelfToken);

export const SkipSelfToken = new InjectionToken<decorator.MetadataFactory>(
  'SkipSelf',
);
export const SkipSelf = decorator.makeDecorator(SelfToken);

export const HostToken = new InjectionToken<decorator.MetadataFactory>(
  'HostToken',
);
export const Host = decorator.makeDecorator(SelfToken);
