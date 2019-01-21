import { NgModule, corePlatform, Injector } from 'ims-core';
import * as tokens from './tokens';
import { RepoFactory } from './browser/repo-factory';

@NgModule({
  providers: [
    {
      provide: tokens.BootToken,
      useFactory: async (injector: Injector) => {
        return async () => {
          let repoFactory = await injector.get(tokens.RepoFactory);
          let options = await injector.get(tokens.Options);
          let repo = await repoFactory.create(options.repo);
          console.log('ims ipfs boot success');
        };
      },
      deps: [Injector],
    },
    {
      provide: tokens.RepoFactory,
      useFactory: async (injector: Injector) => {
        return new RepoFactory();
      },
      deps: [Injector],
    },
  ],
})
export class ImsIpfsBrowserModule {}

async function bootstrap() {
  let core = await corePlatform();
  let ref = await core.bootstrapModule(ImsIpfsBrowserModule);
  let boot = await ref.injector.get(tokens.BootToken);
  await boot();
}

bootstrap();
