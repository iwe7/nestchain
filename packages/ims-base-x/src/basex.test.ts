import { createPlatformFactory, corePlatform, BaseXFactory } from 'ims-core';
import { BaseXModule } from './index';
let platform = createPlatformFactory(corePlatform, 'platform-base-x', []);

platform().then(res => {
  res.bootstrapModule(BaseXModule).then(res => {
    let basexFactory = res.injector.get<BaseXFactory>(BaseXFactory);
    let basex = basexFactory.create(
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
    );
    let buffer = Buffer.from('1234', 'utf8');
    let result = basex.encode(buffer);
    let deresult = basex.decode(result).toString();
    let isEqual = deresult === '1234';
    debugger;
  });
});
