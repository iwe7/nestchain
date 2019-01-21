import { NgModule, bootstrapModule } from 'ims-core';
import providers from './providers';
@NgModule({
  providers,
})
export class ImsIpfsNodeModule {}

async function bootstrap() {
  let injector = await bootstrapModule(ImsIpfsNodeModule);
  debugger;
}

bootstrap();
