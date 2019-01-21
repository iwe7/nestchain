import { NgModule, corePlatform } from 'ims-core';
import * as tokens from './tokens';
import providers from './node/index';

@NgModule({
  providers,
})
export class ImsIpfsNodeModule {}

async function bootstrap() {
  try {
    let core = await corePlatform();
    let ref = await core.bootstrapModule(ImsIpfsNodeModule);
    let boot = await ref.injector.get(tokens.BootToken);
    await boot();
    debugger;
  } catch (e) {
    debugger;
  }
}

bootstrap();
