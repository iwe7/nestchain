import { bootstrapModule, NgModule, Type } from 'ims-core';
import providers from './providers';
@NgModule({
  providers,
})
export class TestModule {}

async function bootstrap() {
  let ref = bootstrapModule(TestModule);
  debugger;
}
bootstrap();
