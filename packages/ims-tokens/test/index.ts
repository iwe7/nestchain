import { bootstrapModule, NgModule } from 'ims-core';
import providers from './providers';
import * as tokens from 'ims-tokens';

@NgModule({
  providers,
})
export class TestModule {}

async function bootstrap() {
  let injector = await bootstrapModule(TestModule);
  let fetch = await injector.get(tokens.Fetch);
  let body = await fetch('https://github.com/').then(res => res.text());
  debugger;
}
bootstrap();
