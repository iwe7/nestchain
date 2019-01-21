import { NgModule, corePlatform } from 'ims-core';
import providers from './providers';
import * as tokens from 'ims-ipfs';
import { merge } from 'ims-util';
@NgModule({
  providers,
})
export class ImsIpfsNodeModule {}

async function bootstrap() {
  let platform = await corePlatform();
  let ref = await platform.bootstrapModule(ImsIpfsNodeModule);
  let options = merge(...(await ref.injector.get(tokens.Options)));

  debugger;
}

bootstrap();
