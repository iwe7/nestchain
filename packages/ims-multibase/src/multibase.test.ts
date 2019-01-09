import {
  createPlatformFactory,
  corePlatform,
  NgModule,
  Multibase,
  MultibaseType,
} from 'ims-core';
import createProvider from './index';
let platform = createPlatformFactory(corePlatform, 'platform-multibase', [
  createProvider(),
]);

@NgModule()
export class MultihashModule {}

platform()
  .bootstrapModule(MultihashModule)
  .subscribe(res => {
    let buf = new Buffer('0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', 'hex');
    let basex = res.injector.get<Multibase>(Multibase);
    let result = basex.encode(MultibaseType.base58btc, buf);
    let deresult = basex.decode(result).toString('hex');
    debugger;
  });
