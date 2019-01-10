import { createPlatformFactory, corePlatform, Varint } from 'ims-core';
import { VarintModule } from './index';
let platform = createPlatformFactory(corePlatform, 'platform-varint', []);

platform()
  .bootstrapModule(VarintModule)
  .subscribe(res => {
    let basex = res.injector.get<Varint>(Varint);
    let result = basex.encode(1234);
    let deresult = basex.decode(result);
    debugger;
  });
