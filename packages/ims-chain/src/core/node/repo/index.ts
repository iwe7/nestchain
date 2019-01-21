import { Provider, Injector } from 'ims-core';
import * as tokens from '../../tokens/index';
import { RepoFactory } from './factory';
import { Repo } from './repo';

export default [
  {
    provide: tokens.Repo,
    useValue: Repo,
  },
  {
    provide: tokens.RepoFactory,
    useFactory: (injector: Injector) => {
      return new RepoFactory(injector);
    },
    deps: [Injector],
  },
] as Provider[];
