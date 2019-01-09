import {
  createPlatformFactory,
  corePlatform,
  NgModule,
  Varint,
} from 'ims-core';
import createProvider from './index';
let platform = createPlatformFactory(corePlatform, 'platform-varint', [
  createProvider(),
]);
@NgModule()
export class VarintModule {}

platform()
  .bootstrapModule(VarintModule)
  .subscribe(res => {
    let basex = res.injector.get<Varint>(Varint);
    let result = basex.encode(1234);
    let deresult = basex.decode(result);
    debugger;
  });
