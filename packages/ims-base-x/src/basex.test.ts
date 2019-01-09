import { createPlatformFactory, corePlatform, NgModule, BaseX } from 'ims-core';
import createProvider from './index';
let platform = createPlatformFactory(corePlatform, 'platform-base-x', [
  createProvider('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'),
]);
@NgModule()
export class BaseXModule {}

platform()
  .bootstrapModule(BaseXModule)
  .subscribe(res => {
    let basex = res.injector.get<BaseX>(BaseX);
    let buffer = Buffer.from('1234', 'utf8');
    let result = basex.encode(buffer);
    let deresult = basex.decode(result).toString();
    let isEqual = deresult === '1234';
    debugger;
  });
