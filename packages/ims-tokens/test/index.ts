import { bootstrapModule, NgModule } from 'ims-core';
import providers from './providers';
import * as tokens from 'ims-tokens';

@NgModule({
  providers,
})
export class TestModule {}

async function bootstrap() {
  let injector = await bootstrapModule(TestModule);
}
bootstrap();
